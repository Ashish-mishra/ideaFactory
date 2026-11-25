import React from 'react';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { OccasionPage, occasionPages, getOccasionBySlug } from '@/lib/occasionPages';
import { ideasForOccasion } from '@/data/ideas';
import IdeaCard from '@/components/IdeaCard';

interface Props {
  page: OccasionPage;
}

export default function OccasionRoute({ page }: Props) {
  const pageIdeas = ideasForOccasion(page.slug);
  const canonical = `https://uniqueideas.in/${page.slug}/`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uniqueideas.in/' },
      { '@type': 'ListItem', position: 2, name: page.h1, item: canonical },
    ],
  };

  const relatedPages = (page.related && page.related.length
    ? page.related.map((s) => occasionPages.find((p) => p.slug === s)).filter(Boolean)
    : occasionPages.filter((p) => p.slug !== page.slug).slice(0, 5)) as OccasionPage[];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.h1,
    description: page.description,
    url: canonical,
    itemListElement: pageIdeas.map((idea, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: idea.name,
      description: idea.tagline,
    })),
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.description} />
        {pageIdeas.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <div className="pt-[65px]">
        {/* Hero strip */}
        <div className="bg-[#f2efe8] border-b border-[#e8e2d6] px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#a09880] mb-3">
              Curated picks
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1a1710] leading-tight mb-4">
              {page.h1}
            </h1>
            <p className="text-lg text-[#5a5648] max-w-2xl leading-relaxed">{page.intro}</p>
          </div>
        </div>

        {/* Editorial guide */}
        {page.guide && (
          <section className="max-w-3xl mx-auto px-6 pt-16">
            {page.guide.map((g) => (
              <div key={g.heading} className="mb-10">
                <h2 className="text-2xl font-extrabold text-[#1a1710] mb-4">{g.heading}</h2>
                {g.body.map((para, i) => (
                  <p key={i} className="text-[#5a5648] leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            ))}
          </section>
        )}

        {/* Brand-neutral ideas */}
        {page.ideas && (
          <section className="max-w-3xl mx-auto px-6 pb-4">
            <h2 className="text-2xl font-extrabold text-[#1a1710] mb-6">More ideas worth considering</h2>
            <ol className="list-decimal pl-5 space-y-3">
              {page.ideas.map((idea) => (
                <li key={idea.title} className="text-[#5a5648] leading-relaxed">
                  <strong className="text-[#1a1710]">{idea.title}.</strong> {idea.why}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Concepts for this occasion */}
        {pageIdeas.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-extrabold text-[#1a1710] mb-2">Gifts we're building for this</h2>
            <p className="text-xs text-[#a09880] mb-8">
              These are concepts, not products on sale. We couldn't find close equivalents in Indian shops. Vote for the ones you'd buy and we'll build those first.
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              {pageIdeas.map((idea) => (
                <IdeaCard key={idea.slug} idea={idea} />
              ))}
            </div>
          </section>
        )}

        {/* FAQ — great for long-tail keyword ranking */}
        <section className="bg-[#f2efe8] border-t border-[#e8e2d6] px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-[#1a1710] mb-8">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-6">
              {page.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-[#e8e2d6]">
                  <h3 className="font-bold text-[#1a1710] mb-2">{item.q}</h3>
                  <p className="text-sm text-[#5a5648] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Further reading + related */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          {page.reads && (
            <div className="mb-8">
              <h2 className="text-lg font-extrabold text-[#1a1710] mb-3">Further reading</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {page.reads.map((r) => (
                  <li key={r.url}><a href={r.url} className="text-[#e8622a] hover:underline">{r.label}</a></li>
                ))}
              </ul>
            </div>
          )}
          <h2 className="text-lg font-extrabold text-[#1a1710] mb-3">More gift ideas</h2>
          <ul className="flex flex-wrap gap-2">
            {relatedPages.map((r) => (
              <li key={r.slug}>
                <a href={`/${r.slug}/`} className="inline-block px-4 py-2 rounded-full border border-[#e8e2d6] bg-white text-sm text-[#1a1710] hover:border-[#e8622a]">
                  {r.h1}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Breadcrumb nav */}
        <div className="max-w-5xl mx-auto px-6 py-6">
          <nav className="text-xs text-[#a09880]">
            <a href="/" className="hover:text-[#1a1710]">Home</a>
            <span className="mx-2">›</span>
            <span className="text-[#1a1710] font-medium">{page.h1}</span>
          </nav>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: occasionPages.map((p) => ({ params: { occasion: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const page = getOccasionBySlug(params!.occasion as string);
  if (!page) return { notFound: true };
  return { props: { page } };
};
