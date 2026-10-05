import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found — UniqueIdeas.in</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-6">🎁</div>
        <h1 className="text-3xl font-extrabold text-[#1a1710] mb-3">This page doesn&apos;t exist.</h1>
        <p className="text-[#5a5648] mb-8 max-w-sm">
          But we bet you were looking for something special. Head back and find it.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-[#1a1710] text-white text-sm font-semibold hover:bg-[#2e2a20] transition-colors"
        >
          Back to ideas
        </Link>
      </div>
    </>
  );
}
