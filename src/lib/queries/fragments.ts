import { gql } from 'graphql-request';

export const PageInfoFragment = gql`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
  }
`;

export const PostFragment = gql`
  fragment Post on Post {
    id
    title
    url
    author {
      name
      profilePicture
      username
    }
    coverImage {
      url
    }
    publishedAt
    slug
    brief
  }
`;

export const PostThumbnailFragment = gql`
  fragment PostThumbnail on Post {
    __typename
    id
    title
    slug
    publishedAt
    cuid
    url
    subtitle
    brief
    readTimeInMinutes
    views
    author {
      __typename
      id
      username
      name
      profilePicture
      followersCount
    }
    coverImage {
      __typename
      url
      isPortrait
      isAttributionHidden
    }
  }
`;

export const PublicationFragment = gql`
  fragment Publication on Publication {
    id
    imprint
    title
    displayTitle
    url
    urlPattern
    metaTags
    favicon
    isTeam
    headerColor
    followersCount
    descriptionSEO
    features {
      customCSS {
        published {
          home
          post
          static
        }
      }
    }
    about {
      html
    }
    features {
      newsletter {
        isEnabled
      }
      viewCount {
        isEnabled
      }
      readTime {
        isEnabled
      }
      audioBlog {
        isEnabled
        voiceType
      }
      textSelectionSharer {
        isEnabled
      }
      customCSS {
        isEnabled
        published {
          __typename
          homeMinified
          postMinified
          staticMinified
        }
        draft {
          __typename
          homeMinified
          postMinified
          staticMinified
        }
      }
    }
    author {
      id
      name
      username
      profilePicture
      followersCount
    }
    ogMetaData {
      image
    }
    preferences {
      layout
      logo
      disableFooterBranding
      enabledPages {
        newsletter
        members
      }
      darkMode {
        enabled
        logo
      }
      navbarItems {
        __typename
        id
        label
        url
        priority
        type
        series {
          __typename
          id
        }
        page {
          __typename
          id
        }
      }
    }
    links {
      twitter
      instagram
      github
      website
      hashnode
      youtube
      linkedin
      mastodon
    }
    integrations {
      umamiWebsiteUUID
      gaTrackingID
      fbPixelID
      hotjarSiteID
      matomoURL
      matomoSiteID
      fathomSiteID
      gTagManagerID
      fathomCustomDomain
      fathomCustomDomainEnabled
      plausibleAnalyticsEnabled
      koalaPublicKey
      msClarityID
    }
  }
`;

export const PostFullFragment = gql`
  fragment PostFull on Post {
    publication {
      id
      title
      isTeam
      favicon
      about {
        html
      }
      domainInfo {
        hashnodeSubdomain
        domain {
          host
          ready
        }
      }
      urlPattern
      features {
        newsletter {
          isEnabled
        }
        readTime {
          isEnabled
        }
        textSelectionSharer {
          isEnabled
        }
      }
    }
    id
    cuid
    replyCount
    slug
    series {
      id
    }
    url
    brief
    title
    hasLatexInPost
    subtitle
    publishedAt
    updatedAt
    readTimeInMinutes
    reactionCount
    responseCount
    seo {
      title
      description
    }
    coverImage {
      url
      isPortrait
    }
    author {
      id
      name
      username
      profilePicture
      socialMediaLinks {
        twitter
      }
      bio {
        html
      }
    }
    coAuthors {
      username
      id
      name
      bio {
        html
      }
      profilePicture
    }
    content {
      markdown
      html
    }
    ogMetaData {
      image
    }
    tags {
      id
      name
      slug
    }
    features {
      tableOfContents {
        isEnabled
        items {
          id
          level
          parentId
          slug
          title
        }
      }
    }
    preferences {
      disableComments
      stickCoverToBottom
    }
    comments(first: 25) {
      totalDocuments
      edges {
        node {
          id
          dateAdded
          totalReactions
          replies(first: 10) {
            edges {
              node {
                id
                dateAdded
                author {
                  name
                  id
                  username
                  profilePicture
                }
                content {
                  markdown
                  html
                }
              }
            }
          }
          content {
            markdown
            html
          }
          author {
            name
            id
            username
            profilePicture
          }
        }
      }
    }
  }
`;

export const StaticPageFragment = gql`
  fragment StaticPage on StaticPage {
    id
    title
    slug
    content {
      markdown
      html
    }
  }
`;

export const RequiredSitemapPostFieldsFragment = gql`
  fragment RequiredSitemapPostFields on Post {
    id
    url
    slug
    publishedAt
    updatedAt
    tags {
      id
      name
      slug
    }
  }
`;
