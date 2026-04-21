import clsx from "clsx";

export function ScoreBadge({ score }: { score: number }) {
  const tier =
    score >= 85 ? "top" : score >= 75 ? "high" : score >= 70 ? "pass" : "low";
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums",
        tier === "top" && "bg-accent-500/15 text-accent-200 ring-1 ring-accent-500/30",
        tier === "high" && "bg-accent-700/20 text-accent-400 ring-1 ring-accent-700/30",
        tier === "pass" && "bg-ink-700/60 text-ink-100 ring-1 ring-ink-600",
        tier === "low" && "bg-warn-600/15 text-warn-500 ring-1 ring-warn-600/30"
      )}
      aria-label={`Score ${score} of 100`}
    >
      <span className="opacity-70">score</span>
      <span className="font-bold">{score}</span>
    </span>
  );
}
