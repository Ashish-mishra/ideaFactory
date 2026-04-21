import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Idea } from "./idea-types";

export * from "./idea-types";

const IDEAS_DIR = path.join(process.cwd(), "..", "ideas");

export function listIdeaFiles(): string[] {
  if (!fs.existsSync(IDEAS_DIR)) return [];
  return fs
    .readdirSync(IDEAS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();
}

function toIsoDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v ?? "");
}

export async function readIdea(filename: string): Promise<Idea> {
  const raw = fs.readFileSync(path.join(IDEAS_DIR, filename), "utf8");
  const parsed = matter(raw);
  const bodyHtml = (await remark().use(html).process(parsed.content)).toString();
  const fm = parsed.data as Record<string, unknown>;

  const sources = Array.isArray(fm.sources)
    ? (fm.sources as Array<Record<string, unknown>>).map((s) => ({
        label: String(s.label ?? ""),
        url: String(s.url ?? ""),
        observed_on: toIsoDate(s.observed_on),
      }))
    : [];

  const idea: Idea = {
    slug: String(fm.slug ?? ""),
    title: String(fm.title ?? ""),
    date: toIsoDate(fm.date),
    category: fm.category as Idea["category"],
    pitch: String(fm.pitch ?? ""),
    score: fm.score as Idea["score"],
    capex_inr_lakh: Number(fm.capex_inr_lakh ?? 0),
    team_size: Number(fm.team_size ?? 0),
    time_to_mvp_weeks: Number(fm.time_to_mvp_weeks ?? 0),
    sources,
    tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
    status: (fm.status as Idea["status"]) ?? "published",
    bodyHtml,
  };
  return idea;
}

export async function getAllIdeas(): Promise<Idea[]> {
  const files = listIdeaFiles();
  return Promise.all(files.map(readIdea));
}

export async function getIdeaBySlug(slug: string): Promise<Idea | null> {
  const files = listIdeaFiles();
  const match = files.find((f) => f.includes(slug));
  if (!match) return null;
  return readIdea(match);
}
