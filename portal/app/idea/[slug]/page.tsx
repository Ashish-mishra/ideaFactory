import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllIdeas, getIdeaBySlug, categoryLabel } from "@/lib/ideas";
import { ScoreBadge } from "@/components/ScoreBadge";
import { VoteButton } from "@/components/VoteButton";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const ideas = await getAllIdeas();
  return ideas.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = await getIdeaBySlug(slug);
  if (!idea) return {};
  return { title: `${idea.title} — ideaFactory`, description: idea.pitch };
}

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = await getIdeaBySlug(slug);
  if (!idea) notFound();

  const scoreRows: [string, number, number][] = [
    ["Market size (India TAM)", idea.score.market, 20],
    ["Capital efficiency", idea.score.capital, 15],
    ["Team feasibility", idea.score.team, 10],
    ["Trend momentum (China/US)", idea.score.trend, 15],
    ["Moat & defensibility", idea.score.moat, 15],
    ["Unit economics", idea.score.economics, 15],
    ["Time-to-MVP", idea.score.speed, 10],
  ];

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-10">
      <nav className="mb-6 text-sm text-ink-400">
        <Link href="/" className="transition-colors hover:text-ink-100">
          ← Leaderboard
        </Link>
      </nav>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-ink-400">
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
        <h1 className="font-display text-4xl font-semibold text-ink-50 sm:text-5xl">
          {idea.title}
        </h1>
        <p className="mt-4 text-lg text-ink-300">{idea.pitch}</p>
        <div className="mt-6 flex items-center gap-4">
          <VoteButton slug={idea.slug} />
          <span className="text-xs text-ink-500">
            Published{" "}
            {new Date(idea.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      <section className="mb-10 rounded-2xl border border-ink-800 bg-ink-900/60 p-6">
        <h2 className="font-display mb-4 text-lg text-ink-50">Score breakdown</h2>
        <div className="space-y-2.5">
          {scoreRows.map(([label, val, max]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-ink-300">{label}</span>
                <span className="font-mono tabular-nums text-ink-100">
                  {val}
                  <span className="text-ink-500">/{max}</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-700 to-accent-400"
                  style={{ width: `${(val / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-ink-800 pt-3 text-sm">
            <span className="font-semibold text-ink-100">Total</span>
            <span className="font-mono font-bold tabular-nums text-accent-400">
              {idea.score.total}<span className="text-ink-500">/100</span>
            </span>
          </div>
        </div>
      </section>

      <article
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: idea.bodyHtml }}
      />

      {idea.sources.length > 0 && (
        <section className="mt-10 rounded-2xl border border-ink-800 bg-ink-900/40 p-6">
          <h2 className="font-display mb-3 text-lg text-ink-50">Sources</h2>
          <ul className="space-y-2 text-sm">
            {idea.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-400 underline-offset-4 hover:underline"
                >
                  {s.label}
                </a>
                <span className="ml-2 text-xs text-ink-500">
                  observed {s.observed_on}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
