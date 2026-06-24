// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://kaleoyster.github.io',
  base: '/ak-blog',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});