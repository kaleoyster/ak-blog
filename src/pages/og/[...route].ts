import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
const research = await getCollection('research');
const posts = (await getCollection('posts')).filter((p) => !p.data.draft);

// One entry per page we want a social card for. Keys mirror the URL path
// (home = "index"), so BaseLayout can map pathname → /og/<key>.png.
const pages: Record<string, { title: string; description: string }> = {
  index: { title: 'Akshay Kale', description: 'Production ML · LLM Applications · MLOps · Cloud Infrastructure' },
  experience: { title: 'Experience', description: 'Production ML engineering & XAI research' },
  projects: { title: 'Projects', description: 'Machine learning, data science & visualization work' },
  publications: { title: 'Publications', description: 'Journals, conference papers, posters & thesis' },
  research: { title: 'Research Notes', description: 'Methods & metrics in applied ML' },
  blog: { title: 'Writing', description: 'Posts & notes by Akshay Kale' },
  'projects/scared': { title: 'SCARED — Symptom Network Analysis', description: 'Child–parent symptom network analysis of childhood anxiety' },
};
for (const p of projects) pages[`projects/${p.id}`] = { title: p.data.title, description: p.data.description ?? '' };
for (const r of research) pages[`research/${r.id}`] = { title: r.data.title, description: r.data.description ?? '' };
for (const p of posts) pages[`blog/${p.id}`] = { title: p.data.title, description: p.data.description ?? '' };

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: undefined,
    bgGradient: [
      [17, 17, 19],
      [24, 24, 27],
    ],
    border: { color: [99, 102, 241], width: 20, side: 'inline-start' },
    padding: 70,
    font: {
      title: { color: [255, 255, 255], weight: 'Bold', size: 66, lineHeight: 1.15 },
      description: { color: [161, 161, 170], weight: 'Normal', size: 30, lineHeight: 1.4 },
    },
  }),
});
