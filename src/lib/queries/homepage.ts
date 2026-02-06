import { gql } from 'graphql-request';
import { PublicationFragment, PostThumbnailFragment } from './fragments';

export const HomePageInitialQuery = gql`
  ${PublicationFragment}
  ${PostThumbnailFragment}
  query HomePageInitial($host: String!) {
    publication(host: $host) {
      ...Publication
      about {
        markdown
        html
      }
      posts(first: 10) {
        totalDocuments
      }
      followersCount
      author {
        id
        followersCount
      }
      pinnedPost {
        ...PostThumbnail
      }
    }
  }
`;

export const HomePagePostsQuery = gql`
  ${PostThumbnailFragment}
  query HomePagePosts(
    $host: String!
    $after: String
    $first: Int!
    $filter: PublicationPostConnectionFilter
  ) {
    publication(host: $host) {
      id
      posts(after: $after, first: $first, filter: $filter) {
        totalDocuments
        edges {
          node {
            ...PostThumbnail
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
