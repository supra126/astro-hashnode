import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.origin : 'https://localhost:4321';
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  const robotsTxt = `User-agent: *
Allow: /

# Google adsbot ignores robots.txt unless specifically named!
User-agent: AdsBot-Google
Allow: /

User-agent: GPTBot
Disallow: /

Sitemap: ${sitemapUrl}`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
