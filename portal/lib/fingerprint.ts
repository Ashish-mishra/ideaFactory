"use client";

const KEY = "idf:fp:v1";

export function getFingerprint(): string {
  if (typeof window === "undefined") return "";
  let fp = localStorage.getItem(KEY);
  if (!fp) {
    fp = crypto.randomUUID();
    try {
      localStorage.setItem(KEY, fp);
    } catch {
      // privacy-mode — fall back to in-memory only
    }
  }
  return fp;
}

const VOTED_KEY = "idf:voted:v1";

export function readVotedMap(): Record<string, 1 | -1> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(VOTED_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function writeVoted(slug: string, dir: 1 | -1 | 0): void {
  if (typeof window === "undefined") return;
  const current = readVotedMap();
  if (dir === 0) delete current[slug];
  else current[slug] = dir;
  try {
    localStorage.setItem(VOTED_KEY, JSON.stringify(current));
  } catch {
    // ignore
  }
}
