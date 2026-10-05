import React from 'react';
import { Product, brandConfig } from '@/data/products';

interface Props {
  product: Product;
}

export default function ProductTile({ product }: Props) {
  const brand = brandConfig[product.brand];

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="product-tile group relative flex flex-col overflow-hidden rounded-2xl bg-white"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f3ee] h-64">
        <img
          src={product.image}
          alt={product.title}
          className="product-image w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide"
            style={{ background: brand.bg, color: brand.textColor }}
          >
            {product.badge}
          </div>
        )}

        {/* Brand tag — top right */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/80"
          style={{ color: brand.textColor }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: brand.color }}
          />
          {brand.label}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold text-[#1a1710] leading-snug mb-1">{product.title}</h3>
        <p className="text-sm text-[#5a5648] leading-relaxed mb-4 flex-1">{product.tagline}</p>

        <div className="flex items-center justify-between mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-[#1a1710]">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#a09880] line-through">{product.originalPrice}</span>
            )}
          </div>

          {/* CTA */}
          <span
            className="flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1"
            style={{ color: brand.color === '#f2b90d' ? brand.textColor : brand.color }}
          >
            Explore
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, ${brand.color}, transparent)` }}
      />
    </a>
  );
}
