import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().optional(),
    categories: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
