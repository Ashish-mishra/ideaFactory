import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SplitHero from '@/components/SplitHero';
import ProductShowcase from '@/components/ProductShowcase';
import BrandSpotlight from '@/components/BrandSpotlight';
import { products } from '@/data/products';
import { occasionPages } from '@/lib/occasionPages';

const TITLE = 'Unique Gifting Ideas — Handpicked & Meaningful | UniqueIdeas.in';
const DESCRIPTION =
  'Discover unique gifting ideas for every occasion — personalized fridge magnets, screen-free story boxes for kids, and gifts people actually remember. Curated from the best Indian gift brands. Starting ₹899.';
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
    name: 'Unique Gifting Ideas',
    description: 'Curated unique gift ideas handpicked from top Indian gift brands.',
    url: CANONICAL,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.title,
        description: p.tagline,
        image: p.image.startsWith('http') ? p.image : `https://uniqueideas.in${p.image}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: p.price.replace('₹', '').replace(',', ''),
          availability: p.badge === 'Pre-Order'
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/InStock',
          url: p.url,
        },
      },
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <SplitHero />
      <ProductShowcase />

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

      <BrandSpotlight />
    </>
  );
}
