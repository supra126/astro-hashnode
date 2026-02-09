import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const host = process.env.PUBLIC_HASHNODE_PUBLICATION_HOST || 'engineering.hashnode.com';
const siteUrl =
  process.env.PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  `https://${host}`;

export default defineConfig({
  site: siteUrl,
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
