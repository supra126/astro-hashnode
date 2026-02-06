import { gql } from 'graphql-request';
import { PublicationFragment, StaticPageFragment } from './fragments';

export const PageByPublicationQuery = gql`
  ${PublicationFragment}
  ${StaticPageFragment}
  query PageByPublication($slug: String!, $host: String!) {
    publication(host: $host) {
      ...Publication
      posts(first: 0) {
        totalDocuments
      }
      staticPage(slug: $slug) {
        ...StaticPage
      }
    }
  }
`;
