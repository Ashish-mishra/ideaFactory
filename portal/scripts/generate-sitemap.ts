/**
 * Sitemap generator for uniqueideas.in
 * Run at build time via `npm run sitemap`.
 * Occasion pages are derived automatically from occasionPages.ts — add slugs there, not here.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { occasionPages } from '../lib/occasionPages';

const BASE_URL = 'https://uniqueideas.in';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

// High-priority slugs get weekly cadence + 0.9; rest get monthly + 0.8
const highPrioritySlugs = new Set([
  'unique-gifts-for-birthday',
  'unique-gifts-for-kids',
  'personalized-gifts',
  'unique-diwali-gifts',
]);

const staticPages: SitemapEntry[] = [
  { url: '/', lastmod: TODAY, changefreq: 'weekly', priority: '1.0' },
  ...occasionPages.map((p) => ({
    url: `/${p.slug}/`,
    lastmod: TODAY,
    changefreq: highPrioritySlugs.has(p.slug) ? 'weekly' : 'monthly',
    priority: highPrioritySlugs.has(p.slug) ? '0.9' : '0.8',
  })),
];

function buildSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) => `
  <url>
    <loc>${BASE_URL}${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

const outDir = join(process.cwd(), 'public');
mkdirSync(outDir, { recursive: true });

const sitemap = buildSitemap(staticPages);
writeFileSync(join(outDir, 'sitemap.xml'), sitemap);

console.log(`✅ Sitemap written with ${staticPages.length} URLs`);
