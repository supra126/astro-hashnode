/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_HASHNODE_GQL_ENDPOINT: string;
  readonly PUBLIC_HASHNODE_PUBLICATION_HOST: string;
  readonly PUBLIC_SITE_LANG?: string;
  readonly PUBLIC_GISCUS_ENABLED?: string;
  readonly PUBLIC_GISCUS_REPO?: string;
  readonly PUBLIC_GISCUS_REPO_ID?: string;
  readonly PUBLIC_GISCUS_CATEGORY?: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
