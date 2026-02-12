/**
 * TypeScript types for Hashnode GraphQL API responses.
 * Based on the Hashnode public GraphQL schema.
 */

// ---------- Pagination ----------

export interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface Edge<T> {
  node: T;
  cursor?: string;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  totalDocuments?: number;
}

// ---------- User / Author ----------

export interface User {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
  followersCount?: number;
  bio?: { html: string };
  socialMediaLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

// ---------- Tag ----------

export interface Tag {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  tagline?: string;
}

// ---------- Series ----------

export interface Series {
  id: string;
  name: string;
  slug: string;
  coverImage?: string;
  cuid?: string;
  description?: {
    html: string;
    markdown?: string;
    text?: string;
  };
  author?: Pick<User, 'id' | 'name' | 'username'>;
  posts?: Connection<PostThumbnail>;
}

// ---------- Post ----------

export interface CoverImage {
  url: string;
  isPortrait?: boolean;
  isAttributionHidden?: boolean;
}

export interface SEO {
  title?: string;
  description?: string;
}

export interface Content {
  markdown?: string;
  html: string;
}

export interface TocItem {
  id: string;
  level: number;
  parentId: string | null;
  slug: string;
  title: string;
}

export interface Comment {
  id: string;
  dateAdded: string;
  totalReactions: number;
  content: Content;
  author: Pick<User, 'id' | 'name' | 'username' | 'profilePicture'>;
  replies?: {
    edges: Edge<{
      id: string;
      dateAdded: string;
      content: Content;
      author: Pick<User, 'id' | 'name' | 'username' | 'profilePicture'>;
    }>[];
  };
}

/** Minimal post fields used in lists/grids */
export interface PostThumbnail {
  __typename?: string;
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  cuid?: string;
  url: string;
  subtitle?: string;
  brief: string;
  readTimeInMinutes?: number;
  views?: number;
  author: Pick<User, 'id' | 'username' | 'name' | 'profilePicture' | 'followersCount'>;
  coverImage?: CoverImage;
}

/** Simple post fields */
export interface PostSimple {
  id: string;
  title: string;
  url: string;
  slug: string;
  brief: string;
  publishedAt: string;
  author: Pick<User, 'name' | 'profilePicture' | 'username'>;
  coverImage?: { url: string };
}

/** Full post data for single post page */
export interface PostFull {
  publication?: {
    id: string;
    title: string;
    isTeam: boolean;
    favicon?: string;
    about?: { html: string };
    domainInfo?: {
      hashnodeSubdomain: string;
      domain?: { host: string; ready: boolean };
    };
    urlPattern?: string;
    features?: {
      newsletter?: { isEnabled: boolean };
      readTime?: { isEnabled: boolean };
      textSelectionSharer?: { isEnabled: boolean };
    };
  };
  id: string;
  cuid?: string;
  replyCount?: number;
  slug: string;
  series?: { id: string };
  url: string;
  brief: string;
  title: string;
  hasLatexInPost?: boolean;
  subtitle?: string;
  publishedAt: string;
  updatedAt?: string;
  readTimeInMinutes?: number;
  reactionCount?: number;
  responseCount?: number;
  seo?: SEO;
  coverImage?: CoverImage;
  author: User;
  coAuthors?: Array<Pick<User, 'id' | 'username' | 'name' | 'profilePicture'> & { bio?: { html: string } }>;
  content: Content;
  ogMetaData?: { image: string };
  tags?: Tag[];
  features?: {
    tableOfContents?: {
      isEnabled: boolean;
      items: TocItem[];
    };
  };
  preferences?: {
    disableComments?: boolean;
    stickCoverToBottom?: boolean;
  };
  comments?: Connection<Comment>;
}

// ---------- Static Page ----------

export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: Content;
  seo?: SEO;
  ogMetaData?: { image: string };
}

// ---------- Publication ----------

export interface PublicationNavbarItem {
  __typename?: string;
  id: string;
  label: string;
  url: string;
  priority?: number;
  type: string;
  series?: { id: string };
  page?: { id: string };
}

export interface PublicationLinks {
  twitter?: string;
  instagram?: string;
  github?: string;
  website?: string;
  hashnode?: string;
  youtube?: string;
  linkedin?: string;
  mastodon?: string;
}

