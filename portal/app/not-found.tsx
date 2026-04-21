import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-8xl font-semibold text-ink-400">404</p>
      <h1 className="mt-4 font-display text-2xl text-ink-50">
        That idea isn&apos;t in the factory yet.
      </h1>
      <p className="mt-2 text-ink-400">
        It may have been rejected by the rubric — or tomorrow&apos;s trigger
        hasn&apos;t run yet.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent-500 px-4 py-2 text-sm font-medium text-ink-950 transition-transform hover:-translate-y-0.5"
      >
        Back to leaderboard
      </Link>
    </main>
  );
}
