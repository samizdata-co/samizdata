# Astro port audit and improvement plan

## Purpose

This plan audits the current working tree of `blog-astro` against:

- the SvelteKit source project at `/home/nicu/Projects/samizdata/website/`;
- Astro 7 guidance for routing, content collections, images, fonts, i18n, and type checking;
- the SAMIZDATA design specification;
- the currently deployed site at `https://samizdata.co`.

It includes the uncommitted training port currently in the working tree and is updated as implementation priorities are completed.

## Executive summary

The port has a good basic direction: it is static, framework-free in the browser, uses Astro content collections, optimizes local images, centralizes most shared site chrome, and has a small dependency set. Production Lighthouse performance is already strong (98–99 on representative pages), with zero measured layout shift and no blocking JavaScript.

The original type-checking, stale-check, migration-map, and automated-accessibility blockers are resolved. Strict verification passes, and representative pages now score 100 for Lighthouse accessibility in both themes. The port still has these important remaining issues:

1. **Migration compatibility is implemented locally but not deployment-tested.** The build now includes the intentional blog-first route contract, trailing-slash policy, contact routes, localized 404, source-derived legacy Training redirects, and `CNAME`. GitHub Pages slash normalization and static redirect behavior still need confirmation on a preview deployment.
2. **There is still avoidable CSS duplication:** UI control styles are repeated and content/prose styles exist in multiple places. The large locale page clones and byte-identical image pairs have been removed.

## Audit baseline

### Build and checks

- `npm run verify`: succeeds; it runs strict checking, builds 44 pages once, then checks the generated site.
- `astro check --minimumFailingSeverity warning`: **0 errors, warnings, or hints**.
- `scripts/check-dist.mjs` derives blog routes from content files and service expectations from `cv.json`; it checks routes, internal links/fragments, locale output, canonical URLs, metadata, RSS, and sitemap entries.
- The stale `check:i18n` and `check:services` scripts have been removed.
- `npm audit`: no known vulnerabilities.

### Output and performance

- Source assets: approximately 21 MB (`src/assets` 6.6 MB, `src/portfolio` approximately 15 MB), down from 28 MB.
- Build output: approximately **32 MB**, down from 49 MB and below the enforced 36 MiB ceiling.
- Generated image output: 434 responsive WebP transformations / approximately 14 MB. No optimized WebP exceeds 1 MiB; six reviewed animated GIFs are emitted once each instead of expanding into large animated WebP variants.
- Runtime performance remains good because below-the-fold portfolio images are lazy-loaded:

| Page | Performance | Accessibility | Best practices | SEO | Initial transfer |
|---|---:|---:|---:|---:|---:|
| `/` | 99 | 100 | 100 | 100 | 379 KiB |
| `/studio/` | 100 | 100 | 100 | 100 | 614 KiB |
| `/blog/what-is-eastern-europe/` | 99 | 100 | 100 | 100 | 1,207 KiB |
| `/training/ai/` | 99 | 100 | 100 | 100 | 139 KiB |

These are production-preview Lighthouse runs. Preserve the strong runtime baseline while reducing deployment/build waste; do not optimize blindly.

### Duplication

The original clone scan found roughly 5% duplicated source lines overall. The large service-page clones are now resolved; remaining duplication is concentrated in:

- circular icon-button styles in `SiteNav`, `ThemeToggle`, and `LanguageSwitcher`;
- prose/content styles in global and training stylesheets.

The four image pairs that previously wasted about **1.17 MB** now have one canonical file each under `src/assets/shared`. A source hash check rejects future exact duplicates across post and portfolio assets.

## Phase 0 — settle remaining product and deployment decisions

These decisions should be made before refactoring routes or metadata.

### 0.1 Root URL decision: blog-first

**Decision:** adopt the blog-first repositioning. `/` and `/ro` are the editorial indexes, and the studio moves from the root to `/studio`.

Treat this as an intentional product change, not an Astro starter default. Document and measure its SEO and navigation consequences, and include the old root behavior in the migration contract.

### 0.2 Canonical URL decision: trailing slashes

**Decision:** use trailing slashes for HTML routes. Keep file routes such as `/rss.xml` and static assets unchanged.

Implementation:

- `trailingSlash: 'always'` is explicit in `astro.config.mjs`;
- `build.format: 'directory'` emits `route/index.html`, matching the canonical URL form;
- internal route links, canonical tags, sitemap entries, and RSS item links use trailing slashes;
- the production build has been checked locally for consistency.

