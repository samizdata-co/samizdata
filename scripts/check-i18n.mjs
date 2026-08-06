// Verifies the i18n routing invariants after `astro build`.
// Run with: node scripts/check-i18n.mjs  (or `npm run check:i18n`)
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const fail = (msg) => {
	console.error(`✗ ${msg}`);
	process.exit(1);
};
const ok = (msg) => console.log(`✓ ${msg}`);

const has = (p) => existsSync(join(dist, p));
const contains = (p, needle) => readFileSync(join(dist, p), 'utf8').includes(needle);
const read = (p) => readFileSync(join(dist, p), 'utf8');
const langSwitchHref = (p) => read(p).match(/class="lang-switch"[^>]*><a href="([^"]*)"/)?.[1] ?? '';

// Posts are keyed by slug; EN posts must live at /blog/<slug>/, RO at /ro/blog/<slug>/
const enPosts = [
	'best-place-to-live-in-eastern-europe',
	'coming-soon',
	'eastern-european-press-increasingly',
	'how-a-british-sitcom-swept-through-the-balkans',
	'how-hot-has-eastern-europe-become',
	'russias-tech-brain-drain-in-numbers',
	'the-myth-of-the-russian-world',
	'trumps-lies-about-ukraine-fact-checked',
	'using-mdx',
	'what-happened-in-the-moldovan-election',
	'what-is-eastern-europe',
	'what-will-the-world-do-today',
	'where-to-find-the-best-beer-eastern-europe',
];
const roPosts = ['ce-este-europa-de-est'];
for (const slug of enPosts) {
	if (!has(`blog/${slug}/index.html`)) fail(`EN post missing: /blog/${slug}/`);
}
for (const slug of roPosts) {
	if (!has(`ro/blog/${slug}/index.html`)) fail(`RO post missing: /ro/blog/${slug}/`);
}

// Romanian content lives only under /ro/ and must not leak into EN routes
if (has('blog/ce-este-europa-de-est/index.html')) fail('RO post leaked into EN route: /blog/ce-este-europa-de-est/');
if (has('ro/blog/what-is-eastern-europe/index.html')) fail('EN post leaked into RO route: /ro/blog/what-is-eastern-europe/');

// The blog is the home page; there is no separate /blog/ index
if (has('blog/index.html') || has('ro/blog/index.html')) fail('redundant /blog/ index pages must not exist');
for (const [p, list] of [['index.html', 'what-is-eastern-europe'], ['ro/index.html', 'ce-este-europa-de-est']]) {
	if (!contains(p, list)) fail(`${p} (the home) must list posts`);
}

// Static pages exist in both languages
for (const p of ['index.html', 'ro/index.html', 'about/index.html', 'ro/about/index.html']) {
	if (!has(p)) fail(`missing page: ${p}`);
}

// Language attributes
if (!contains('ro/index.html', '<html lang="ro"')) fail('RO home must declare lang="ro"');
if (!contains('index.html', '<html lang="en"')) fail('EN home must declare lang="en"');

// Header active state works in both languages
if (!contains('index.html', '<a href="/" class="active"')) fail('EN Home link must be active on /');
if (!contains('ro/index.html', '<a href="/ro/" class="active"')) fail('RO Home link must be active on /ro/');
if (!contains('about/index.html', '<a href="/about/" class="active"')) fail('EN About link must be active on /about/');
if (!contains('ro/about/index.html', '<a href="/ro/about/" class="active"')) fail('RO Despre link must be active on /ro/about/');

// Language switcher: equivalent page in the other language when it exists…
if (langSwitchHref('index.html') !== '/ro/') fail('EN home switcher must point to /ro/');
if (langSwitchHref('ro/index.html') !== '/') fail('RO home switcher must point to /');
if (langSwitchHref('about/index.html') !== '/ro/about/') fail('EN about switcher must point to /ro/about/');
if (langSwitchHref('ro/about/index.html') !== '/about/') fail('RO about switcher must point to /about/');
// …and falls back to the other home for single-language posts
for (const slug of enPosts) {
	if (roPosts.includes(slug)) continue;
	if (langSwitchHref(`blog/${slug}/index.html`) !== '/ro/') fail(`EN-only post switcher must fall back to /ro/ (${slug})`);
}

// Two separate feeds
if (!has('rss.xml') || !has('ro/rss.xml')) fail('RSS feeds missing');
if (!contains('rss.xml', '<language>en</language>')) fail('EN feed must declare <language>en</language>');
if (!contains('ro/rss.xml', '<language>ro</language>')) fail('RO feed must declare <language>ro</language>');

ok('i18n routing invariants hold');