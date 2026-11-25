import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import crypto from "node:crypto";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ssm = new SSMClient({});
const TABLE = process.env.INTEREST_TABLE!;
const SSM_PREFIX = process.env.WHATSAPP_SSM_PREFIX ?? "/gift-shop/prod";
const TEMPLATE = process.env.WHATSAPP_TEMPLATE ?? "new_gift_interest";
const DRY_RUN = process.env.DRY_RUN === "1";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "https://uniqueideas.in").split(",");
const RATE_WINDOW_S = 60;
const MAX_PER_WINDOW = 5;

function cors(event: APIGatewayProxyEventV2) {
  const origin = event.headers?.origin ?? "";
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    Vary: "Origin",
  };
}

function json(event: APIGatewayProxyEventV2, status: number, body: unknown): APIGatewayProxyResultV2 {
  return { statusCode: status, headers: cors(event), body: JSON.stringify(body) };
}

const cache = new Map<string, string>();
async function param(name: string): Promise<string> {
  const hit = cache.get(name);
  if (hit) return hit;
  const r = await ssm.send(new GetParameterCommand({ Name: name, WithDecryption: true }));
  const v = r.Parameter?.Value ?? "";
  cache.set(name, v);
  return v;
}

/** Accepts 10-digit Indian mobiles (with optional +91 / 91 / 0 prefix). Returns 91XXXXXXXXXX or null. */
export function normalisePhone(raw: string): string | null {
  const d = String(raw ?? "").replace(/\D/g, "");
  const ten = d.length === 10 ? d : d.length === 11 && d.startsWith("0") ? d.slice(1) : d.length === 12 && d.startsWith("91") ? d.slice(2) : "";
  return /^[6-9]\d{9}$/.test(ten) ? `91${ten}` : null;
}

function cleanName(raw: string, slug: string): string {
  const base = String(raw ?? "").replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, 60);
  return base || slug.replace(/-/g, " ");
}

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip + (process.env.IP_SALT ?? "")).digest("hex").slice(0, 16);
}

async function notifyOwner(ideaName: string, phone: string, total: number): Promise<boolean> {
  if (DRY_RUN) {
    console.log("DRY_RUN notify", { ideaName, total });
    return true;
  }
  try {
    const [token, phoneId, owner] = await Promise.all([
      param(`${SSM_PREFIX}/whatsapp-access-token`),
      param(`${SSM_PREFIX}/whatsapp-phone-id`),
      param(`${SSM_PREFIX}/whatsapp-business-number`),
    ]);
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: owner.replace(/\D/g, ""),
        type: "template",
        template: {
          name: TEMPLATE,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [ideaName, `+${phone}`, String(total)].map((text) => ({ type: "text", text })),
            },
          ],
        },
      }),
    });
    if (!res.ok) {
      console.error("whatsapp send failed", res.status, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (e) {
    console.error("whatsapp send error", (e as Error).message);
    return false;
  }
}

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const method = event.requestContext.http.method;
  if (method === "OPTIONS") return { statusCode: 204, headers: cors(event), body: "" };
  if (method !== "POST" || !event.rawPath.endsWith("/interest")) return json(event, 404, { error: "not found" });

  let body: { slug?: string; name?: string; phone?: string; consent?: boolean };
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return json(event, 400, { error: "invalid JSON" });
  }

  const slug = String(body.slug ?? "").slice(0, 80);
  if (!/^[a-z0-9-]{3,80}$/.test(slug)) return json(event, 400, { error: "bad slug" });
  if (body.consent !== true) return json(event, 400, { error: "consent required" });
  const phone = normalisePhone(body.phone ?? "");
  if (!phone) return json(event, 400, { error: "enter a valid 10-digit mobile number" });

  // rate limit per IP per minute
  const ip = event.requestContext.http.sourceIp;
  const rate = await ddb.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { pk: `RATE#${hashIp(ip)}#${Math.floor(Date.now() / 1000 / RATE_WINDOW_S)}`, sk: "#" },
      UpdateExpression: "ADD hits :one SET #ttl = :ttl",
      ExpressionAttributeNames: { "#ttl": "ttl" },
      ExpressionAttributeValues: { ":one": 1, ":ttl": Math.floor(Date.now() / 1000) + RATE_WINDOW_S * 3 },
      ReturnValues: "UPDATED_NEW",
    })
  );
  if (Number(rate.Attributes?.hits ?? 0) > MAX_PER_WINDOW) return json(event, 429, { error: "too many requests" });

  // store; duplicate (same number + same idea) is accepted silently and not re-alerted
  let isNew = true;
  try {
    await ddb.send(
      new PutCommand({
        TableName: TABLE,
        Item: { pk: `IDEA#${slug}`, sk: `PHONE#${phone}`, name: cleanName(body.name ?? "", slug), consentAt: new Date().toISOString() },
        ConditionExpression: "attribute_not_exists(pk)",
      })
    );
  } catch (e) {
    if ((e as { name?: string }).name === "ConditionalCheckFailedException") isNew = false;
    else throw e;
  }

  if (isNew) {
    const count = await ddb.send(
      new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: "pk = :p AND begins_with(sk, :s)",
        ExpressionAttributeValues: { ":p": `IDEA#${slug}`, ":s": "PHONE#" },
        Select: "COUNT",
      })
    );
    await notifyOwner(cleanName(body.name ?? "", slug), phone, count.Count ?? 1);
  }

  return json(event, 200, { ok: true });
};