GitHub Pages should serve `/route/` directly and permanently redirect `/route` to `/route/` for directory output. Confirm both responses on the actual deployment before launch; the currently deployed extensionless-file build has the opposite behavior and does not validate the new artifact.

### 0.3 Bilingual Training decision: link to English resources

**Decision:** Training remains English-only for now. The Romanian Services page links its Training card to `/training/` with `hreflang="en"`, and the Romanian description and CTA state clearly that the resources are in English.

Do not add Romanian Training routes or imply that translations exist until translated content is available. Keep the language switcher hidden on English-only Training pages.

## Phase 1 — establish a trustworthy quality gate

### 1.1 Strict type checking passes

- `@astrojs/check` and TypeScript are pinned development dependencies.
- `getLanguage(Astro.currentLocale)` validates locale values centrally.
- Service translations and browser DOM queries are typed correctly.
- The animated logo retains its scan-in, hover scatter/return, drifting points, and idle pulse behavior; reduced-motion users receive static bars.
- `astro/tsconfigs/strict` remains enabled without redundant `strictNullChecks`.

Acceptance met: `astro check --minimumFailingSeverity warning` exits successfully with zero diagnostics.

### 1.2 Source-derived distribution checks pass

- `scripts/check-dist.mjs` derives blog routes from `src/content/blog/{locale}` and service expectations from generated routes plus `cv.json`.
- It checks routes, locale homes, internal links and fragments, trailing-slash canonicals, required metadata, service example counts, the English-only Training link, RSS feeds, and sitemap URLs.
- `npm run verify` runs checks in the safe order: strict check, one fresh build, then distribution validation.
- The stale hard-coded checks have been deleted.

### 1.3 Package metadata and deployment CI complete

- The package is named `samizdata` and marked `private: true`.
- One GitHub Pages workflow uses the committed npm lockfile, Node 22, `npm ci`, and the unified verification command once before uploading and deploying `dist`.
- Pushes to `main` deploy automatically; `workflow_dispatch` supports manual deployments.

## Phase 2 — restore migration and routing completeness

### 2.1 Omitted routes and behavior restored locally

- `/contact/` and `/ro/contact/` are thin localized pages using the shared Contact block.
- `src/pages/404.astro` provides English and Romanian copy, selected from the requested path, and emits `noindex` without a canonical URL.
- `redirects.mjs` derives legacy Training redirects from `src/content/training` and adds the old classification-agent alias. Astro generates static, noindex redirect pages; no unusable runtime middleware was added.
- `public/CNAME` preserves `samizdata.co` in the build artifact.
- `scripts/check-dist.mjs` verifies all generated redirects, contact pages, the 404, and `CNAME`.

### 2.2 Migration route map

| Old/live route | New destination | Expected deployed behavior | Locale/canonical policy |
|---|---|---|---|
| `/` | `/` blog index | 200; intentional product change from studio to blog | English canonical `/` |
| `/ro` | `/ro/` blog index | GitHub Pages redirect to slash, then 200; intentional product change | Romanian canonical `/ro/` |
| `/studio`, `/ro/studio` | `/studio/`, `/ro/studio/` | GitHub Pages redirect to slash, then 200 | Locale-specific studio canonical |
| `/contact`, `/ro/contact` | `/contact/`, `/ro/contact/` | GitHub Pages redirect to slash, then 200 | Locale-specific contact canonical |
| `/services`, `/ro/services` | Slash equivalents | GitHub Pages redirect to slash, then 200 | Locale-specific canonical |
| Both locale variants of `/services/{investigations-and-research,data-analysis,data-wrangling-and-cleaning,visualisation,interactive-tools,data-explorers}` | Same route with slash | GitHub Pages redirect to slash, then 200 | Locale-specific canonical |
| `/training` and all current Training pages | Same route with slash | GitHub Pages redirect to slash, then 200 | English-only canonical |
| `/index`, `/index.qmd` | `/training/` | Static noindex meta redirect | `/index.html` intentionally serves the new blog root because it is the root artifact |
| `/{sources,sources/academic,sources/calendar,toolbox,ddj,ai,ai/google-sheets,awards}` with optional `.html`, `.qmd`, `/index`, `/index.html`, or `/index.qmd` | Matching `/training/{slug}/` | Directory normalization where needed, then static noindex meta redirect | Canonical points to destination |
| `/ai/python-classification-agent` with optional `.html` or `.qmd` | `/training/ai/` | Directory normalization where needed, then static noindex meta redirect | English canonical destination |
| `/rss.xml`, `/ro/rss.xml` | Same | 200 file route | Locale-specific feed URLs; no slash |
| `/sitemap.xml` | Same compatibility sitemap index | 200 XML route pointing to `/sitemap-0.xml` | `/sitemap-index.xml` remains the generated primary sitemap index |

