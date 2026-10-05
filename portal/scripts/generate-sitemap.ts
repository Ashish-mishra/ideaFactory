/**
 * Sitemap generator for uniqueideas.in
 * Run at build time via `npm run sitemap`.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://uniqueideas.in';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const staticPages: SitemapEntry[] = [
  { url: '/',                         lastmod: TODAY, changefreq: 'weekly',  priority: '1.0' },
  { url: '/unique-gifts-for-birthday/', lastmod: TODAY, changefreq: 'weekly',  priority: '0.9' },
  { url: '/unique-gifts-for-kids/',    lastmod: TODAY, changefreq: 'weekly',  priority: '0.9' },
  { url: '/personalized-gifts/',       lastmod: TODAY, changefreq: 'weekly',  priority: '0.9' },
  { url: '/unique-gifts-for-him/',     lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { url: '/unique-gifts-for-her/',     lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { url: '/unique-anniversary-gifts/', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
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