export interface PublicationIntegrations {
  umamiWebsiteUUID?: string;
  gaTrackingID?: string;
  fbPixelID?: string;
  hotjarSiteID?: string;
  matomoURL?: string;
  matomoSiteID?: string;
  fathomSiteID?: string;
  gTagManagerID?: string;
  fathomCustomDomain?: string;
  fathomCustomDomainEnabled?: boolean;
  plausibleAnalyticsEnabled?: boolean;
  koalaPublicKey?: string;
  msClarityID?: string;
}

export interface Publication {
  id: string;
  imprint?: string;
  title: string;
  displayTitle?: string;
  url: string;
  urlPattern?: string;
  metaTags?: string;
  favicon?: string;
  isTeam: boolean;
  headerColor?: string;
  followersCount?: number;
  descriptionSEO?: string;
  about?: { html: string; markdown?: string };
  features?: {
    newsletter?: { isEnabled: boolean };
    viewCount?: { isEnabled: boolean };
    readTime?: { isEnabled: boolean };
    audioBlog?: { isEnabled: boolean; voiceType?: string };
    textSelectionSharer?: { isEnabled: boolean };
    customCSS?: {
      isEnabled: boolean;
      published?: {
        homeMinified?: string;
        postMinified?: string;
        staticMinified?: string;
        home?: string;
        post?: string;
        static?: string;
      };
      draft?: {
        homeMinified?: string;
        postMinified?: string;
        staticMinified?: string;
      };
    };
  };
  author: User;
  ogMetaData?: { image: string };
  preferences?: {
    layout: 'stacked' | 'grid' | 'magazine';
    logo?: string;
    disableFooterBranding?: boolean;
    enabledPages?: {
      newsletter?: boolean;
      members?: boolean;
    };
    darkMode?: {
      enabled?: boolean;
      logo?: string;
    };
    navbarItems?: PublicationNavbarItem[];
  };
  links?: PublicationLinks;
  integrations?: PublicationIntegrations;
  // Extra fields from specific queries
  posts?: Connection<PostThumbnail | PostSimple> & { totalDocuments?: number };
  pinnedPost?: PostThumbnail;
}

// ---------- Search ----------

export interface SearchPostNode {
  id: string;
  brief: string;
  title: string;
  cuid: string;
  slug: string;
  reactionCount: number;
  publishedAt: string;
  url: string;
  coverImage?: { url: string };
  author: Pick<User, 'id' | 'name'>;
  publication?: { title: string; url: string };
}

// ---------- API Response types ----------

export interface PublicationByHostResponse {
  publication: Publication;
}

export interface HomePageInitialResponse {
  publication: Publication & {
    about: { markdown: string; html: string };
    pinnedPost: PostThumbnail | null;
  };
}

export interface HomePagePostsResponse {
  publication: {
    id: string;
    posts: Connection<PostThumbnail>;
  };
}

export interface SinglePostResponse {
  publication: Publication & {
    post: PostFull | null;
  };
}

export interface TagInitialResponse {
  tag: Tag | null;
  publication: Omit<Publication, 'posts'> & {
    posts: Connection<PostThumbnail>;
  };
}

export interface SeriesPageResponse {
  publication: Publication & {
    series: Series | null;
  };
}

export interface PageByPublicationResponse {
  publication: Publication & {
    staticPage: StaticPage | null;
  };
}

export interface SearchResponse {
  searchPostsOfPublication: Connection<SearchPostNode>;
}

export interface RSSFeedResponse {
  publication: Omit<Publication, 'posts'> & {
    posts: Connection<{
      id: string;
      title: string;
      url: string;
      slug: string;
      brief: string;
      publishedAt: string;
      content: { html: string };
      coverImage?: { url: string };
      tags: Tag[];
      author: Pick<User, 'name' | 'username'>;
    }>;
  };
}

export interface SitemapResponse {
  publication: {
    id: string;
    url: string;
    staticPages: { edges: Edge<{ slug: string }>[] };
    posts: Connection<{
      id: string;
      url: string;
      slug: string;
      publishedAt: string;
      updatedAt?: string;
      tags: Tag[];
    }>;
  };
}

export interface NewsletterResponse {
  publication: Publication & {
    recentPosts: { edges: Edge<PostThumbnail>[] };
  };
}

export interface SubscribeToNewsletterResponse {
  subscribeToNewsletter: {
    status: string;
  };
}
