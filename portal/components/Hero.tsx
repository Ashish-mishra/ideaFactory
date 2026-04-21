"use client";

import { motion } from "framer-motion";

interface Props {
  totalIdeas: number;
  threshold: number;
  latestDate?: string;
}

export function Hero({ totalIdeas, threshold, latestDate }: Props) {
  return (
    <header className="relative mx-auto max-w-5xl px-5 pb-8 pt-16 sm:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-3 py-1 text-xs text-ink-300 backdrop-blur-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent-500" />
          </span>
          live · {totalIdeas} scored ideas · threshold {threshold}/100
        </div>

        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-50 sm:text-6xl">
          One startup idea.
          <span className="block bg-gradient-to-br from-accent-400 to-accent-700 bg-clip-text text-transparent">
            Every day. Scored. Ranked.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-300">
          A daily-generated feed of startup ideas fit for India — 1-5 person team,
          ≤ ₹20 lakh capex — with a 100-point rubric that keeps only what's
          worth building. Upvote what you'd fund.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-ink-400">
          <a href="#leaderboard" className="rounded-full bg-accent-500 px-4 py-2 font-medium text-ink-950 transition-transform hover:-translate-y-0.5 hover:bg-accent-400">
            See today&apos;s leaderboard
          </a>
          <a href="/about/" className="text-ink-300 underline-offset-4 hover:text-ink-50 hover:underline">
            How the rubric works
          </a>
          {latestDate && (
            <span className="ml-auto text-xs text-ink-500">
              Last update:{" "}
              {new Date(latestDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </motion.div>
    </header>
  );
}
