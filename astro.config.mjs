// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

const isVercel = !!process.env.VERCEL;

export default defineConfig({
  site: isVercel ? 'https://ak-blog.vercel.app' : 'https://kaleoyster.github.io',
  base: isVercel ? '/' : '/ak-blog',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});