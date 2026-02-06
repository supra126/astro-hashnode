import { gql } from 'graphql-request';
import {
  PublicationFragment,
  PageInfoFragment,
  RequiredSitemapPostFieldsFragment,
} from './fragments';

export const RSSFeedQuery = gql`
  ${PublicationFragment}
  ${PageInfoFragment}
  query RSSFeed($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      ...Publication
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            url
            slug
            brief
            publishedAt
            content {
              html
            }
            coverImage {
              url
            }
            tags {
              id
              name
              slug
            }
            author {
              name
              username
            }
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;

export const SitemapQuery = gql`
  ${PageInfoFragment}
  ${RequiredSitemapPostFieldsFragment}
  query Sitemap(
    $host: String!
    $postsCount: Int!
    $postsAfter: String
    $staticPagesCount: Int!
  ) {
    publication(host: $host) {
      id
      url
      staticPages(first: $staticPagesCount) {
        edges {
          node {
            slug
          }
        }
      }
      posts(first: $postsCount, after: $postsAfter) {
        edges {
          node {
            ...RequiredSitemapPostFields
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;

export const MoreSitemapPostsQuery = gql`
  ${PageInfoFragment}
  ${RequiredSitemapPostFieldsFragment}
  query MoreSitemapPosts(
    $host: String!
    $postsCount: Int!
    $postsAfter: String
  ) {
    publication(host: $host) {
      id
      posts(first: $postsCount, after: $postsAfter) {
        edges {
          node {
            ...RequiredSitemapPostFields
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;
