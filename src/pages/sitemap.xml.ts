import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || 'https://collections.paperlanterns.ink';

  // Get all letters
  const letters = await getCollection('letters');

  // Get all unique collections
  const collections = new Set<string>();
  letters.forEach(letter => collections.add(letter.data.collection));

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: 'search', priority: '0.8', changefreq: 'weekly' },
    { url: 'about', priority: '0.7', changefreq: 'monthly' },
  ];

  // Collection pages
  const collectionPages = Array.from(collections).map(collection => ({
    url: collection,
    priority: '0.9',
    changefreq: 'weekly'
  }));

  // Letter pages
  const letterPages = letters.map(letter => ({
    url: `${letter.data.collection}/${letter.slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  // Combine all pages
  const allPages = [...staticPages, ...collectionPages, ...letterPages];

  // Get current date for lastmod
  const today = new Date().toISOString().split('T')[0];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
