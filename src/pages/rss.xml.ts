import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const letters = await getCollection('letters');

  // Sort by collection and number for consistent ordering
  const sortedLetters = letters.sort((a, b) => {
    if (a.data.collection !== b.data.collection) {
      return a.data.collection.localeCompare(b.data.collection);
    }
    return a.data.number - b.data.number;
  });

  // Get most recent 50 letters
  const recentLetters = sortedLetters.slice(-50).reverse();

  return rss({
    title: 'PaperLanterns.ink - Historical Letters',
    description: 'Curated letters from history. Personal correspondence of writers, philosophers, and historical figures from public domain archives.',
    site: context.site || 'https://collections.paperlanterns.ink',
    items: recentLetters.map((letter) => ({
      title: `${letter.data.author}: ${letter.data.title}`,
      description: letter.data.recipient
        ? `A letter from ${letter.data.author} to ${letter.data.recipient}${letter.data.date ? ` (${letter.data.date})` : ''}`
        : `Letter ${letter.data.number} from ${letter.data.collectionTitle}`,
      link: `/${letter.data.collection}/${letter.slug}`,
      pubDate: new Date(), // Since we don't have actual publication dates, use current
      author: letter.data.author,
      categories: [letter.data.collectionTitle, letter.data.period || 'Historical'].filter(Boolean),
    })),
    customData: `<language>en-us</language>
    <copyright>Public Domain</copyright>
    <managingEditor>noreply@paperlanterns.ink (PaperLanterns.ink)</managingEditor>
    <webMaster>noreply@paperlanterns.ink (PaperLanterns.ink)</webMaster>`,
  });
};
