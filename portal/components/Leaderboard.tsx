"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Idea } from "@/lib/idea-types";
import { fetchAllCounts, type VoteCounts } from "@/lib/api";
import { IdeaRow } from "./IdeaRow";

type SortMode = "votes" | "score" | "new";

export function Leaderboard({ ideas }: { ideas: Idea[] }) {
  const [counts, setCounts] = useState<Record<string, VoteCounts>>({});
  const [sort, setSort] = useState<SortMode>("votes");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    fetchAllCounts().then((c) => {
      if (!cancelled) setCounts(c);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const onNetChange = (slug: string, net: number) => {
    setCounts((prev) => ({
      ...prev,
      [slug]: { ...(prev[slug] ?? { slug, up: 0, down: 0 }), net } as VoteCounts,
    }));
  };

  const categories = useMemo(() => {
    const s = new Set(ideas.map((i) => i.category));
    return ["all", ...Array.from(s).sort()] as const;
  }, [ideas]);

  const filtered = useMemo(() => {
    const list =
      categoryFilter === "all"
        ? ideas
        : ideas.filter((i) => i.category === categoryFilter);
    const keyed = list.map((i) => ({
      idea: i,
      net: counts[i.slug]?.net ?? 0,
    }));
    keyed.sort((a, b) => {
      if (sort === "votes") return b.net - a.net || b.idea.score.total - a.idea.score.total;
      if (sort === "score") return b.idea.score.total - a.idea.score.total;
      return b.idea.date.localeCompare(a.idea.date);
    });
    return keyed;
  }, [ideas, counts, sort, categoryFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-xl border border-ink-800 bg-ink-900/40 p-3 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-full bg-ink-950 p-1 ring-1 ring-ink-800">
          {(["votes", "score", "new"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSort(mode)}
              className={
                "rounded-full px-3 py-1 text-xs font-medium transition-colors " +
                (sort === mode
                  ? "bg-ink-700 text-ink-50"
                  : "text-ink-400 hover:text-ink-100")
              }
            >
              {mode === "votes" ? "Top voted" : mode === "score" ? "Highest score" : "Newest"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoryFilter(c)}
              className={
                "rounded-full px-2.5 py-1 text-xs capitalize transition-colors " +
                (categoryFilter === c
                  ? "bg-accent-500/20 text-accent-200 ring-1 ring-accent-500/30"
                  : "bg-ink-800/70 text-ink-300 hover:bg-ink-700/70 hover:text-ink-100")
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ol className="space-y-3">
        <AnimatePresence initial={false}>
          {filtered.map(({ idea }, idx) => (
            <li key={idea.slug}>
              <IdeaRow
                rank={idx + 1}
                idea={idea}
                counts={counts[idea.slug]}
                onNetChange={onNetChange}
              />
            </li>
          ))}
        </AnimatePresence>
      </ol>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-ink-800 bg-ink-900/40 p-10 text-center text-ink-400">
          No ideas in this category yet. Check back tomorrow.
        </div>
      )}
    </div>
  );
}
