import { gql } from 'graphql-request';
import { PublicationFragment } from './fragments';

export const PublicationByHostQuery = gql`
  ${PublicationFragment}
  query PublicationByHost($host: String!) {
    publication(host: $host) {
      ...Publication
      posts(first: 0) {
        totalDocuments
      }
    }
  }
`;
