import React from 'react';

const brands = [
  {
    key: 'createmygift',
    color: '#f2b90d',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    textColor: '#78520a',
    borderColor: '#fde68a',
    name: 'CreateMyGift',
    tagline: 'Personalized gifts, handcrafted with care.',
    description:
      'From musical fridge magnets to custom photo prints — every gift from CreateMyGift carries a personal touch. Designed and shipped from Greater Noida.',
    cta: 'Shop CreateMyGift',
    url: 'https://createmygift.in',
    icon: '🎁',
  },
  {
    key: 'boxtales',
    color: '#e8622a',
    bg: 'linear-gradient(135deg, #fff5f0 0%, #fed7aa 100%)',
    textColor: '#7a2e0e',
    borderColor: '#fed7aa',
    name: 'BoxTales',
    tagline: 'Screen-free stories. Cultural roots.',
    description:
      'RFID-powered audio storytelling boxes that bring Panchatantra, Amar Chitra Katha, and family stories to life — no screens, no Wi-Fi, just imagination.',
    cta: 'Explore BoxTales',
    url: 'https://boxtales.in',
    icon: '📦',
  },
];

export default function BrandSpotlight() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#a09880] mb-1">Behind the ideas</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1710] leading-tight">
            Where you shop
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {brands.map((brand) => (
          <a
            key={brand.key}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between rounded-2xl p-8 border overflow-hidden transition-transform hover:-translate-y-1"
            style={{
              background: brand.bg,
              borderColor: brand.borderColor,
            }}
          >
            {/* Large icon */}
            <div className="text-5xl mb-6 select-none">{brand.icon}</div>

            <div className="flex-1">
              <div
                className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                style={{ background: `${brand.color}22`, color: brand.textColor }}
              >
                {brand.name}
              </div>
              <h3 className="text-xl font-extrabold mb-2" style={{ color: brand.textColor }}>
                {brand.tagline}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: `${brand.textColor}bb` }}>
                {brand.description}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm font-bold" style={{ color: brand.textColor }}>
              {brand.cta}
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Decorative circle */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-12 w-48 h-48 rounded-full opacity-20"
              style={{ background: brand.color }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
