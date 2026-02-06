import { gql } from 'graphql-request';
import {
  PublicationFragment,
  PostFullFragment,
  PostFragment,
  PageInfoFragment,
} from './fragments';

export const SinglePostByPublicationQuery = gql`
  ${PublicationFragment}
  ${PostFullFragment}
  query SinglePostByPublication($slug: String!, $host: String!) {
    publication(host: $host) {
      ...Publication
      posts(first: 0) {
        totalDocuments
      }
      post(slug: $slug) {
        ...PostFull
      }
    }
  }
`;

export const PostsByPublicationQuery = gql`
  ${PublicationFragment}
  ${PostFragment}
  ${PageInfoFragment}
  query PostsByPublication($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      ...Publication
      posts(first: $first, after: $after) {
        totalDocuments
        edges {
          node {
            ...Post
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;

export const MorePostsByPublicationQuery = gql`
  ${PostFragment}
  ${PageInfoFragment}
  query MorePostsByPublication($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        edges {
          node {
            ...Post
            comments(first: 0) {
              totalDocuments
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

export const SlugPostsByPublicationQuery = gql`
  ${PublicationFragment}
  ${PageInfoFragment}
  query SlugPostsByPublication($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      ...Publication
      posts(first: $first, after: $after) {
        edges {
          node {
            slug
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;

export const PostsWithTagsQuery = gql`
  ${PageInfoFragment}
  query PostsWithTags($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        edges {
          node {
            slug
            tags {
              id
              name
              slug
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
