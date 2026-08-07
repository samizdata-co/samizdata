# SAMIZDATA

The source for [samizdata.co](https://samizdata.co): a bilingual editorial site, studio portfolio, services catalogue, and English-language journalism training resource. It is a static [Astro](https://astro.build/) site with no client-side UI framework.

## Requirements and setup

- Node.js 22.12 or newer
- npm 10 or newer (the committed lockfile is lockfile version 3)

Install the exact locked dependencies:

```sh
npm ci
```

Start Astro's background development server:

```sh
npm run astro -- dev --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

The default local URL is `http://localhost:4321`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run check` | Run strict Astro and TypeScript checks; warnings fail the command. |
| `npm run build` | Check and build the static site into `dist/`. |
| `npm run test:dist` | Validate routes, links, metadata, feeds, assets, and budgets in an existing `dist/`. |
| `npm run verify` | Run the complete local quality gate: check, build once, then validate `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run smoke -- https://example.test` | Check a deployed site's key routes and GitHub Pages behavior. |

Run `npm run verify` after every change. The deployment smoke check is deliberately separate because slash normalization, the custom 404, and static redirect serving are hosting behavior rather than build behavior.

## Architecture and routes

- `src/pages/` defines thin route entry points.
- `src/components/` contains shared Astro components; localized service markup is shared under `src/components/services/`.
- `src/layouts/Base.astro` and `src/components/BaseHead.astro` own the typed page and SEO metadata contract.
- `src/content/blog/{en,ro}/` contains editorial Markdown/MDX.
- `src/content/training/` contains English-only training Markdown/MDX.
- `src/lib/blog.ts`, `src/lib/training.ts`, and `src/lib/services.ts` derive lists and routes from content and portfolio data.
- `src/portfolio/cv.json` is the source of truth for studio work, skills, services, publications, and projects.
- `src/styles/global.css` owns design tokens and global prose styles; feature styles remain plain, scoped CSS.
- The shared layout loads the existing privacy-friendly Simple Analytics endpoint at `analytics.samizdata.co`.

The public route contract is:

| Area | English | Romanian |
| --- | --- | --- |
| Editorial index | `/` | `/ro/` |
| Posts | `/blog/{slug}/` | `/ro/blog/{slug}/` |
| Studio | `/studio/` | `/ro/studio/` |
| Services | `/services/` | `/ro/services/` |
| Contact | `/contact/` | `/ro/contact/` |
| Feed | `/rss.xml` | `/ro/rss.xml` |
| Training | `/training/` | English only |

HTML routes always use trailing slashes. The build uses directory output, and canonical URLs, internal links, feeds, and sitemaps must follow the same policy. `/sitemap.xml` is retained as a compatibility sitemap index. The root is intentionally the English blog index, not the studio.

## Content workflows

### Add a blog post

1. Add `{slug}.md` or `{slug}.mdx` under `src/content/blog/en/` or `src/content/blog/ro/`.
2. Supply the frontmatter defined in `src/content.config.ts`:

```yaml
---
title: A clear title
description: A concise search and social description
pubDate: '2026-08-07T10:00:00Z'
updatedDate: '2026-08-08T10:00:00Z' # optional
heroImage: '../../../assets/posts/example.png' # optional
geography: Eastern Europe # optional; currently not displayed
translationGroup: stable-shared-id # optional; translations only
---
```

3. Put post-only images in `src/assets/posts/`. Put an image used by both a post and the portfolio in `src/assets/shared/` instead of copying it.
4. Write useful alt text for informative Markdown images (`![Description](...)`). Empty alt text is only for genuinely decorative images.
5. Keep editorial raster sources at or below 1440px wide.

Routes, indexes, RSS, and sitemap entries are generated from the collection. There is no draft field yet: every committed post is published. To connect translations, give both posts the same explicit `translationGroup`; never set it on an untranslated post.

### Add a training page

1. Add a Markdown or MDX file under `src/content/training/`; nested paths become nested URLs.
2. Set `title`, `description`, `section` (`Resources` or `Lessons`), and numeric `order`.
3. The page appears at `/training/{content-id}/` and in training navigation automatically.

Training is English-only. Romanian links to it must use `hreflang="en"` and visibly identify the destination language. `redirects.mjs` derives legacy Quarto-era redirect variants from this content tree, so do not add redirect pages manually.

### Add or update a service

Services are selected skills from `src/portfolio/cv.json`. Publications and projects whose `skills` include the exact skill name become examples on that service page.

To introduce a service, update the skill in `cv.json`, then add its name to `serviceOrder`, icon mapping, and Romanian translation in `src/lib/services.ts`. The slug is derived from the English skill name. Do not create separate locale pages; the existing thin route wrappers render both languages.

### Add a portfolio item

Add the publication or project to `src/portfolio/cv.json`. Use the existing JSON shape, valid dates and URLs, and exact skill names from `skills`. If it has local media, put the file in `src/portfolio/img/` and set `img` to its filename. Shared blog/portfolio media belongs in `src/assets/shared/`. GIF and SVG portfolio media are passed through; raster media receives responsive variants.

## Sources of truth

| Concern | Authoritative file/location |
| --- | --- |
| Site name, production URL, contact details | `src/lib/site.ts` |
| Localized interface copy | `src/i18n.ts` |
| Content schemas | `src/content.config.ts` |
| Blog and training content | `src/content/` |
| Studio, services, publications, projects | `src/portfolio/cv.json` |
| Service selection and Romanian service copy | `src/lib/services.ts` |
| Design tokens | `src/styles/global.css` |
| Legacy Training redirects | `redirects.mjs` plus `src/content/training/` |
| URL/build policy | `astro.config.mjs` |
| Generated-site invariants and budgets | `scripts/check-dist.mjs` |
| Analytics integration | `src/layouts/Base.astro` and `src/pages/404.astro` |
| GitHub Pages deployment | `.github/workflows/deploy.yml` |

## Images and accessibility

Use Astro-managed local images where possible. Responsive widths must not exceed the component's declared slot sizes. Current verification budgets are 36 MiB for all of `dist/`, 1 MiB for any optimized WebP, and one critical font preload. Exact duplicate source assets fail verification.

Preserve one logical `h1`, heading order, skip links, localized labels, and descriptive iframe titles. Use `--color-accent-text` for links and small raspberry text; `--color-primary-container` is for fills and controls. Keep the mobile menu as a native `<details>` disclosure and respect reduced-motion preferences.

## Deployment

The site is configured for GitHub Pages at the custom domain in `public/CNAME`. The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatches; it uses `npm ci`, runs the unified verification command once, and deploys `dist/` without dropping `CNAME`.

Before deployment:

```sh
npm ci
npm run verify
```

After deploying to a preview or production origin:

```sh
npm run smoke -- https://preview.example.com
# alternatively
SMOKE_BASE_URL=https://preview.example.com npm run smoke
```

The smoke check verifies representative English and Romanian pages and their production canonicals, a post, studio, contact, services, Training, RSS, sitemap compatibility, the custom 404, permanent no-slash-to-slash redirects, and representative legacy Training redirects. Run it against the final GitHub Pages artifact before launch; a local preview cannot prove GitHub Pages normalization behavior.

Static legacy redirects are noindex HTML pages with immediate meta refreshes, not HTTP 301 responses. Directory normalization may happen first. Update `redirects.mjs` rather than hand-writing redirect pages, and preserve `public/CNAME` and `/sitemap.xml` for continuity.
