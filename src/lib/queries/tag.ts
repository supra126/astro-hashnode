import { gql } from 'graphql-request';
import { PublicationFragment, PostThumbnailFragment } from './fragments';

export const TagInitialQuery = gql`
  ${PublicationFragment}
  ${PostThumbnailFragment}
  query TagInitial(
    $slug: String!
    $host: String!
    $first: Int!
    $after: String
  ) {
    tag(slug: $slug) {
      id
      name
      logo
      slug
      tagline
    }
    publication(host: $host) {
      ...Publication
      posts(first: $first, after: $after, filter: { tagSlugs: [$slug] }) {
        edges {
          node {
            ...PostThumbnail
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const TagPostsByPublicationQuery = gql`
  ${PublicationFragment}
  ${PostThumbnailFragment}
  query TagPostsByPublication(
    $host: String!
    $tagSlug: String!
    $first: Int!
    $after: String
  ) {
    publication(host: $host) {
      ...Publication
      posts(
        first: $first
        filter: { tagSlugs: [$tagSlug] }
        after: $after
      ) {
        totalDocuments
        edges {
          node {
            ...PostThumbnail
          }
        }
      }
    }
  }
`;
