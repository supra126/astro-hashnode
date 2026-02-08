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

## Final Performance Comparison

### Build Time (3 runs, Astro v6.0.0-beta.9)

| Run | Time |
|-----|------|
| 1 | 5.87s |
| 2 | 7.08s |
| 3 | 9.00s |
| Average | ~7.32s |

Note: Build time is dominated by Hashnode GraphQL API latency (network I/O),
not Astro's compilation. Variance between runs reflects network conditions.

### Side-by-Side Comparison

| Metric | Astro v5.17.1 | Astro v6.0.0-beta.9 | Delta |
|--------|---------------|----------------------|-------|
| Build Time | 8.54s | ~7.32s (avg of 3) | -14% (within variance) |
| Output Size | 540K | 540K | 0% |
| Pages | 10 | 10 | - |
| Build Errors | 0 | 0 | - |
| Code Changes Required | - | 0 files | - |
| Vite Version | 6.x | 7.0 | Major upgrade |
| Node Requirement | ≥18 | ≥22.12.0 | Breaking for some |

### Key Takeaways

1. **Zero-effort upgrade**: No code changes were needed. The project was already
   following Astro v6 best practices (ClientRouter, no deprecated APIs).
2. **Output identical**: Same 540K, same 10 pages, same HTML structure.
3. **Build time comparable**: Network-bound builds make framework comparison unreliable.
   Astro's own compilation step (collecting + bundling) appears similar or slightly faster.
4. **Vite 7 + Tailwind v4**: `@tailwindcss/vite` works seamlessly with Vite 7.
5. **Beta stability**: v6.0.0-beta.9 is stable enough for this use case.

### Astro v6 Breaking Changes Checklist (for this project)

| Breaking Change | Affected? | Action Taken |
|----------------|-----------|--------------|
| Node 22+ required | No (already v24) | None |
| Vite 7.0 | No issues | None |
| Zod 4 API changes | Not used | None |
| `<ViewTransitions />` removed | Already using `<ClientRouter />` | None |
| `Astro.glob()` removed | Not used | None |
| Legacy Content Collections removed | Not used | None |
| Markdown heading ID algorithm | Content from Hashnode API | None |
| Script/style tag order (declaration order) | No impact | None |
| Image service defaults (crop, no upscale) | Using raw `<img>` tags | None |
| `import.meta.env` always inlined | Only PUBLIC_ vars used | None |
| Experimental flags removed | None configured | None |
| `redirectToDefaultLocale` default changed | No i18n configured | None |
| `getStaticPaths()` Astro access removed | Not using Astro object | None |
