import { gql } from 'graphql-request';
import { PublicationFragment, PostThumbnailFragment } from './fragments';

export const NewsletterQuery = gql`
  ${PublicationFragment}
  ${PostThumbnailFragment}
  query Newsletter($host: String!) {
    publication(host: $host) {
      ...Publication
      author {
        id
        followersCount
      }
      recentPosts: posts(first: 3) {
        edges {
          node {
            ...PostThumbnail
          }
        }
      }
    }
  }
`;

export const SubscribeToNewsletterMutation = gql`
  mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      status
    }
  }
`;
