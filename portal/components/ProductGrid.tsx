import React, { useState } from 'react';
import { products } from '@/data/products';
import FilterBar from './FilterBar';
import ProductTile from './ProductTile';

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? products
    : products.filter((p) => p.categories.includes(activeFilter));

  return (
    <div id="ideas">
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#a09880] mb-1">Curated picks</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1710] leading-tight">
              Unique gifting ideas
            </h2>
          </div>
          <span className="text-sm text-[#a09880]">
            {filtered.length} idea{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-4xl mb-4">🎁</div>
            <p className="text-[#5a5648] font-medium">More ideas in this category coming soon.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 text-sm underline text-[#a09880] hover:text-[#1a1710]"
            >
              View all ideas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filtered.map((product) => (
              <ProductTile key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
