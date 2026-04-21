"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Idea } from "@/lib/idea-types";
import { categoryLabel } from "@/lib/idea-types";
import type { VoteCounts } from "@/lib/api";
import { ScoreBadge } from "./ScoreBadge";
import { VoteButton } from "./VoteButton";

interface Props {
  rank: number;
  idea: Idea;
  counts?: VoteCounts;
  onNetChange: (slug: string, net: number) => void;
}

export function IdeaRow({ rank, idea, counts, onNetChange }: Props) {
  return (
    <motion.article
      layout
      layoutId={idea.slug}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ layout: { type: "spring", stiffness: 260, damping: 26 } }}
      className="group relative flex items-start gap-4 rounded-2xl border border-ink-800 bg-ink-900/60 p-5 shadow-card backdrop-blur-sm transition-colors hover:border-ink-700 hover:bg-ink-900"
    >
      <div className="flex flex-col items-center gap-3 pt-1">
        <span className="font-display text-3xl font-semibold tabular-nums text-ink-400 group-hover:text-ink-200">
          {rank.toString().padStart(2, "0")}
        </span>
        <VoteButton
          slug={idea.slug}
          initialCounts={counts}
          onNetChange={onNetChange}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-ink-400">
          <span className="rounded-full bg-ink-800 px-2 py-0.5 font-medium uppercase tracking-wider text-ink-200">
            {categoryLabel(idea.category)}
          </span>
          <ScoreBadge score={idea.score.total} />
          <span>•</span>
          <span>₹{idea.capex_inr_lakh}L capex</span>
          <span>•</span>
          <span>{idea.team_size}-person team</span>
          <span>•</span>
          <span>{idea.time_to_mvp_weeks}w to MVP</span>
        </div>

        <Link href={`/idea/${idea.slug}/`} className="block">
          <h2 className="font-display text-2xl font-semibold text-ink-50 transition-colors group-hover:text-accent-200">
            {idea.title}
          </h2>
        </Link>

        <p className="mt-2 text-sm leading-relaxed text-ink-300">
          {idea.pitch}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {idea.tags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-md border border-ink-700 px-1.5 py-0.5 text-[11px] text-ink-400"
            >
              #{t}
            </span>
          ))}
          <span className="ml-auto text-xs text-ink-500">
            {new Date(idea.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
