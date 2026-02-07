# Astro Starter Hashnode

A high-performance, statically generated blog powered by [Astro](https://astro.build) and [Hashnode](https://hashnode.com) headless CMS. Zero client-side JavaScript by default.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsupra126%2Fastro-starter-hashnode&env=PUBLIC_HASHNODE_PUBLICATION_HOST&envDescription=Your%20Hashnode%20publication%20host%20(e.g.%20your-blog.hashnode.dev)&envLink=https%3A%2F%2Fgithub.com%2Fsupra126%2Fastro-starter-hashnode%23environment-variables)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/supra126/astro-starter-hashnode)

## Why Astro + Hashnode?

Hashnode provides an official [starter kit](https://github.com/Hashnode/starter-kit) built with Next.js. This project is a **complete rewrite in Astro** that delivers:

| Metric | Next.js Starter Kit | Astro Starter Hashnode |
|--------|-------------------|----------------|
| Client JS | ~150 kB+ | **~15 kB** (View Transitions + Search) |
| Build output | SSR / ISR | **Fully static** |
| Framework overhead | React runtime | **Zero runtime** |

## Features

- **Static Site Generation** - Pre-built HTML pages, no server required
- **Hashnode as CMS** - Write on Hashnode, deploy your own frontend
- **Dark Mode** - System preference detection + manual toggle
- **Search** - Client-side search modal with `Cmd/Ctrl + K` shortcut
- **Comments** - Nested comment threads with author avatars, optional [Giscus](https://giscus.app) integration for interactive discussions
- **Newsletter** - Built-in subscription form via Hashnode API
- **SEO** - Open Graph meta tags, canonical URLs, structured data
- **RSS Feed** - Full-content RSS with `content:encoded`
- **Sitemap** - Auto-generated XML sitemap
- **Analytics** - Supports GA4, GTM, Fathom, Plausible, Umami, and more
- **Table of Contents** - Auto-generated from post headings
- **Pagination** - Cursor-based pagination with numbered pages
- **Series & Tags** - Dedicated pages for post series and tag archives
- **Responsive** - Mobile-first design with Tailwind CSS
- **Prefetch** - Hover-based link prefetching for instant navigation
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) 20+

### Setup

```bash
# Clone the repository
git clone https://github.com/supra126/astro-starter-hashnode.git
cd astro-starter-hashnode

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:4321` in your browser.

### Environment Variables

Create a `.env` file in the project root. Only one variable is required:

```env
PUBLIC_HASHNODE_PUBLICATION_HOST=<your-blog>.hashnode.dev
```

> **Tip:** No API key needed. Leave this unset to preview with default demo content (`engineering.hashnode.com`).

### Optional Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_SITE_LANG` | Site language ([BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)) | `en` |
| `PUBLIC_SITE_URL` | Custom domain for canonical URLs / sitemap | `https://{PUBLICATION_HOST}` |
| `PUBLIC_HASHNODE_GQL_ENDPOINT` | Hashnode GraphQL API endpoint (rarely needs changing) | `https://gql.hashnode.com` |

#### Giscus Comments

This project supports [Giscus](https://giscus.app) for interactive discussions powered by GitHub Discussions. When disabled (default), Hashnode's built-in read-only comments are displayed.

1. Visit [giscus.app](https://giscus.app) and configure your repository
2. Add the generated values to your `.env`:

```env
PUBLIC_GISCUS_ENABLED=true
PUBLIC_GISCUS_REPO=your-username/your-repo
PUBLIC_GISCUS_REPO_ID=your-repo-id
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

## Project Structure

```
src/
├── components/        # UI components (Header, Footer, PostCard, Search, …)
├── layouts/
│   └── BaseLayout.astro   # Root layout (head, header, footer)
├── lib/
│   ├── api.ts             # Data fetching functions
│   ├── client.ts          # GraphQL client config
│   └── queries/           # GraphQL query definitions
├── pages/
│   ├── index.astro        # Homepage
│   ├── [slug].astro       # Post / static pages
│   ├── page/[page].astro  # Paginated listing
│   ├── series/[slug].astro
│   ├── tag/[slug].astro
│   ├── newsletter.astro
│   ├── rss.xml.ts
│   ├── sitemap.xml.ts
│   └── robots.txt.ts
├── styles/
│   └── global.css         # Tailwind imports and custom styles
└── types/
    └── index.ts           # TypeScript type definitions
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Deployment

### Vercel (Recommended)

Click the **Deploy with Vercel** button above, or:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

Click the **Deploy to Netlify** button above. The `netlify.toml` is pre-configured.

### Auto-rebuild on Publish

Since the site is statically generated, you need to trigger a rebuild when content changes on Hashnode.

**1. Create a build hook on your platform:**

- **Vercel**: Settings → Git → Deploy Hooks → Add
- **Netlify**: Site configuration → Build & deploy → Build hooks → Add build hook

**2. Add the hook URL to Hashnode:**

Go to your Hashnode dashboard → Webhooks → paste the build hook URL and select the events you want to trigger a rebuild (e.g. post published, updated, deleted).

Now every time you publish or edit a post on Hashnode, your site will automatically rebuild and deploy.

### Multi-site Setup

You can deploy multiple Hashnode publications from the same codebase by creating separate Vercel/Netlify projects with different `PUBLIC_HASHNODE_PUBLICATION_HOST` values.

## Tech Stack

- [Astro](https://astro.build) - Static site framework
- [Tailwind CSS](https://tailwindcss.com) v4 + [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [graphql-request](https://github.com/jasonkuhrt/graphql-request) - Lightweight GraphQL client
- [TypeScript](https://www.typescriptlang.org)

## License

[MIT](LICENSE)
