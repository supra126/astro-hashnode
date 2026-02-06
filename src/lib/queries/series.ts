import { gql } from 'graphql-request';
import { PublicationFragment, PostThumbnailFragment } from './fragments';

export const SeriesPageInitialQuery = gql`
  ${PublicationFragment}
  ${PostThumbnailFragment}
  query SeriesPageInitial(
    $host: String!
    $slug: String!
    $first: Int!
    $after: String
  ) {
    publication(host: $host) {
      ...Publication
      series(slug: $slug) {
        id
        name
        coverImage
        slug
        description {
          html
          markdown
          text
        }
        cuid
        author {
          id
          name
          username
        }
        posts(first: $first, after: $after) {
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
  }
`;
