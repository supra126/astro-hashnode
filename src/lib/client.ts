import { GraphQLClient } from 'graphql-request';

const GQL_ENDPOINT =
  import.meta.env.PUBLIC_HASHNODE_GQL_ENDPOINT || 'https://gql.hashnode.com';

export const gqlClient = new GraphQLClient(GQL_ENDPOINT, {
  headers: {
    'hn-trace-app': 'astro-starter-hashnode',
  },
});

export const PUBLICATION_HOST =
  import.meta.env.PUBLIC_HASHNODE_PUBLICATION_HOST || 'engineering.hashnode.com';

export const SITE_LANG = import.meta.env.PUBLIC_SITE_LANG || 'en';

export const PINNED_POST_IN_LIST =
  import.meta.env.PUBLIC_PINNED_POST_IN_LIST === 'true';
