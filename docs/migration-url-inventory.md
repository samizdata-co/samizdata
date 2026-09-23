# Migration URL inventory (phase 1)

Snapshot gathered 2026-09-23 from the live sitemaps and repository refs `origin/main` (SvelteKit) and `astro-refactor` (Astro). This is a sitemap/repository inventory, not a complete link/backlink crawl. Live response statuses, canonical tags, analytics/Search Console landing URLs, `www` behavior, and the full post-by-post content comparison still need owner-side review.

## Existing samizdata.co URLs

A direct live HTTP crawl of the 27 sitemap entries completed on 2026-09-23. The 19 non-training URLs returned `200`, with self-referencing canonical URLs matching their listed paths (without trailing slashes). The 8 deeper training URLs listed below all returned `404` and had no canonical in the response, despite appearing in the sitemap. `/training` returned `200`. This is a production sitemap/content mismatch, not evidence that those pages are absent from source. Resolve it by checking intended content and the live SvelteKit deployment before deciding to preserve or remove each URL.

| Current sitemap URLs observed as 404 | Intended Astro target (present in refactor content) |
| --- | --- |
| `/training/sources` | `/training/sources/` |
| `/training/sources/academic` | `/training/sources/academic/` |
| `/training/sources/calendar` | `/training/sources/calendar/` |
| `/training/toolbox` | `/training/toolbox/` |
| `/training/ddj` | `/training/ddj/` |
| `/training/ai` | `/training/ai/` |
| `/training/ai/google-sheets` | `/training/ai/google-sheets/` |
| `/training/awards` | `/training/awards/` |

Observed page titles and canonicals on the remaining 19 root sitemap URLs were returned successfully; each canonical is the same URL as listed in the live sitemap. Actual old pages are currently untrailed-slash, even though some paths may also normalize when requested with a slash. Test both forms on production during redirect validation.
The live `https://www.samizdata.co/` responds with HTTP `301` to `https://samizdata.co/`. The tested Substack post form with a trailing slash (`/p/coming-soon/`) also responds `301` to its no-slash canonical. Root-site training URLs returned 404 both with and without trailing slashes.

The live `https://samizdata.co/sitemap.xml` lists these 27 URLs (no trailing slashes). The current Astro public route contract uses trailing slashes. **Path preserved** means serve the same path with the new trailing-slash policy; confirm Pages performs the expected normalization after deployment.

| Existing live URL path | Astro target | Initial disposition |
| --- | --- | --- |
| `/` | `/` | Path preserved |
| `/ro` | `/ro/` | Path preserved |
| `/contact` | `/contact/` | Path preserved |
| `/ro/contact` | `/ro/contact/` | Path preserved |
| `/services` | `/services/` | Path preserved |
| `/ro/services` | `/ro/services/` | Path preserved |
| `/services/investigations-and-research` | same path + `/` | Path preserved |
| `/ro/services/investigations-and-research` | same path + `/` | Path preserved |
| `/services/data-analysis` | same path + `/` | Path preserved |
| `/ro/services/data-analysis` | same path + `/` | Path preserved |
| `/services/data-wrangling-and-cleaning` | same path + `/` | Path preserved |
| `/ro/services/data-wrangling-and-cleaning` | same path + `/` | Path preserved |
| `/services/visualisation` | same path + `/` | Path preserved |
| `/ro/services/visualisation` | same path + `/` | Path preserved |
| `/services/interactive-tools` | same path + `/` | Path preserved |
| `/ro/services/interactive-tools` | same path + `/` | Path preserved |
| `/services/data-explorers` | same path + `/` | Path preserved |
| `/ro/services/data-explorers` | same path + `/` | Path preserved |
| `/training` | `/training/` | Path preserved |
| `/training/sources` | `/training/sources/` | Path preserved |
| `/training/sources/academic` | same path + `/` | Path preserved |
| `/training/sources/calendar` | same path + `/` | Path preserved |
| `/training/toolbox` | `/training/toolbox/` | Path preserved |
| `/training/ddj` | `/training/ddj/` | Path preserved |
| `/training/ai` | `/training/ai/` | Path preserved |
| `/training/ai/google-sheets` | same path + `/` | Path preserved |
| `/training/awards` | `/training/awards/` | Path preserved |

Evidence: production sitemap at `https://samizdata.co/sitemap.xml`; old route tree from `origin/main`. Old SvelteKit source also defines a static fallback 404 (`svelte.config.js`) and an XML sitemap endpoint. This inventory does not enumerate non-indexed static assets or any URLs omitted from the sitemap. Service slugs should be checked against the emitted Astro routes before launch.

### Root-site titles observed in production

The successful pages below returned these `<title>` values (HTML entities decoded here). All canonicals are self-referencing to the listed live URL, with no trailing slash. The eight sitemap-listed training 404s have no title/canonical.

