import React from 'react';
import { products, brandConfig } from '@/data/products';

export default function ProductShowcase() {
  return (
    <section id="ideas" className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-widest text-[#a09880] mb-3">Curated picks</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1710] leading-tight">
          Gifts worth giving
        </h2>
        <p className="mt-4 text-[#5a5648] max-w-md mx-auto">
          Every idea links directly to where you can buy it. No middlemen, no markups.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {products.map((product, i) => {
          const brand = brandConfig[product.brand];
          const isEven = i % 2 === 0;

          return (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'product-card group flex flex-col sm:flex-row gap-0 overflow-hidden rounded-2xl bg-white border border-[#e8e2d6]',
                !isEven ? 'sm:flex-row-reverse' : '',
              ].join(' ')}
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)' }}
            >
              {/* Image */}
              <div className="sm:w-2/5 h-56 sm:h-auto overflow-hidden relative flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-card-img w-full h-full object-cover"
                />
                {/* Brand overlay pill */}
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

              {/* Content */}
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
                  <h3 className="text-2xl font-extrabold text-[#1a1710] leading-tight mb-2">
                    {product.title}
                  </h3>
                  <p className="text-[#5a5648] leading-relaxed text-sm mb-6">
                    {product.description}
                  </p>
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
  );
}
