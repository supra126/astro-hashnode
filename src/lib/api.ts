import { gqlClient, PUBLICATION_HOST } from './client';
import {
  PublicationByHostQuery,
  HomePageInitialQuery,
  HomePagePostsQuery,
  SinglePostByPublicationQuery,
  SlugPostsByPublicationQuery,
  PostsByPublicationQuery,
  MorePostsByPublicationQuery,
  PostsWithTagsQuery,
  TagInitialQuery,
  TagPostsByPublicationQuery,
  SeriesPageInitialQuery,
  PageByPublicationQuery,
  RSSFeedQuery,
  SitemapQuery,
  MoreSitemapPostsQuery,
  SearchPostsOfPublicationQuery,
  NewsletterQuery,
  SubscribeToNewsletterMutation,
} from './queries';
import type {
  PublicationByHostResponse,
  HomePageInitialResponse,
  HomePagePostsResponse,
  SinglePostResponse,
  TagInitialResponse,
  SeriesPageResponse,
  PageByPublicationResponse,
  RSSFeedResponse,
  SitemapResponse,
  SearchResponse,
  NewsletterResponse,
  SubscribeToNewsletterResponse,
} from '../types';

const host = PUBLICATION_HOST;

// ---------- Publication ----------

export async function getPublicationByHost() {
  return gqlClient.request<PublicationByHostResponse>(PublicationByHostQuery, { host });
}

// ---------- Homepage ----------

export async function getHomePageInitial() {
  return gqlClient.request<HomePageInitialResponse>(HomePageInitialQuery, { host });
}

export async function getHomePagePosts(first: number = 10, after?: string) {
  return gqlClient.request<HomePagePostsResponse>(HomePagePostsQuery, {
    host,
    first,
    after,
  });
}

// ---------- Single Post ----------

export async function getSinglePost(slug: string) {
  return gqlClient.request<SinglePostResponse>(SinglePostByPublicationQuery, {
    host,
    slug,
  });
}

// ---------- Posts ----------

export async function getPostsByPublication(first: number = 10, after?: string) {
  return gqlClient.request<{ publication: { posts: { totalDocuments: number; edges: Array<{ node: { slug: string } }>; pageInfo: { endCursor: string | null; hasNextPage: boolean } } } }>(
    PostsByPublicationQuery,
    { host, first, after },
  );
}

export async function getMorePosts(first: number = 6, after?: string) {
  return gqlClient.request<{ publication: { posts: { edges: Array<{ node: any }>; pageInfo: { endCursor: string | null; hasNextPage: boolean } } } }>(
    MorePostsByPublicationQuery,
    { host, first, after },
  );
}

export async function getAllPostSlugs() {
  const slugs: string[] = [];
  let after: string | undefined;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await gqlClient.request<{
      publication: {
        posts: {
          edges: Array<{ node: { slug: string } }>;
          pageInfo: { endCursor: string | null; hasNextPage: boolean };
        };
      };
    }>(SlugPostsByPublicationQuery, { host, first: 50, after });

    const { edges, pageInfo } = data.publication.posts;
    slugs.push(...edges.map((e) => e.node.slug));

    hasNextPage = pageInfo.hasNextPage;
    after = pageInfo.endCursor ?? undefined;
  }

  return slugs;
}

export async function getAllTagSlugs() {
  const tagSlugs = new Set<string>();
  let after: string | undefined;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await gqlClient.request<{
      publication: {
        posts: {
          edges: Array<{ node: { slug: string; tags: Array<{ slug: string }> } }>;
          pageInfo: { endCursor: string | null; hasNextPage: boolean };
        };
      };
    }>(PostsWithTagsQuery, { host, first: 50, after });

    for (const edge of data.publication.posts.edges) {
      for (const tag of edge.node.tags ?? []) {
        tagSlugs.add(tag.slug);
      }
    }

    hasNextPage = data.publication.posts.pageInfo.hasNextPage;
    after = data.publication.posts.pageInfo.endCursor ?? undefined;
  }

  return Array.from(tagSlugs);
}

// ---------- Tag ----------

export async function getTagInitial(slug: string, first: number = 10, after?: string) {
  return gqlClient.request<TagInitialResponse>(TagInitialQuery, {
    host,
    slug,
    first,
    after,
  });
}

export async function getTagPosts(tagSlug: string, first: number = 10, after?: string) {
  return gqlClient.request<TagInitialResponse>(TagPostsByPublicationQuery, {
    host,
    tagSlug,
    first,
    after,
  });
}

// ---------- Series ----------

export async function getSeriesPageInitial(slug: string, first: number = 10, after?: string) {
  return gqlClient.request<SeriesPageResponse>(SeriesPageInitialQuery, {
    host,
    slug,
    first,
    after,
  });
}

// ---------- Static Page ----------

export async function getPageByPublication(slug: string) {
  return gqlClient.request<PageByPublicationResponse>(PageByPublicationQuery, {
    host,
    slug,
  });
}

// ---------- RSS / Sitemap ----------

export async function getRSSFeed(first: number = 20, after?: string) {
  return gqlClient.request<RSSFeedResponse>(RSSFeedQuery, {
    host,
    first,
    after,
  });
}

export async function getSitemap(postsCount: number = 100, postsAfter?: string, staticPagesCount: number = 50) {
  return gqlClient.request<SitemapResponse>(SitemapQuery, {
    host,
    postsCount,
    postsAfter,
    staticPagesCount,
  });
}

export async function getMoreSitemapPosts(postsCount: number = 100, postsAfter: string) {
  return gqlClient.request<SitemapResponse>(MoreSitemapPostsQuery, {
    host,
    postsCount,
    postsAfter,
  });
}

// ---------- Search ----------

export async function searchPosts(query: string, publicationId: string, first: number = 10, after?: string) {
  return gqlClient.request<SearchResponse>(SearchPostsOfPublicationQuery, {
    first,
    after,
    filter: {
      query,
      publicationId,
    },
  });
}

// ---------- Newsletter ----------

export async function getNewsletter() {
  return gqlClient.request<NewsletterResponse>(NewsletterQuery, {
    host,
  });
}

export async function subscribeToNewsletter(publicationId: string, email: string) {
  return gqlClient.request<SubscribeToNewsletterResponse>(SubscribeToNewsletterMutation, {
    input: {
      publicationId,
      email,
    },
  });
}
