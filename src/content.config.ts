import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
    status: z.enum(['published', 'coming-soon']).optional().default('published'),
    tags: z.array(z.string()).optional().default([]),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { posts, projects, research };
