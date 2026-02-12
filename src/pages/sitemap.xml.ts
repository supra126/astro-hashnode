import type { APIRoute } from 'astro';
import { getSitemap, getMoreSitemapPosts } from '../lib/api';
import { escapeXml } from '../lib/utils';

const MAX_POSTS = 1000;

export const GET: APIRoute = async () => {
  const initialData = await getSitemap(100, undefined, 50);
  const publication = initialData.publication;
  const baseUrl = publication.url.replace(/\/$/, '');

  const posts = publication.posts.edges.map((e) => e.node);
  const staticPages = publication.staticPages.edges.map((e) => e.node);

  // Paginate through remaining posts (capped to prevent runaway loops)
  const MAX_PAGES = 20;
  let pageInfo = publication.posts.pageInfo;
  let pagesLoaded = 0;
  while (pageInfo.hasNextPage && posts.length < MAX_POSTS && pageInfo.endCursor && pagesLoaded < MAX_PAGES) {
    const moreData = await getMoreSitemapPosts(100, pageInfo.endCursor);
    const morePosts = moreData.publication.posts.edges.map((e) => e.node);
    posts.push(...morePosts);
    pageInfo = moreData.publication.posts.pageInfo;
    pagesLoaded++;
  }

  // Collect unique tag slugs
  const uniqueTags = new Set<string>();
  for (const post of posts) {
    if (Array.isArray(post.tags)) {
      for (const tag of post.tags) {
        uniqueTags.add(tag.slug);
      }
    }
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>always</changefreq>
    <priority>1</priority>${posts.length > 0 ? `\n    <lastmod>${posts[0].publishedAt}</lastmod>` : ''}
  </url>`;

  // Posts
  for (const post of posts) {
    xml += `
  <url>
    <loc>${baseUrl}/${escapeXml(post.slug)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>${post.updatedAt ? `\n    <lastmod>${post.updatedAt}</lastmod>` : `\n    <lastmod>${post.publishedAt}</lastmod>`}
  </url>`;
  }

  // Static pages
  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${baseUrl}/${escapeXml(page.slug)}</loc>
    <changefreq>always</changefreq>
    <priority>1</priority>
  </url>`;
  }

  // Tag pages
  for (const tagSlug of uniqueTags) {
    xml += `
  <url>
    <loc>${baseUrl}/tag/${escapeXml(tagSlug)}</loc>
    <changefreq>always</changefreq>
    <priority>1</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