| Path | Observed title |
| --- | --- |
| `/` | SAMIZDATA • Data Storytelling Consultancy |
| `/ro` | SAMIZDATA • Consultanță de storytelling bazat pe date |
| `/contact` | SAMIZDATA • Contact |
| `/ro/contact` | SAMIZDATA • Contact |
| `/services` | SAMIZDATA • Data Storytelling Consultancy |
| `/ro/services` | SAMIZDATA • Consultanță de storytelling bazat pe date |
| `/services/investigations-and-research` | SAMIZDATA • Services • Investigations and research |
| `/ro/services/investigations-and-research` | SAMIZDATA • Servicii • Investigatii si cercetare |
| `/services/data-analysis` | SAMIZDATA • Services • Data analysis |
| `/ro/services/data-analysis` | SAMIZDATA • Servicii • Analiza de date |
| `/services/data-wrangling-and-cleaning` | SAMIZDATA • Services • Data wrangling and cleaning |
| `/ro/services/data-wrangling-and-cleaning` | SAMIZDATA • Servicii • Curatare si pregatire de date |
| `/services/visualisation` | SAMIZDATA • Services • Visualisation |
| `/ro/services/visualisation` | SAMIZDATA • Servicii • Vizualizare |
| `/services/interactive-tools` | SAMIZDATA • Services • Interactive tools |
| `/ro/services/interactive-tools` | SAMIZDATA • Servicii • Unelte interactive |
| `/services/data-explorers` | SAMIZDATA • Services • Data explorers |
| `/ro/services/data-explorers` | SAMIZDATA • Servicii • Exploratoare de date |
| `/training` | SAMIZDATA • Training |

## Substack publication URLs

The live `https://blog.samizdata.co/sitemap.xml` lists the archive, about page, and 12 posts. All 11 substantive posts have matching English Astro content files under `src/content/blog/en/` and resolve to the `/story/{slug}/` route family. The Substack sitemap's `/p/` paths use the same slug as the Astro content ID. Dates below are the sitemap `lastmod` values (not necessarily original publication timestamps).

All 14 URLs in the Substack sitemap (archive, about, and 12 posts) returned `200` during the same crawl. Each page's canonical matched its no-trailing-slash `blog.samizdata.co` URL. The archive's 12 sitemap entries are therefore live source URLs, though `/coming-soon` has no matching Astro article. The root publication URL and feed are also active on that Substack host; direct `www`/apex variants and Substack URLs not in its sitemap have not been crawled.

| Existing Substack URL | Astro content / target | Initial disposition |
| --- | --- | --- |
| `https://blog.samizdata.co/archive` | `/blog/` | Redirect archive index to editorial index if `blog.samizdata.co` is being retired |
| `https://blog.samizdata.co/about` | `/about/` | Redirect if the Substack page is being retired; verify destination is the intended equivalent |
| `https://blog.samizdata.co/p/how-hot-has-eastern-europe-become` (2025-06-21) | `how-hot-has-eastern-europe-become` → `/story/how-hot-has-eastern-europe-become/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/trumps-lies-about-ukraine-fact-checked` (2025-03-07) | `trumps-lies-about-ukraine-fact-checked` → `/story/trumps-lies-about-ukraine-fact-checked/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/what-happened-in-the-moldovan-election` (2024-10-28) | `what-happened-in-the-moldovan-election` → `/story/what-happened-in-the-moldovan-election/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/eastern-european-press-increasingly` (2025-03-01) | `eastern-european-press-increasingly` → `/story/eastern-european-press-increasingly/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/russias-tech-brain-drain-in-numbers` (2024-04-17) | `russias-tech-brain-drain-in-numbers` → `/story/russias-tech-brain-drain-in-numbers/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/what-will-the-world-do-today` (2024-01-25) | `what-will-the-world-do-today` → `/story/what-will-the-world-do-today/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/how-a-british-sitcom-swept-through-the-balkans` (2023-10-24) | `how-a-british-sitcom-swept-through-the-balkans` → `/story/how-a-british-sitcom-swept-through-the-balkans/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/where-to-find-the-best-beer-eastern-europe` (2023-10-20) | `where-to-find-the-best-beer-eastern-europe` → `/story/where-to-find-the-best-beer-eastern-europe/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/best-place-to-live-in-eastern-europe` (2023-07-12) | `best-place-to-live-in-eastern-europe` → `/story/best-place-to-live-in-eastern-europe/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/the-myth-of-the-russian-world` (2023-06-06) | `the-myth-of-the-russian-world` → `/story/the-myth-of-the-russian-world/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/what-is-eastern-europe` (2023-05-01) | `what-is-eastern-europe` → `/story/what-is-eastern-europe/` | Candidate redirect; content exists |
| `https://blog.samizdata.co/p/coming-soon` (2023-04-27) | No matching post found in Astro content | Inspect the original; redirect to a relevant destination only if one exists, otherwise retire as 404/410 according to the hosting strategy |

The Substack sitemap includes the publication home, `/archive`, `/about`, 12 post URLs, and `/feed`. Owner decisions: retire Substack completely; redirect `/` and `/archive` to the Astro editorial index; redirect `/feed` to the Astro RSS feed at `/rss.xml`; keep `/p/coming-soon` not found. The redirect host is Cloudflare Pages.

### External redirect host

The current Astro GitHub Pages site has `samizdata.co` as its custom domain and cannot serve `blog.samizdata.co`. The selected setup is a separate Cloudflare Pages redirect project attached to `blog.samizdata.co`, with real HTTP 301 rules and a CNAME for only the `blog` DNS record.

The redirect map, deployment steps, DNS cutover, tests, and rollback instructions are in [Cloudflare Pages redirect setup](cloudflare-pages-redirects.md). `/subscribe` redirects to `/blog/` for now, as requested.

## Content correspondence check

- [x] Sitemap slugs matched to Astro content IDs: 11/11 substantive posts found.
- [x] Post-by-post content comparison was waived by the owner; no article-level fidelity audit is planned.
- [ ] Check the `coming-soon` source and decide its final treatment.
- [ ] Compare each candidate redirect against live response/canonical and confirm whether query/trailing-slash variants have been used or indexed.
- [ ] Obtain backlink/landing-page and analytics data, if available, to identify URLs omitted from sitemaps.
