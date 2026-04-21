"use client";

import { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { castVote, VoteCounts } from "@/lib/api";
import { getFingerprint, readVotedMap, writeVoted } from "@/lib/fingerprint";

interface Props {
  slug: string;
  initialCounts?: VoteCounts;
  onNetChange?: (slug: string, net: number) => void;
}

export function VoteButton({ slug, initialCounts, onNetChange }: Props) {
  const [counts, setCounts] = useState<VoteCounts>(
    initialCounts ?? { slug, up: 0, down: 0, net: 0 }
  );
  const [myVote, setMyVote] = useState<1 | -1 | 0>(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const map = readVotedMap();
    if (map[slug]) setMyVote(map[slug]);
  }, [slug]);

  useEffect(() => {
    if (initialCounts) setCounts(initialCounts);
  }, [initialCounts?.up, initialCounts?.down, initialCounts?.net]);

  const submit = (dir: 1 | -1) => {
    const next = myVote === dir ? 0 : dir;
    const delta = next - myVote;
    const optimistic: VoteCounts = {
      slug,
      up: counts.up + (next === 1 ? 1 : 0) - (myVote === 1 ? 1 : 0),
      down: counts.down + (next === -1 ? 1 : 0) - (myVote === -1 ? 1 : 0),
      net: counts.net + delta,
    };
    setCounts(optimistic);
    setMyVote(next);
    writeVoted(slug, next);
    onNetChange?.(slug, optimistic.net);

    startTransition(async () => {
      const fp = getFingerprint();
      const server = await castVote(slug, next, fp);
      if (server) {
        setCounts(server);
        onNetChange?.(slug, server.net);
      }
    });
  };

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-ink-800/70 p-1 ring-1 ring-ink-700">
      <button
        type="button"
        aria-label="Upvote"
        onClick={() => submit(1)}
        className={clsx(
          "flex size-8 items-center justify-center rounded-full transition-all",
          myVote === 1
            ? "bg-accent-500/20 text-accent-400 ring-1 ring-accent-500/40"
            : "text-ink-300 hover:bg-ink-700/70 hover:text-ink-50"
        )}
      >
        <svg viewBox="0 0 20 20" className="size-4" fill="currentColor">
          <path d="M10 3l7 8h-4v6H7v-6H3l7-8z" />
        </svg>
      </button>

      <div className="relative min-w-[2.25rem] text-center font-mono text-sm tabular-nums text-ink-100">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={counts.net}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-block"
          >
            {counts.net}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Downvote"
        onClick={() => submit(-1)}
        className={clsx(
          "flex size-8 items-center justify-center rounded-full transition-all",
          myVote === -1
            ? "bg-warn-600/20 text-warn-500 ring-1 ring-warn-600/40"
            : "text-ink-300 hover:bg-ink-700/70 hover:text-ink-50"
        )}
      >
        <svg viewBox="0 0 20 20" className="size-4" fill="currentColor">
          <path d="M10 17l-7-8h4V3h6v6h4l-7 8z" />
        </svg>
      </button>
    </div>
  );
}
