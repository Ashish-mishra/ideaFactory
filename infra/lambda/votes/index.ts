import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "node:crypto";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE = process.env.VOTES_TABLE!;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "*";
const RATE_WINDOW_S = 60;
const MAX_VOTES_PER_WINDOW = 20;

const corsHeaders = {
  "Access-Control-Allow-Origin": CORS_ORIGIN,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function json(status: number, body: unknown): APIGatewayProxyResultV2 {
  return { statusCode: status, headers: corsHeaders, body: JSON.stringify(body) };
}

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip + (process.env.IP_SALT ?? "")).digest("hex").slice(0, 16);
}

function voterKey(fingerprint: string, ip: string, slug: string): string {
  return `${hashIp(ip)}:${fingerprint.slice(0, 32)}:${slug}`;
}

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  if (method === "OPTIONS") return json(204, {});

  const ip = event.requestContext.http.sourceIp;

  if (method === "GET" && path.endsWith("/counts")) {
    return await getCounts();
  }
  if (method === "POST" && path.endsWith("/vote")) {
    return await castVote(event, ip);
  }
  return json(404, { error: "not found" });
};

async function getCounts(): Promise<APIGatewayProxyResultV2> {
  const res = await ddb.send(
    new ScanCommand({
      TableName: TABLE,
      FilterExpression: "begins_with(pk, :p)",
      ExpressionAttributeValues: { ":p": "TOTAL#" },
      ProjectionExpression: "pk, up, down",
    })
  );
  const counts = (res.Items ?? []).map((i) => {
    const slug = (i.pk as string).replace(/^TOTAL#/, "");
    const up = Number(i.up ?? 0);
    const down = Number(i.down ?? 0);
    return { slug, up, down, net: up - down };
  });
  return json(200, { counts });
}

async function castVote(
  event: APIGatewayProxyEventV2,
  ip: string
): Promise<APIGatewayProxyResultV2> {
  let body: { slug?: string; direction?: number; fingerprint?: string };
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return json(400, { error: "invalid JSON" });
  }
  const slug = String(body.slug ?? "").slice(0, 80);
  const direction = Number(body.direction);
  const fingerprint = String(body.fingerprint ?? "").slice(0, 64);

  if (!/^[a-z0-9-]{3,80}$/.test(slug)) return json(400, { error: "bad slug" });
  if (![1, -1, 0].includes(direction)) return json(400, { error: "bad direction" });
  if (fingerprint.length < 8) return json(400, { error: "bad fingerprint" });

  // rate limit per IP+minute
  const rateKey = `RATE#${hashIp(ip)}#${Math.floor(Date.now() / 1000 / RATE_WINDOW_S)}`;
  const rate = await ddb.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { pk: rateKey, sk: "#" },
      UpdateExpression: "ADD hits :one SET #ttl = :ttl",
      ExpressionAttributeNames: { "#ttl": "ttl" },
      ExpressionAttributeValues: {
        ":one": 1,
        ":ttl": Math.floor(Date.now() / 1000) + RATE_WINDOW_S * 3,
      },
      ReturnValues: "UPDATED_NEW",
    })
  );
  const hits = Number(rate.Attributes?.hits ?? 0);
  if (hits > MAX_VOTES_PER_WINDOW) {
    return json(429, { error: "rate limited", retry_after_seconds: RATE_WINDOW_S });
  }

  const voterPk = `VOTER#${voterKey(fingerprint, ip, slug)}`;
  const totalPk = `TOTAL#${slug}`;

  const prior = await ddb.send(
    new GetCommand({ TableName: TABLE, Key: { pk: voterPk, sk: "#" } })
  );
  const previousDir = Number(prior.Item?.direction ?? 0);

  if (previousDir === direction) {
    const counts = await readTotal(totalPk, slug);
    return json(200, counts);
  }

  const upDelta =
    (direction === 1 ? 1 : 0) - (previousDir === 1 ? 1 : 0);
  const downDelta =
    (direction === -1 ? 1 : 0) - (previousDir === -1 ? 1 : 0);

  if (direction === 0) {
    await ddb.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          pk: voterPk, sk: "#",
          direction: 0,
          ttl: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 400,
        },
      })
    );
  } else {
    await ddb.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          pk: voterPk, sk: "#",
          direction,
          ttl: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 400,
        },
      })
    );
  }

  await ddb.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { pk: totalPk, sk: "#" },
      UpdateExpression: "ADD up :up, down :down SET slug = :slug",
      ExpressionAttributeValues: {
        ":up": upDelta,
        ":down": downDelta,
        ":slug": slug,
      },
    })
  );

  const counts = await readTotal(totalPk, slug);
  return json(200, counts);
}

async function readTotal(pk: string, slug: string) {
  const res = await ddb.send(
    new GetCommand({ TableName: TABLE, Key: { pk, sk: "#" } })
  );
  const up = Number(res.Item?.up ?? 0);
  const down = Number(res.Item?.down ?? 0);
  return { slug, up, down, net: up - down };
}
