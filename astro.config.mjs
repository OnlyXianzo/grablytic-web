import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://grablytic.vercel.app',
  output: 'static',
  integrations: [sitemap({
    // Freshness signal: stamp every URL with the build date. The homepage
    // hero stats genuinely change on most builds (daily stats fetch), so
    // crawlers re-checking on lastmod see real movement, not a static lie.
    serialize(item) {
      item.lastmod = new Date().toISOString().split('T')[0];
      return item;
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