Blog routes introduced by the blog-first port and covered by the distribution check:

- English: `/blog/best-place-to-live-in-eastern-europe/`, `/blog/eastern-european-press-increasingly/`, `/blog/how-a-british-sitcom-swept-through-the-balkans/`, `/blog/how-hot-has-eastern-europe-become/`, `/blog/russias-tech-brain-drain-in-numbers/`, `/blog/the-myth-of-the-russian-world/`, `/blog/trumps-lies-about-ukraine-fact-checked/`, `/blog/what-happened-in-the-moldovan-election/`, `/blog/what-is-eastern-europe/`, `/blog/what-will-the-world-do-today/`, and `/blog/where-to-find-the-best-beer-eastern-europe/`.
- Romanian: `/ro/blog/ce-este-europa-de-est/`.

All mapped routes, internal links, fragments, redirect destinations, feeds, and generated sitemap entries pass the local distribution check. Static meta redirects are not HTTP 301 responses; test them and slash normalization on GitHub Pages before launch.

## Phase 3 — accessibility and resilient interaction

### 3.1 Dark-mode contrast passes automated checks

- Fill/control raspberry remains `#c62168`; small text and links use the separate semantic `--color-accent-text` token (`#7b003c` light, `#f078a6` dark).
- The dark text accent is at least 4.5:1 across every dark surface token; the distribution check enforces this.
- Prose links, service CTAs, Training chips, navigation states, contact labels, and example metadata use the text token.
- Accent-card body text is solid white.
- The normative design document and CSS were updated together.

### 3.2 Mobile navigation uses a native disclosure

- The off-screen sheet and backdrop were replaced with a progressively enhanced `<details>` navigation.
- Closed links have no layout box and cannot receive focus; the menu works without JavaScript.
- A small enhancement closes on Escape, returns focus to the summary, and closes on desktop resize.
- The disclosure is non-modal, so it does not lock body scrolling or falsely imply an inert background.
- Browser smoke tests cover closed/open visibility, Escape focus return, and resize behavior.

### 3.3 Document semantics and content accessibility corrected

- Shared pages have localized skip links; the standalone 404 has a bilingual skip link.
- Blog indexes have a visible `<h1>` and `<h2>` post-card titles; standalone Contact pages also use `<h1>`.
- Markdown heading jumps were corrected and the distribution check rejects future jumps.
- The YouTube iframe has a descriptive title and obsolete attributes were removed.
- All six empty-alt informative content images found by the audit now have descriptive alternatives; intentionally decorative card/hero repetitions retain empty alt.
- Visualisation masonry titles are always visible, including touch, and non-linked items render as `<article>`.
- A global reduced-motion rule disables smooth scrolling and collapses transitions/animations.

Acceptance status: `/`, `/studio/`, `/blog/what-is-eastern-europe/`, and `/training/ai/` score 100 for Lighthouse accessibility in both light and dark themes. Automated and browser keyboard checks pass; a final manual screen-reader and 200–400% zoom review remains a pre-launch task.

## Phase 4 — SEO, feeds, and metadata parity

### 4.1 Complete metadata contract implemented

- `Base`/`BaseHead` expose typed metadata props and consistently brand non-home titles as `Page • SAMIZDATA`.
- Canonical, Open Graph, Twitter, robots, image-alt, article type, and publication/update metadata are emitted centrally.
- Social images are generated at 1200×630; posts use their own `heroImage` rather than the generic site fallback.

### 4.2 International metadata restored

- Genuinely equivalent bilingual pages emit reciprocal `hreflang` links and `x-default`; the sitemap emits the same locale relationships.
- The visible language switch receives the resolved equivalent URL and declares its target with `hreflang`.
- Untranslated posts and English-only Training pages do not advertise false alternates or show a misleading language switch.
- Blog frontmatter supports an optional stable `translationGroup`; only entries sharing that explicit value can become post alternates.

### 4.3 Structured data restored

- Website pages emit safely serialized Organization JSON-LD from `siteConfig`.
- Posts emit BlogPosting JSON-LD with headline, description, social image, dates, canonical page, author, and publisher data.

### 4.4 RSS made deterministic

- The central post helper sorts entries newest-first for pages and feeds.
- Feeds map only explicit title, description, publication date, and trailing-slash link fields.
- Distribution checks enforce ordering and route validity. Full-content feeds remain an unrequested editorial option.

## Phase 5 — simplify architecture and sources of truth

### 5.1 Large locale page clones removed

