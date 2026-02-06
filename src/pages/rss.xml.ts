import type { APIRoute } from 'astro';
import { getRSSFeed } from '../lib/api';
import { SITE_LANG } from '../lib/client';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeCdata(str: string): string {
  return str.replace(/]]>/g, ']]]]><![CDATA[>');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export const GET: APIRoute = async () => {
  const data = await getRSSFeed(50);
  const publication = data.publication;
  const posts = publication.posts.edges.map((e) => e.node);
  const baseUrl = publication.url.replace(/\/$/, '');
  const siteTitle = publication.displayTitle || publication.title;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(publication.about?.html ? stripHtml(publication.about.html) : `${siteTitle} RSS Feed`)}</description>
    <language>${SITE_LANG}</language>
    <ttl>60</ttl>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />`;

  if (publication.preferences?.logo) {
    xml += `
    <image>
      <url>${escapeXml(publication.preferences.logo)}</url>
      <title>${escapeXml(siteTitle)}</title>
      <link>${baseUrl}</link>
    </image>`;
  }

  for (const post of posts) {
    const categories = (post.tags ?? [])
      .map((tag) => `      <category>${escapeXml(tag.name)}</category>`)
      .join('\n');

    xml += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${post.slug}</guid>
      <description>${escapeXml(post.brief || '')}</description>
      <content:encoded><![CDATA[${escapeCdata(post.content.html)}]]></content:encoded>
      <author>${escapeXml(post.author.name)}</author>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
${categories}
    </item>`;
  }

  xml += `
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
