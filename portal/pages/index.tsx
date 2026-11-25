import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import IdeasShowcase from '@/components/IdeasShowcase';
import { ideas } from '@/data/ideas';
import { occasionPages } from '@/lib/occasionPages';

const TITLE = 'Unique Gift Ideas You Can\'t Buy Anywhere Else | UniqueIdeas.in';
const DESCRIPTION =
  'Gift ideas you won\'t find in the shops: voice-bouquet frames, one-tap bhajan boxes, birthday time capsules and more. Browse the concepts and vote for the ones we should build.';
const CANONICAL = 'https://uniqueideas.in/';

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UniqueIdeas.in',
    url: CANONICAL,
    description: DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${CANONICAL}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Unique Gift Ideas',
    description: 'Gift concepts being developed. Not yet on sale.',
    url: CANONICAL,
    itemListElement: ideas.map((idea, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: idea.name,
      description: idea.tagline,
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:site_name" content="UniqueIdeas.in" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <section className="pt-[65px] bg-[#f2efe8] border-b border-[#e8e2d6]">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a09880] mb-4">UniqueIdeas.in</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1a1710] leading-tight mb-5">
            Gift ideas you can't buy anywhere else
          </h1>
          <p className="text-lg text-[#5a5648] max-w-2xl mx-auto leading-relaxed">
            We look for gifts that don't exist in Indian shops yet, then work out how to make them. Browse the concepts, vote for the ones you'd buy, and we'll build the favourites.
          </p>
        </div>
      </section>
      <IdeasShowcase />

      {/* Occasion links — internal linking for SEO + user navigation */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a09880] mb-3">Browse by occasion</p>
          <h2 className="text-3xl font-extrabold text-[#1a1710]">Find the perfect gift for</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {occasionPages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}/`}
              className="px-5 py-2.5 rounded-full border border-[#e8e2d6] bg-white text-sm font-semibold text-[#5a5648] hover:border-[#1a1710] hover:text-[#1a1710] transition-all hover:-translate-y-0.5"
            >
              {page.h1}
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}
