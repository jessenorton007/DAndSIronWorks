import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteArg = process.argv.find((arg) => arg.startsWith('--site='));
const rawSiteUrl = siteArg?.replace('--site=', '') || process.env.SITE_URL;

if (!rawSiteUrl) {
  throw new Error('Missing site URL. Run with --site=https://yourdomain.com after the custom domain is connected.');
}

const siteUrl = rawSiteUrl.replace(/\/$/, '');

const routes = [
  '/',
  '/services',
  '/services/custom-ironwork-utah',
  '/services/custom-fire-pits',
  '/services/forged-railings',
  '/services/custom-metal-signs',
  '/services/forged-metal-art',
  '/services/blacksmith-commissions',
  '/pre-made/pre-built-fire-pits',
  '/pre-made/iron-rocket-stove',
  '/pre-made/iron-rocket-xl',
  '/contact',
  '/shop/spiral-pendant-tree',
  '/shop/copper-nail-earrings',
  '/shop/horse-hoof-pick',
  '/shop/copper-heart-earrings',
  '/shop/eagle-pendant',
  '/shop/dinner-bell',
  '/shop/cross-copper-wire',
  '/shop/horseshoe-heart-pendant',
  '/shop/spiral-pendant-drift',
  '/shop/large-celtic-cross',
  '/shop/rustic-copper-cross',
  '/shop/leaf-pendant',
  '/shop/iron-heart-pendant',
];

const today = new Date().toISOString().slice(0, 10);
const urls = routes.map((route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/services') || route.startsWith('/pre-made') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve('public', 'sitemap.xml'), xml);
console.log(`Generated public/sitemap.xml for ${siteUrl}`);
