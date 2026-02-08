# Astro v5 → v6 Upgrade Log

## Baseline (Astro v5.17.1)

| Metric | Value |
|--------|-------|
| Astro Version | v5.17.1 |
| Node Version | v24.13.0 |
| Build Time | 8.54s (10 pages) |
| Build Output Size | 540K |
| Output Mode | static |

### Dependencies (pre-upgrade)

| Package | Version |
|---------|---------|
| astro | ^5.17.1 |
| graphql | ^16.12.0 |
| graphql-request | ^7.4.0 |
| tailwindcss | ^4.1.18 |
| @tailwindcss/vite | ^4.1.18 |
| @tailwindcss/typography | ^0.5.19 |
| typescript | ^5.9.3 |

## First Build After Upgrade (Astro v6.0.0-beta.9)

### Result: BUILD SUCCESS (no errors!)

| Metric | Value |
|--------|-------|
| Build Time | 9.39s (10 pages) |
| Build Output Size | 540K |

### Warnings

```
[WARN] [vite] "isRemoteAllowed", "matchHostname", "matchPathname", "matchPort"
and "matchProtocol" are imported from external module
"@astrojs/internal-helpers/remote" but never used in
"node_modules/astro/dist/assets/utils/index.js".
```

This is an internal Astro warning (inside node_modules), not actionable by us.

### Analysis: Why No Breaking Changes Hit Us

1. **ViewTransitions**: Already migrated to `<ClientRouter />` in v5
2. **Zod**: Not used in this project (no Content Collections, no schema validation)
3. **Content Collections**: Not used - data comes from Hashnode GraphQL API
4. **Astro.glob()**: Not used anywhere
5. **Experimental flags**: None configured
6. **Image service**: Using raw `<img>` tags with Hashnode CDN URLs, not Astro's image optimization
7. **Markdown heading IDs**: Content rendered by Hashnode, not Astro's markdown pipeline
8. **import.meta.env**: Only used for public env vars (already static)
9. **Vite 7**: @tailwindcss/vite compatible, no issues
10. **Node.js**: Already on v24.13.0 (v6 requires ≥22.12.0)
