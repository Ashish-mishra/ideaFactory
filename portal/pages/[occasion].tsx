import React from 'react';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { OccasionPage, occasionPages, getOccasionBySlug } from '@/lib/occasionPages';
import { brandConfig } from '@/data/products';

interface Props {
  page: OccasionPage;
}

const OG_IMAGE = 'https://uniqueideas.in/images/musical-fridge-magnet.png';

export default function OccasionRoute({ page }: Props) {
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
    itemListElement: page.products.map((p, i) => ({
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
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
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

        {/* Products */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-extrabold text-[#1a1710] mb-2">Our picks</h2>
          <p className="text-xs text-[#a09880] mb-8">
            Disclosure: we also run CreateMyGift and BoxTales, so the products below come from our own brands.
          </p>
          <div className="flex flex-col gap-8">
            {page.products.map((product, i) => {
              const brand = brandConfig[product.brand];
              const isEven = i % 2 === 0;
              return (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    'group flex flex-col sm:flex-row gap-0 overflow-hidden rounded-2xl bg-white border border-[#e8e2d6]',
                    'transition-all hover:-translate-y-1',
                    !isEven ? 'sm:flex-row-reverse' : '',
                  ].join(' ')}
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)' }}
                >
                  <div className="sm:w-2/5 h-56 sm:h-auto overflow-hidden relative flex-shrink-0">
                    <img
                      src={product.image}
                      alt={`${product.title} — unique gift idea`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <div
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                        style={{ background: `${brand.bg}ee`, color: brand.textColor }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: brand.color }} />
                        {brand.label}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-8">
                    <div>
                      {product.badge && (
                        <span
                          className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide"
                          style={{ background: brand.bg, color: brand.textColor }}
                        >
                          {product.badge}
                        </span>
                      )}
                      <h2 className="text-2xl font-extrabold text-[#1a1710] leading-tight mb-2">
                        {product.title}
                      </h2>
                      <p className="text-[#5a5648] leading-relaxed text-sm mb-6">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-[#1a1710]">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-base text-[#a09880] line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all group-hover:gap-3"
                        style={{ background: brand.color, color: brand.textColor }}
                      >
                        {product.badge === 'Pre-Order' ? 'Pre-Order Now' : 'Shop Now'}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

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
