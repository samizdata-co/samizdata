# samizdata.co migration checklist

Use this before merging the Astro refactor to `main` and during the first week after deployment. The current production site is the SvelteKit site on `main`; the replacement is on `astro-refactor`. Treat the existing public URLs as contracts, not just implementation details.

## 1. Inventory and freeze the source of truth

- [x] Crawled all 27 root-sitemap URLs and all 14 Substack-sitemap URLs for response status, title, and canonical. Details and the initial route/source mapping are in [migration URL inventory](migration-url-inventory.md). This remains a sitemap-based crawl; `www`, unlisted assets, inbound links, and analytics/Search Console landing URLs are still unverified. Note: 8 legacy training URLs currently listed in the production sitemap returned 404.
- [x] Substack export deferred by owner; the live sitemap and RSS URL list are the current inventory sources. Reconcile against an official export later only if needed (for example, to find removed/unpublished posts or original media).
- [x] Added initial source → destination/disposition rows for the 27 root sitemap URLs and all Substack sitemap URLs. [ ] Validate missing sitemap URLs, variants/data omitted from sitemaps, and every target's destination status before treating the map as final.
- [x] Saved the initial inventories in `docs/migration-url-inventory.md`. Post-by-post content comparison was explicitly waived by the owner; slug matching is used only to map URL destinations, not to claim editorial fidelity.

## 2. URL and redirect coverage

- [x] Compared the old SvelteKit sitemap/route tree with the Astro targets. All 27 sitemap path targets (including trailing-slash output) exist in the current `dist/`; 11/11 substantive Substack slugs resolve to built `/story/{slug}/` pages. Eight listed legacy training pages currently 404 on production but are restored at the same paths in Astro. See [migration URL inventory](migration-url-inventory.md).
- [x] Created 31 Cloudflare Pages rules in `/home/nicu/Projects/samizdata/substack-redirects/public/_redirects` and verified their 301/Location headers at `https://substack-redirects.pages.dev/`. [ ] Deploy Astro to `samizdata.co` and verify every redirect target is 200 before adding `blog.samizdata.co` to Pages and switching its DNS.
- [x] Confirmed source URLs are on `blog.samizdata.co` at `/p/{slug}` with no-slash canonicals; the tested trailing-slash form 301s to that canonical. Separate Cloudflare Pages host selected; deployment and DNS cutover remain pending.
- [ ] Preserve relevant asset URLs or provide replacements for links to images, PDFs, downloadable files, and training media.
- [ ] Remember GitHub Pages serves static files: Astro's generated redirect pages are not HTTP 301/308 responses. Current static redirects use an immediate meta refresh and `noindex`; some paths may first be normalized by Pages. Do not promise search engines or clients an HTTP permanent redirect unless the hosting setup actually provides one.
- [ ] Review `public/404.html` behavior via `src/pages/404.astro`; keep genuinely missing URLs as 404 rather than redirecting all misses to the homepage.
- [ ] Validate redirect source and destination paths on the built output, and verify them against the live GitHub Pages deployment. Update the smoke check in `scripts/smoke-deployment.mjs` with representative editorial redirects and any changed critical routes.

## 3. Astro build and content checks

- [ ] Run `npm ci` from the committed lockfile, then `npm run verify`. Resolve all check, route/link/fragment, feed, metadata, image-budget, and build failures before merge.
- [ ] Check the built `dist/` route inventory against the URL spreadsheet: every intended page exists at the expected directory path and has the expected trailing slash.
- [ ] Review English and Romanian pages, article bodies, pagination/indexes, internal links, images and alt text, feed entries, sitemap URLs, canonical tags, language alternates, Open Graph metadata, and `robots.txt`.
- [ ] Confirm untranslated posts do not claim a translation, English-only Training links identify their language where relevant, and no drafts/private content are included.
- [ ] Check title/description uniqueness and publication/update dates; ensure copied Substack pages do not retain stale Substack canonicals or broken image URLs.
- [ ] Confirm all legacy Training URLs are still covered by `redirects.mjs` and that no generated redirects conflict with real Astro routes.

## 4. GitHub Pages cutover

- [ ] Review the new `.github/workflows/deploy.yml`: it installs with `npm ci`, runs `npm run verify`, and uploads `dist/`. Confirm the workflow is the only production deployment workflow after merge; the current `main` workflow uses pnpm/SvelteKit and uploads `build/`.
- [ ] Confirm GitHub Pages is configured to deploy **from GitHub Actions**, not a branch/folder source. Check repository permissions for Pages deployment and the `github-pages` environment.
- [ ] Confirm the workflow deploy trigger is the intended branch (`main`) and manual dispatch is available. Make sure merging the PR will not leave two workflows racing to publish different artifacts.
- [ ] Keep `public/CNAME` with `samizdata.co` in the deployed artifact. Preserve the root `/sitemap.xml` compatibility endpoint for GitHub Pages continuity, in addition to the generated sitemap.
- [ ] Before merging, confirm the domain's DNS records still point to GitHub Pages and GitHub's custom-domain / HTTPS settings are intact. Do not change DNS as part of this code migration unless the current configuration requires it.
- [ ] Build and inspect the exact commit/artifact that will be deployed. A local Astro preview cannot validate GitHub Pages routing, redirect behavior, custom 404s, or preservation of the custom domain.
- [ ] After deployment, run `npm run smoke -- https://samizdata.co` and check the Actions deployment URL. Also test representative legacy URLs directly in a browser and with HTTP headers/statuses; record the fact that static redirects are not server-side 301s.
- [ ] Verify apex and `www` behavior, HTTPS certificate, homepage, bilingual routes, editorial posts, services, Training, RSS, `/sitemap.xml`, generated sitemap, CNAME, slash normalization, missing-page 404, and redirect pages.

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
