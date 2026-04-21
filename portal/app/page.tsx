import { getAllIdeas } from "@/lib/ideas";
import { Hero } from "@/components/Hero";
import { Leaderboard } from "@/components/Leaderboard";

export const dynamic = "force-static";

export default async function HomePage() {
  const ideas = await getAllIdeas();
  const latest = ideas[0]?.date;

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24">
      <Hero totalIdeas={ideas.length} threshold={70} latestDate={latest} />

      <section id="leaderboard" className="scroll-mt-16">
        <div className="mb-6 flex items-baseline justify-between border-b border-ink-800 pb-3">
          <h2 className="font-display text-2xl text-ink-50">Leaderboard</h2>
          <span className="text-xs text-ink-500">
            Reordered live as you vote
          </span>
        </div>
        <Leaderboard ideas={ideas} />
      </section>

      <footer className="mt-20 border-t border-ink-800 pt-6 text-xs text-ink-500">
        <p>
          ideaFactory · generated daily by a Claude Code scheduled trigger ·
          hosted on S3 + CloudFront · votes via API Gateway + Lambda.
        </p>
      </footer>
    </main>
  );
}
