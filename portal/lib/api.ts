"use client";

export interface VoteCounts {
  slug: string;
  up: number;
  down: number;
  net: number;
}

const API_BASE = process.env.NEXT_PUBLIC_VOTES_API ?? "";

function endpoint(path: string): string {
  return API_BASE ? `${API_BASE}${path}` : path;
}

export async function fetchAllCounts(): Promise<Record<string, VoteCounts>> {
  if (!API_BASE) return {};
  try {
    const res = await fetch(endpoint("/counts"), { cache: "no-store" });
    if (!res.ok) return {};
    const data: { counts: VoteCounts[] } = await res.json();
    return Object.fromEntries(data.counts.map((c) => [c.slug, c]));
  } catch {
    return {};
  }
}

export async function castVote(
  slug: string,
  direction: 1 | -1 | 0,
  fingerprint: string
): Promise<VoteCounts | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(endpoint("/vote"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, direction, fingerprint }),
    });
    if (!res.ok) return null;
    return (await res.json()) as VoteCounts;
  } catch {
    return null;
  }
}