- Shared `ServicesIndex` and `ServiceDetail` components own the markup, styling, localized data, and Training-language behavior.
- The English and Romanian route files are thin wrappers supplying only the locale and, for detail routes, the generated slug.
- No custom routing framework or dynamic locale abstraction was added. The small studio, blog, and RSS wrappers remain intentionally separate.

### 5.2 Tailwind removed

- Utility strings in `ContactBlock` and the two Training components were converted to scoped CSS without changing the intended responsive layouts or visual tokens.
- `tailwindcss`, `@tailwindcss/vite`, the Vite plugin, Tailwind directives, and the unused theme aliases were removed.
- Studio and Training now use the same plain-CSS model as the rest of the Astro project. This is a maintenance simplification, not a user-facing feature or required performance fix.
- The distribution check rejects reintroduced Tailwind dependencies.

### 5.3 Consolidate shared CSS deliberately

- Keep one token definition in `global.css`; remove aliases that no code needs.
- Resolve the mismatch between the design spec (`primary #7b003c`, container `#9f1853`) and `global.css` (both primary values effectively `#9f1853`).
- Move common icon-button styling into one shared class/component used by theme, language, and menu controls.
- Keep one `.prose` ruleset for blog and training content; avoid the current duplicate training version.
- Replace broad global `main` styling plus `.studio-main`/`.training-main` undo rules with explicit layout classes.
- Fix the typo in the global button comment (`0the`).
- After migration, remove historical “ported 1:1” comments that no longer explain current intent.

### 5.4 Keep browser JavaScript focused

- The animated logo is an intentional brand interaction and retains its full behavior with a static reduced-motion fallback.
- Keep the site as a normal Astro multi-page app. Do not add `ClientRouter` or a UI framework unless a concrete requirement appears.

### 5.5 Data helpers consolidated without a data layer

- `lib/cv.ts` is the single small source for typed `cv.json` access, portfolio image lookup, skill matching, and date-to-year conversion.
- `portfolio.ts` and `services.ts` retain their page-specific derivation while sharing those primitives; `cv.json` remains authoritative.
- `StudioSections` no longer replaces Romanian featured-service descriptions with English CV summaries. Publication and project titles remain in their original publication language.
- Distribution checks cover localized studio descriptions and source-derived service example counts.

## Phase 6 — content model and editorial sustainability

### 6.1 Make frontmatter match actual use

- Add `draft: boolean = false` and exclude drafts from production routes, lists, RSS, and sitemap while showing them in development.
- Decide whether `geography` will power visible labels/filtering. It is populated on posts but currently unused; use it or remove it.
- Keep optional `updatedDate`, but surface it consistently in HTML metadata, page UI, RSS, and structured data when present.
- Add a translation-group field only when needed for real translated pairs.
- Consider a stable optional social image override rather than overloading hero images.

Avoid adding authors/tags/categories until the site has a real second author or taxonomy requirement.

### 6.2 Post querying centralized around `lib/blog.ts`

`BlogList`, static routes, feeds, and translated-entry lookup now share the locale filtering, newest-first sorting, and route generation in `lib/blog.ts`. Draft filtering remains dependent on the Phase 6.1 draft-field decision.

### 6.3 Review migrated and stale copy

- The English and Romanian About biographies now describe past work and teaching without stale “currently” claims.
- The newsletter About page still needs a decision on whether Substack remains the subscription backend before adding a CTA.
- Romanian service names, summaries, and keywords now use full diacritics, and “Discuță” is corrected to “Discută”.
- Replace the Romanian “articol de probă” post or mark it draft before launch.
- Review third-party embeds for privacy, consent, loading cost, and failure fallbacks. Prefer click-to-load for Flourish/YouTube where practical.

### 6.4 Content workflow documented

- The Astro starter README has been replaced with project-specific setup, command, architecture, and route documentation.
- It explains how to add posts, translations, hero images, Training pages, services, and portfolio items, including the current absence of draft behavior.
- Image placement, alt-text expectations, verification/build/deployment commands, URL/redirect policy, and authoritative files are documented.

## Phase 7 — assets, fonts, and build footprint

### 7.1 Exact asset duplication removed

- The four shared post/portfolio images now live once under `src/assets/shared`; content and CV image resolution reference the same files.
- Source assets fell from approximately 28 MB to 21 MB, including lossless/palette-aware downscaling of oversized editorial rasters to a 1440px publication ceiling.
- Distribution checks hash source images and reject future exact duplicates.

### 7.2 Responsive image generation and budgets implemented

