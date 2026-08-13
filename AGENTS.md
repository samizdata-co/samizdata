## SAMIZDATA design

Use the `samizdata-design` skill for visual implementation or review. It is loaded in Pi from the canonical sibling checkout at `../brand/skills`; consult the canonical resources rather than adding local brand values.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Verification

Run `npm run verify` after changes. It performs strict Astro/TypeScript checking, builds once, then validates source-derived routes, links, fragments, services, feeds, and metadata in `dist`.

HTML routes use trailing slashes (`trailingSlash: 'always'` with directory output). Keep internal links, canonical URLs, RSS, and sitemap entries consistent with that policy. The root is intentionally blog-first; the studio lives at `/studio/`. Training is English-only, and Romanian links to it must identify the destination language.

Legacy Training redirects are generated from the content tree in `redirects.mjs`; update that source of truth rather than adding redirect pages by hand. Preserve `public/CNAME` and the `/sitemap.xml` compatibility endpoint for GitHub Pages continuity.

Keep SEO metadata in the typed `Base`/`BaseHead` contract. Only connect translated posts by giving both entries the same explicit `translationGroup`; untranslated posts and English-only Training pages must not advertise locale alternates.

Editorial raster sources are capped at 1440px wide and shared post/portfolio images belong in `src/assets/shared`. Keep responsive image widths within the declared slot sizes, pass GIF/SVG portfolio media through without raster variants, preload only the critical display-font face, and preserve the checked 36 MiB `dist` / 1 MiB optimized-image budgets.

Use `--color-accent-text` for links and small raspberry text, especially in dark mode; `--color-primary-container` is a fill/control token and fails small-text contrast on dark surfaces. Use scoped plain CSS; Tailwind was removed deliberately and should not be reintroduced for utility styling. The mobile navigation must remain a native `<details>` disclosure so it works without JavaScript and keeps closed links unfocusable.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
