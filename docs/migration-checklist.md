# samizdata.co migration checklist

Use this before merging the Astro refactor to `main` and during the first week after deployment. The current production site is the SvelteKit site on `main`; the replacement is on `astro-refactor`. Treat the existing public URLs as contracts, not just implementation details.

## 1. Inventory and freeze the source of truth

- [x] Crawled all 27 root-sitemap URLs and all 14 Substack-sitemap URLs for response status, title, and canonical. Details and the initial route/source mapping are in [migration URL inventory](migration-url-inventory.md). This remains a sitemap-based crawl; `www`, unlisted assets, inbound links, and analytics/Search Console landing URLs are still unverified. Note: 8 legacy training URLs currently listed in the production sitemap returned 404.
- [x] Substack export deferred by owner; the live sitemap and RSS URL list are the current inventory sources. Reconcile against an official export later only if needed (for example, to find removed/unpublished posts or original media).
- [x] Added initial source → destination/disposition rows for the 27 root sitemap URLs and all Substack sitemap URLs. [ ] Validate missing sitemap URLs, variants/data omitted from sitemaps, and every target's destination status before treating the map as final.
- [x] Saved the initial inventories in `docs/migration-url-inventory.md`. Post-by-post content comparison was explicitly waived by the owner; slug matching is used only to map URL destinations, not to claim editorial fidelity.

## 2. URL and redirect coverage

- [x] Compared the old SvelteKit sitemap/route tree with Astro targets. All 27 sitemap path targets exist in the Astro build; 11/11 substantive Substack slugs resolve to `/story/{slug}/`. Eight Training URLs returned 404 in the pre-migration production snapshot and are restored at those paths. See [migration URL inventory](migration-url-inventory.md).
- [x] Created 31 Cloudflare Pages rules in `/home/nicu/Projects/samizdata/substack-redirects/public/_redirects`; verified all 31 redirects at `https://substack-redirects.pages.dev/` and all 14 unique destinations return 200 on `samizdata.co`. [ ] Add `blog.samizdata.co` in Cloudflare Pages and switch only its DNS record.
- [x] Confirmed source URLs are on `blog.samizdata.co` at `/p/{slug}` with no-slash canonicals; the tested trailing-slash form 301s to that canonical. Separate Cloudflare Pages host selected; deployment and DNS cutover remain pending.
- [ ] Preserve relevant asset URLs or provide replacements for links to images, PDFs, downloadable files, and training media.
- [ ] Remember GitHub Pages serves static files: Astro's generated redirect pages are not HTTP 301/308 responses. Current static redirects use an immediate meta refresh and `noindex`; some paths may first be normalized by Pages. Do not promise search engines or clients an HTTP permanent redirect unless the hosting setup actually provides one.
- [ ] Review `public/404.html` behavior via `src/pages/404.astro`; keep genuinely missing URLs as 404 rather than redirecting all misses to the homepage.
- [ ] Validate redirect source and destination paths on the built output, and verify them against the live GitHub Pages deployment. Update the smoke check in `scripts/smoke-deployment.mjs` with representative editorial redirects and any changed critical routes.

## 3. Astro build and content checks

- [x] Ran `npm run verify` locally and in the GitHub Actions deployment workflow; both pass.
- [ ] Check the built `dist/` route inventory against the URL spreadsheet: every intended page exists at the expected directory path and has the expected trailing slash.
- [ ] Review English and Romanian pages, article bodies, pagination/indexes, internal links, images and alt text, feed entries, sitemap URLs, canonical tags, language alternates, Open Graph metadata, and `robots.txt`.
- [ ] Confirm untranslated posts do not claim a translation, English-only Training links identify their language where relevant, and no drafts/private content are included.
- [ ] Check title/description uniqueness and publication/update dates; ensure copied Substack pages do not retain stale Substack canonicals or broken image URLs.
- [ ] Confirm all legacy Training URLs are still covered by `redirects.mjs` and that no generated redirects conflict with real Astro routes.

## 4. GitHub Pages cutover

- [x] Confirmed `.github/workflows/deploy.yml` is the production workflow: it runs `npm ci`, `npm run verify`, and uploads `dist/`. It replaced the former SvelteKit/pnpm workflow on `main`.
- [x] Confirmed GitHub Pages deploys **from GitHub Actions** with `main` as source, `samizdata.co` as the custom domain, and HTTPS enforced.
- [x] Confirmed the workflow runs on pushes to `main` and supports manual dispatch; the merged deployment used only the replacement workflow.
- [x] Confirmed `public/CNAME` and the `/sitemap.xml` compatibility endpoint are present in the Astro deployment.
- [x] Confirmed the existing apex/custom-domain configuration and HTTPS are intact; `www.samizdata.co` permanently redirects to `samizdata.co`.
- [x] The deployed artifact passed the post-deployment smoke test at `https://samizdata.co`; the GitHub Actions deployment run succeeded.
- [x] Ran `npm run smoke -- https://samizdata.co`; it passed representative routes, feeds, sitemap compatibility, 404 behavior, and slash/static redirects.
- [x] Verified apex/`www`, HTTPS, bilingual routes, editorial pages, services, Training, RSS, sitemap compatibility, trailing-slash behavior, custom 404, and static legacy redirects in the deployed smoke test.

## 5. Search, newsletter, and analytics continuity

- [ ] Keep canonical URLs, sitemap entries, internal links, RSS links, and redirects consistent with the final production hostname and trailing-slash policy.
- [x] Owner confirmed Substack is being retired completely. Redirect its `/feed` endpoint to the Astro RSS at `/rss.xml`; send `/subscribe` to `/blog/` for now.
- [ ] Ensure the new site feed works and includes the copied posts with correct dates and absolute canonical links; update any feed readers or cross-promotion links if needed.
- [ ] Confirm analytics is firing on production and that any existing privacy/consent expectations are unchanged.
- [ ] Submit or re-submit the sitemap in Google Search Console and Bing Webmaster Tools if used. Monitor indexing, crawl errors, not-found URLs, and redirect coverage; request recrawls for important changed URLs.
- [ ] Track organic traffic, analytics, newsletter signups, 404s, and feed fetches for at least a week. Add newly discovered legacy URL mappings and redeploy.

## 6. Cutover and rollback

- [ ] Announce a content freeze for the old site during the final inventory/copy window. Reconcile any posts or changes published after the archive export before merging.
- [ ] Have a reviewer sign off on URL coverage, content comparison, verification output, workflow settings, and the production smoke check.
- [ ] Merge only after the checklist is complete; verify the workflow deployed the intended commit and inspect key pages on the live domain.
- [ ] Keep the old SvelteKit source reachable in Git history (and retain the URL inventory/mapping). Do not delete or overwrite `main`'s history as a rollback strategy.
- [ ] If the release is broken, revert the migration merge or redeploy the last known-good commit through GitHub Actions, then confirm the previous site and custom domain are restored. Avoid ad hoc DNS changes as the first rollback step.
