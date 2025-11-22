import { defineCollection, z } from 'astro:content';

const letters = defineCollection({
  type: 'content',
  schema: z.object({
    collection: z.string(),
    collectionTitle: z.string(),
    collectionSubtitle: z.string().optional(),
    author: z.string(),
    compiler: z.string().optional(),
    number: z.number(),
    title: z.string(),
    recipient: z.string().optional(),
    date: z.string().optional(),
    translator: z.string().optional(),
    period: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const collections = { letters };
