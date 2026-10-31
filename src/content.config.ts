import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    type: z.enum(['story', 'note', 'photo']),
    tags: z.array(z.enum(['beginner-diaries', 'home-and-elsewhere', 'notes-to-self', 'little-things'])).min(1),
    date: z.coerce.date().optional(),
    image: z.object({ src: z.string(), alt: z.string(), width: z.number(), height: z.number() }).optional(),
    source: z.string().optional(),
    draft: z.boolean().default(true),
    standalone: z.boolean().default(true),
    order: z.number().default(100),
  }),
});

export const collections = { notes };
