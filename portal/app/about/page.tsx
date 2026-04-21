import Link from "next/link";

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-10 prose-custom">
      <nav className="mb-6 text-sm text-ink-400">
        <Link href="/" className="transition-colors hover:text-ink-100">
          ← Leaderboard
        </Link>
      </nav>

      <h1 className="font-display text-4xl font-semibold text-ink-50">
        How ideaFactory works
      </h1>

      <p>
        Every day at 9 AM IST, a Claude Code scheduled trigger wakes up, scans
        trend sources — Play Store charts, Product Hunt, Kickstarter, YC and a16z
        — drafts three candidate startup ideas fit for the Indian market, scores
        each against a 100-point rubric, and publishes the winner as a markdown
        file in this repository.
      </p>

      <h2>The 100-point rubric</h2>
      <p>
        Each candidate is scored across seven weighted dimensions, blending
        Sequoia&apos;s Arc memo framework, RICE prioritisation and Lean Canvas
        capital discipline:
      </p>
      <ul>
        <li><strong>Market size (20)</strong> — reachable Indian customers in 3 years</li>
        <li><strong>Capital efficiency (15)</strong> — MVP + 12 months runway under ₹20 lakh</li>
        <li><strong>Team feasibility (10)</strong> — 1-5 person team ships v1 in ≤ 6 months</li>
        <li><strong>Trend momentum (15)</strong> — recent validation in China, US or Europe</li>
        <li><strong>Moat &amp; defensibility (15)</strong> — data, network, distribution, regulatory</li>
        <li><strong>Unit economics (15)</strong> — gross margin and CAC:LTV feasibility</li>
        <li><strong>Time-to-MVP (10)</strong> — weeks from kickoff to first paying user</li>
      </ul>
      <p>
        An idea publishes only if its total ≥ <strong>70</strong> and no single
        dimension scores zero.
      </p>

      <h2>Leaderboard</h2>
      <p>
        Ideas are ordered by net upvotes. Voting is device-local &mdash; one
        vote per device per idea, enforced by a fingerprint + IP hash on the
        server. No sign-in, no tracking.
      </p>

      <h2>Open source</h2>
      <p>
        Rubric, trigger prompt, ideas, portal code and CDK infra all live in
        one repo. Fork it, adapt the rubric, point at your own market — the
        portal will render any idea that matches the schema.
      </p>
    </main>
  );
}
