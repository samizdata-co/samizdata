# Set up Substack URL redirects on Cloudflare Pages

Cloudflare Pages will take over `blog.samizdata.co` and issue HTTP 301 redirects to the Astro site. Substack is being retired completely. The main site remains on GitHub Pages at `samizdata.co`; this is a separate redirect project. No DNS changes have been made.

The destinations are confirmed: the old publication home, `/archive`, and `/subscribe` go to `/blog/`; the old RSS endpoint goes to the Astro feed at `/rss.xml`. Substack is being retired completely; these redirects do not send visitors back there.

**Current status (2026-09-23):** The redirect project is live at `https://substack-redirects.pages.dev/`. All 31 rules return the expected 301 and `Location` there. Do not attach `blog.samizdata.co` or switch its DNS yet: the mapped destinations on the live `samizdata.co` currently return 404 because the Astro site has not replaced the current production site. Deploy Astro first, verify its blog, story, about, and RSS destinations return 200, then proceed with the custom-domain/DNS steps below.

## Redirect map

Create `public/_redirects` in a small GitHub repository (for example, `samizdata-blog-redirects`) with these rules. The slash variants are explicit because the old Substack URLs canonicalized to no-slash paths.

```text
/ https://samizdata.co/blog/ 301
/archive https://samizdata.co/blog/ 301
/archive/ https://samizdata.co/blog/ 301
/about https://samizdata.co/about/ 301
/about/ https://samizdata.co/about/ 301
/feed https://samizdata.co/rss.xml 301
/feed/ https://samizdata.co/rss.xml 301
/subscribe https://samizdata.co/blog/ 301
/subscribe/ https://samizdata.co/blog/ 301
/p/how-hot-has-eastern-europe-become https://samizdata.co/story/how-hot-has-eastern-europe-become/ 301
/p/how-hot-has-eastern-europe-become/ https://samizdata.co/story/how-hot-has-eastern-europe-become/ 301
/p/trumps-lies-about-ukraine-fact-checked https://samizdata.co/story/trumps-lies-about-ukraine-fact-checked/ 301
/p/trumps-lies-about-ukraine-fact-checked/ https://samizdata.co/story/trumps-lies-about-ukraine-fact-checked/ 301
/p/what-happened-in-the-moldovan-election https://samizdata.co/story/what-happened-in-the-moldovan-election/ 301
/p/what-happened-in-the-moldovan-election/ https://samizdata.co/story/what-happened-in-the-moldovan-election/ 301
/p/eastern-european-press-increasingly https://samizdata.co/story/eastern-european-press-increasingly/ 301
/p/eastern-european-press-increasingly/ https://samizdata.co/story/eastern-european-press-increasingly/ 301
/p/russias-tech-brain-drain-in-numbers https://samizdata.co/story/russias-tech-brain-drain-in-numbers/ 301
/p/russias-tech-brain-drain-in-numbers/ https://samizdata.co/story/russias-tech-brain-drain-in-numbers/ 301
/p/what-will-the-world-do-today https://samizdata.co/story/what-will-the-world-do-today/ 301
/p/what-will-the-world-do-today/ https://samizdata.co/story/what-will-the-world-do-today/ 301
/p/how-a-british-sitcom-swept-through-the-balkans https://samizdata.co/story/how-a-british-sitcom-swept-through-the-balkans/ 301
/p/how-a-british-sitcom-swept-through-the-balkans/ https://samizdata.co/story/how-a-british-sitcom-swept-through-the-balkans/ 301
/p/where-to-find-the-best-beer-eastern-europe https://samizdata.co/story/where-to-find-the-best-beer-eastern-europe/ 301
/p/where-to-find-the-best-beer-eastern-europe/ https://samizdata.co/story/where-to-find-the-best-beer-eastern-europe/ 301
/p/best-place-to-live-in-eastern-europe https://samizdata.co/story/best-place-to-live-in-eastern-europe/ 301
/p/best-place-to-live-in-eastern-europe/ https://samizdata.co/story/best-place-to-live-in-eastern-europe/ 301
/p/the-myth-of-the-russian-world https://samizdata.co/story/the-myth-of-the-russian-world/ 301
/p/the-myth-of-the-russian-world/ https://samizdata.co/story/the-myth-of-the-russian-world/ 301
/p/what-is-eastern-europe https://samizdata.co/story/what-is-eastern-europe/ 301
/p/what-is-eastern-europe/ https://samizdata.co/story/what-is-eastern-europe/ 301
```

Leave `/p/coming-soon` unmatched so it returns 404. Redirect both forms of `/subscribe` to the editorial index for now, as requested. Do not send any request back to Substack. The 11 mapped story destinations match the Astro blog content IDs; the full source URL list is in the [migration URL inventory](migration-url-inventory.md).

## Create and deploy the Pages project

1. Create a GitHub repository named e.g. `samizdata-blog-redirects` and add `public/_redirects` with the rules above.
2. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git** and authorize the repository.
3. Select the production branch (normally `main`), choose no framework preset, leave the build command empty, and set the output directory to `public`.
4. Deploy. Test the temporary `*.pages.dev` URL before touching DNS: check `/`, `/archive`, `/about`, `/feed`, `/subscribe`, and both slash forms of representative story paths. Each mapped path must return HTTP `301` with the exact final `Location`; each target must return `200`. Check that `/p/coming-soon` returns 404.
5. In the Pages project's **Custom domains** settings, add `blog.samizdata.co` and follow the verification instructions. Add the hostname in Pages before changing DNS.

Cloudflare documents path rules in [`_redirects`](https://developers.cloudflare.com/pages/configuration/redirects/) and custom subdomains in its [custom-domain guide](https://developers.cloudflare.com/pages/configuration/custom-domains/). A subdomain can use a CNAME to the Pages hostname without moving the domain's nameservers. Static redirect requests are covered by the Pages Free plan's [published limits](https://developers.cloudflare.com/pages/platform/limits/).

### If the build log runs `npx wrangler deploy`

That is the Worker deploy flow, not the static Pages setup described here. It fails because Wrangler has no configured Worker/static-assets directory. Create/configure a **Pages** project instead: framework preset **None**, build command empty, output directory `public`, and no deploy command. Do not add Worker config or install Wrangler for this redirect site.

## Switch the DNS record

1. At the current DNS provider, save the existing `blog` record's type, target, proxy/status, and TTL for reference.
2. Replace only the `blog.samizdata.co` record with the CNAME target Cloudflare Pages provides, usually `<project>.pages.dev`. Do not change the apex website records, MX records, or unrelated DNS records.
3. Wait for DNS and HTTPS certificate provisioning. Test `https://blog.samizdata.co` itself: verify the 301 status and final `Location` for all mapped paths, and verify `/p/coming-soon` returns 404.
4. Check the Astro RSS feed parses at `https://samizdata.co/rss.xml`. Once redirects and the email/newsletter shutdown are confirmed, retire the Substack publication.

Keep the saved DNS value and Substack account available until the redirect host and TLS are verified, to allow temporary rollback if cutover fails. After the migration is accepted, Substack can be fully closed; no ongoing Substack service is needed.

## References

- [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
- [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Astro RSS feed source](../src/pages/rss.xml.js)
- [Astro route and trailing-slash policy](../astro.config.mjs)
