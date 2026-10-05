import React from 'react';
import { products, brandConfig } from '@/data/products';

const ctaLabel: Record<string, string> = {
  'Pre-Order': 'Pre-Order Now',
  'Bestseller': 'Shop Now',
};

export default function SplitHero() {
  return (
    <div className="split-hero mt-[65px] relative">
      {/* Divider line between panels */}
      <div className="split-panel-divider" style={{ left: '50%' }} />

      {products.map((product, i) => {
        const brand = brandConfig[product.brand];
        return (
          <a
            key={product.id}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="split-panel"
          >
            {/* Background image */}
            <img
              src={product.image}
              alt={product.title}
              className="split-panel-img"
            />

            {/* Gradient overlay */}
            <div className="split-panel-overlay" />

            {/* Top-left brand pill */}
            <div className="absolute top-6 left-6 z-10">
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-sm"
                style={{ background: `${brand.color}22`, color: brand.color, border: `1px solid ${brand.color}44` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: brand.color }} />
                {brand.label}
              </div>
            </div>

            {/* Bottom content */}
            <div className="split-panel-content">
              {/* Badge */}
              {product.badge && (
                <span
                  className="self-start mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: brand.color, color: '#fff' }}
                >
                  {product.badge}
                </span>
              )}

              <h2 className="text-2xl lg:text-3xl font-extrabold leading-tight mb-2 text-white">
                {product.title}
              </h2>

              <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-xs">
                {product.tagline}
              </p>

              {/* Price + CTA row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-white/50 line-through">{product.originalPrice}</span>
                  )}
                </div>

                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all hover:gap-3"
                  style={{ background: brand.color, color: brand.textColor }}
                >
                  {ctaLabel[product.badge ?? ''] ?? 'Shop Now'}
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
  );
}