- Astro constrained responsive images are enabled with editorial breakpoints at 320, 480, 720, and 1020px. Markdown images now emit useful `srcset` values and no generated blog width exceeds the 1440px source ceiling.
- Card `sizes` and width sets match their actual 16rem, 22rem, and 30rem maximum slots; card shells and inferred dimensions retain zero-CLS geometry.
- SVG and animated GIF portfolio media bypass raster transformation. Each animation is emitted once with native lazy loading instead of producing several animated WebPs that were sometimes larger than the source.
- Verification enforces: no duplicate source assets, no optimized WebP over 1 MiB, no animated-WebP expansion, and total `dist` at or below 36 MiB.
- The production artifact is approximately 32 MB, down from 49 MB. Production-preview Lighthouse remains 99–100 performance and 100 accessibility/best-practices/SEO on all four representative pages.

### 7.3 Font preloads reduced

- Astro still hosts both font families and emits Latin Extended faces for Romanian diacritics.
- Only the critical Latin Space Grotesk display face is preloaded; Work Sans and extended subsets load through `@font-face` when needed.
- Font output fell from six files / approximately 188 KiB to four files / approximately 109 KiB, and verification requires exactly one font preload.

### 7.4 Rationalize static icons

The project ships many favicon sizes and duplicate apple-touch declarations. Keep the compatibility set that is actually referenced by the manifest/head, remove redundant declarations/files after testing, and ensure the social preview image is a suitable 1200×630 asset rather than a favicon or generic starter placeholder.

## Phase 8 — operational maintenance

- The existing privacy-friendly Simple Analytics integration is restored through the first-party `analytics.samizdata.co` proxy on content and 404 pages; generated-site verification rejects its accidental removal.
- Add a scheduled or manual external-link checker for editorial posts and portfolio URLs; external news links naturally decay and should not block every build.
- A small, dependency-free `npm run smoke -- <deployment-url>` check covers `/`, the Romanian root, production canonicals, one post, studio, contact, services, Training, RSS, sitemap, the deployed 404, slash normalization, and representative legacy redirects.
- Record Lighthouse baselines/budgets in CI only after functional and accessibility fixes; avoid making flaky network-dependent scores a hard gate initially.
- Keep dependency updates small and regular; use the existing lockfile and `npm ci`.
- Decide whether generated portfolio data should be periodically validated for missing images, invalid dates/URLs, unknown skills, and duplicate entries.
- Use a dynamic build-year for the footer copyright rather than manually editing `2026`.

## Things not to add

For long-term sustainability, explicitly avoid these until required:

- no React/Svelte island or client router for the current interactions;
- no CMS while local content collections meet the editorial workflow;
- no generalized component library for a handful of site-specific components;
- no separate state-management or i18n dependency;
- no live content collections for static posts/training;
- no pagination, tags, search, comments, or additional analytics products without a product requirement;
- no abstraction for every duplicated ten-line locale wrapper.

## Recommended implementation order

1. Complete a manual screen-reader and 200–400% zoom review.
2. Deploy with the GitHub Pages workflow, run `npm run smoke -- <url>`, and confirm slash/redirect behavior.

## Final acceptance checklist

The port is on solid ground when all of the following are true:

- [x] Product owner has approved the blog-first root/blog/studio URL map.
- [x] Romanian pages identify and link to English-only Training resources accurately.
- [x] Every mapped old public URL has a locally tested destination or an intentional replacement.
- [x] The trailing-slash policy is explicit and consistent in the local production artifact.
- [ ] Slash and canonical behavior works on the actual GitHub Pages deployment.
- [x] `npm ci && npm run verify` passes from a clean checkout.
- [x] `astro check` has zero errors and warnings.
- [x] Custom checks derive expected routes/content instead of pinning inventories.
- [x] No known internal broken links or fragments.
- [x] Light and dark themes pass automated contrast checks.
- [x] Mobile navigation works with keyboard, touch, resize, Escape, and no JavaScript fallback.
- [x] Pages have a skip link, one logical `h1`, valid heading order, and accessible embeds/images.
- [x] Canonical, Open Graph, Twitter, `hreflang`, sitemap, RSS, and JSON-LD agree in the local artifact.
- [x] Posts use their own social images and article metadata.
- [x] Romanian pages do not accidentally display English service descriptions.
- [ ] Contact, 404, RSS, sitemap, training, services, and legacy redirects are deployed and tested.
- [x] Exact duplicate assets are removed and local build/page budgets are met.
- [ ] Representative Lighthouse scores remain at least 95 performance and 100 accessibility/best-practices/SEO after manual accessibility review.
- [x] README documents setup, architecture, content authoring, verification, and deployment.
