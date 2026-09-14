import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://truestream.vercel.app',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
