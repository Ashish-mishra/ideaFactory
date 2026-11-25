import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProductShowcase from '@/components/ProductShowcase';
import IdeasShowcase from '@/components/IdeasShowcase';
import { products } from '@/data/products';
import { ideas } from '@/data/ideas';
import { occasionPages } from '@/lib/occasionPages';

const TITLE = 'Unique Gift Ideas India — Available Now & Coming Next | UniqueIdeas.in';
const DESCRIPTION =
  'Unique gift ideas for every occasion: personalised keepsakes you can order today, plus new concepts we are building next. Vote for the ones you want.';
const OG_IMAGE = 'https://uniqueideas.in/images/musical-fridge-magnet.png';
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
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <section className="pt-[65px] bg-[#f2efe8] border-b border-[#e8e2d6]">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a09880] mb-4">UniqueIdeas.in</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1a1710] leading-tight mb-5">
            Unique gifts you can order today, and the ones coming next
          </h1>
          <p className="text-lg text-[#5a5648] max-w-2xl mx-auto leading-relaxed">
            We make personalised keepsakes you can order now. We're also building gifts we couldn't find in any Indian shop, and you can vote for the ones you'd like us to make next.
          </p>
        </div>
      </section>
      <ProductShowcase />
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
