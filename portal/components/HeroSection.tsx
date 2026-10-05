import React from 'react';
import { products, brandConfig } from '@/data/products';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background accent blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #f2b90d 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #e8622a 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

        {/* ── Left: copy ── */}
        <div className="lg:col-span-3">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-[#e8e2d6] bg-white/70 text-xs font-semibold text-[#5a5648] tracking-wide uppercase">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2b90d]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8622a]" />
            </span>
            Curated gifting ideas · Updated regularly
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.0] tracking-tight text-[#1a1710] mb-6">
            Gifts people
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #c9960a 0%, #e8622a 100%)' }}
            >
              actually remember.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg text-[#5a5648] leading-relaxed mb-10 max-w-md">
            Hand-picked unique gifting ideas — personalized keepsakes, screen-free
            story boxes, and gifts that surprise.
          </p>

          {/* CTA */}
          <a
            href="#ideas"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1710] text-white text-sm font-semibold hover:bg-[#2e2a20] transition-colors"
          >
            Explore ideas
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="translate-y-[1px]">
              <path d="M8 3v10M3 9l5 4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-12 text-xs text-[#a09880] font-medium">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5L12 5l-2.5 2.5.6 3.5L7 9.4l-3.1 1.6.6-3.5L2 5l3.5-.5L7 1z" fill="#f2b90d" /></svg>
              Personalized gifts
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5L12 5l-2.5 2.5.6 3.5L7 9.4l-3.1 1.6.6-3.5L2 5l3.5-.5L7 1z" fill="#e8622a" /></svg>
              Screen-free for kids
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5L12 5l-2.5 2.5.6 3.5L7 9.4l-3.1 1.6.6-3.5L2 5l3.5-.5L7 1z" fill="#f2b90d" /></svg>
              Handcrafted in India
            </span>
          </div>
        </div>

        {/* ── Right: product preview cards ── */}
        <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 relative">
          {/* Offset second card down for a staggered/depth feel */}
          {products.map((product, i) => {
            const brand = brandConfig[product.brand];
            return (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'group flex gap-4 items-center bg-white rounded-2xl p-4 shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[#e8e2d6]',
                  'hover:shadow-[0_4px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300',
                  i === 1 ? 'ml-6' : 'mr-6',
                ].join(' ')}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#f5f3ee] flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Brand pill */}
                  <div
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1.5"
                    style={{ background: brand.bg, color: brand.textColor }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: brand.color }} />
                    {brand.label}
                  </div>

                  <p className="text-sm font-bold text-[#1a1710] leading-snug truncate">{product.title}</p>
                  <p className="text-xs text-[#5a5648] mt-0.5 line-clamp-2 leading-snug">{product.tagline}</p>

                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-sm font-extrabold text-[#1a1710]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#a09880] line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="flex-shrink-0 text-[#a09880] group-hover:text-[#1a1710] group-hover:translate-x-0.5 transition-all"
                >
                  <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            );
          })}

          {/* Decorative label */}
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-[#a09880] mt-2">
            Click to shop ↑
          </p>
        </div>

      </div>
    </section>
  );
}
