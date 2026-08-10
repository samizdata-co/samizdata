// Checks source-derived routing and generated-site invariants after `astro build`.
import { existsSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { basename, extname, join, relative, sep } from 'node:path';
import { legacyTrainingRedirects } from '../redirects.mjs';

const root = process.cwd();
const dist = join(root, 'dist');
const site = new URL('https://samizdata.co');
const failures = [];

const fail = (message) => failures.push(message);
const read = (path) => readFile(join(root, path), 'utf8');
const has = (path) => existsSync(join(root, path));

async function walk(path) {
	const entries = await readdir(path, { withFileTypes: true });
	return (await Promise.all(entries.map((entry) => {
		const child = join(path, entry.name);
		return entry.isDirectory() ? walk(child) : child;
	}))).flat();
}

function outputPath(pathname) {
	const path = decodeURIComponent(pathname).replace(/^\//, '');
	if (!path) return 'dist/index.html';
	return pathname.endsWith('/') ? `dist/${path}index.html` : `dist/${path}`;
}

function classCount(html, ...names) {
	return [...html.matchAll(/\bclass="([^"]*)"/g)]
		.filter((match) => names.every((name) => match[1].split(/\s+/).includes(name)))
		.length;
}

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function hasSkill(value, skill) {
	return Array.isArray(value) ? value.includes(skill) : value === skill;
}

if (!has('dist/index.html')) throw new Error('dist is missing; run astro build before test:dist');

const htmlFiles = (await walk(dist)).filter((path) => extname(path) === '.html');
const searchablePages = { en: 0, ro: 0 };
const homeDocument = await read('dist/index.html');
const fallbackSocialImage = homeDocument.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
for (const file of htmlFiles) {
	const html = await readFile(file, 'utf8');
	const rel = relative(dist, file).split(sep).join('/');
	const pathname = rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '')}`;
	const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
	const redirectDestination = html.match(/<meta http-equiv="refresh" content="0;url=([^"]+)"/)?.[1];
	const is404 = rel === '404.html';

	if (redirectDestination) {
		const expectedCanonical = new URL(redirectDestination, site).href;
		if (canonical !== expectedCanonical) fail(`${pathname}: redirect canonical does not match ${redirectDestination}`);
		if (!html.includes('<meta name="robots" content="noindex">')) fail(`${pathname}: redirect must be noindex`);
		if (!has(outputPath(new URL(redirectDestination, site).pathname))) fail(`${pathname}: broken redirect destination ${redirectDestination}`);
		continue;
	}

	if (!html.includes('src="https://analytics.samizdata.co/proxy.js"')) {
		fail(`${pathname}: missing Simple Analytics script`);
	}

	if (is404) {
		if (canonical) fail('/404.html: error page must not have a canonical URL');
		if (!html.includes('<meta name="robots" content="noindex">')) fail('/404.html: error page must be noindex');
		if (!html.includes('Pagina căutată nu există.')) fail('/404.html: Romanian error copy is missing');
	} else {
		const expectedCanonical = new URL(pathname, site).href;
		if (canonical !== expectedCanonical) fail(`${pathname}: expected canonical ${expectedCanonical}, got ${canonical ?? 'none'}`);
	}

	const expectedLang = pathname.startsWith('/ro/') ? 'ro' : 'en';
	if (!html.includes(`<html lang="${expectedLang}"`)) fail(`${pathname}: expected html lang="${expectedLang}"`);
	if (html.includes('data-pagefind-body')) searchablePages[expectedLang] += 1;
	if (!is404) {
		if (!html.includes('bundle-path="/pagefind/"')) fail(`${pathname}: missing Pagefind client configuration`);
		if (!html.includes('<pagefind-modal-trigger')) fail(`${pathname}: missing Pagefind search trigger`);
		if (!html.includes('<pagefind-modal')) fail(`${pathname}: missing Pagefind search modal`);
	}
	const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
	if (!title) fail(`${pathname}: missing title`);
	if (title !== 'SAMIZDATA' && !title?.endsWith(' • SAMIZDATA')) fail(`${pathname}: title is not consistently branded`);
	if (!/<meta name="description" content="[^"]+"/.test(html)) fail(`${pathname}: missing description`);
	for (const property of ['og:type', 'og:site_name', 'og:locale', 'og:url', 'og:title', 'og:description', 'og:image', 'og:image:alt']) {
		if (!html.includes(`<meta property="${property}"`)) fail(`${pathname}: missing ${property}`);
	}
	for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
		if (!html.includes(`<meta name="${name}"`)) fail(`${pathname}: missing ${name}`);
	}
	if (!/<script type="application\/ld\+json">\s*\{"@context":"https:\/\/schema\.org"/.test(html)) fail(`${pathname}: missing JSON-LD`);
	const languageAlternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
	const languageSwitchTag = html.match(/<a\b[^>]*class="lang-switcher"[^>]*>/)?.[0];
	if (languageSwitchTag) {
		const switchHref = languageSwitchTag.match(/\bhref="([^"]+)"/)?.[1];
		if (!switchHref?.startsWith('/')) fail(`${pathname}: language switch must use a local path`);
	}
	if (languageAlternates.length) {
		for (const alternateLanguage of ['en', 'ro', 'x-default']) {
			if (!languageAlternates.some((match) => match[1] === alternateLanguage)) fail(`${pathname}: incomplete locale alternates`);
		}
		const otherLanguage = expectedLang === 'en' ? 'ro' : 'en';
		if (!new RegExp(`<a[^>]+class="lang-switcher"[^>]+hreflang="${otherLanguage}"`).test(html)) {
			fail(`${pathname}: language switch does not match head alternates`);
		}
	} else if (html.includes('class="lang-switcher"')) {
		fail(`${pathname}: language switch exists without an equivalent-page alternate`);
	}
	if (pathname.includes('/story/')) {
		if (!html.includes('<meta property="og:type" content="article">')) fail(`${pathname}: must use article metadata`);
		if (!html.includes('"@type":"BlogPosting"')) fail(`${pathname}: missing BlogPosting JSON-LD`);
		if (!html.includes('<meta property="article:published_time"')) fail(`${pathname}: missing publication date metadata`);
		const socialImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
		if (!socialImage || socialImage === fallbackSocialImage) fail(`${pathname}: must use its own social image`);
	} else if (!html.includes('"@type":"Organization"')) {
		fail(`${pathname}: missing Organization JSON-LD`);
	}
	if (!html.includes('href="#main-content"')) fail(`${pathname}: missing skip link`);
	if (!is404 && (html.match(/<h1(?:\s|>)/g)?.length ?? 0) !== 1) fail(`${pathname}: expected exactly one h1`);
	for (const [iframe] of html.matchAll(/<iframe\b[^>]*>/g)) {
		if (!/\btitle="[^"]+"/.test(iframe)) fail(`${pathname}: iframe is missing a title`);
	}

	for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
		if (!href || /^(?:mailto:|tel:|javascript:)/.test(href)) continue;
		const url = new URL(href, new URL(pathname, site));
		if (url.origin !== site.origin) continue;
		if (url.pathname !== '/' && !url.pathname.endsWith('/') && !extname(url.pathname)) {
			fail(`${pathname}: non-canonical internal link ${href}`);
			continue;
		}

		const target = outputPath(url.pathname);
		if (!has(target)) {
			fail(`${pathname}: broken internal link ${href}`);
			continue;
		}
		if (url.hash && target.endsWith('.html')) {
			const id = decodeURIComponent(url.hash.slice(1));
			const targetHtml = await read(target);
			if (!targetHtml.includes(`id="${id}"`) && !targetHtml.includes(`name="${id}"`)) {
				fail(`${pathname}: missing fragment ${href}`);
			}
		}
	}
}

if (!has('dist/pagefind/pagefind-entry.json')) {
	fail('Pagefind search index is missing');
} else {
	const pagefind = JSON.parse(await read('dist/pagefind/pagefind-entry.json'));
	for (const language of ['en', 'ro']) {
		const indexed = pagefind.languages?.[language]?.page_count;
		if (indexed !== searchablePages[language]) {
			fail(`Pagefind ${language} index has ${indexed ?? 0} pages; expected ${searchablePages[language]}`);
		}
	}
}
for (const asset of ['pagefind-component-ui.css', 'pagefind-component-ui.js', 'pagefind.js', 'pagefind-worker.js']) {
	if (!has(`dist/pagefind/${asset}`)) fail(`Pagefind asset is missing: ${asset}`);
}

if ((await read('dist/CNAME')).trim() !== 'samizdata.co') fail('dist/CNAME must preserve the GitHub Pages custom domain');
for (const path of ['dist/contact/index.html', 'dist/ro/contact/index.html', 'dist/404.html']) {
	if (!has(path)) fail(`missing migration route: ${path}`);
}

for (const [source, destination] of Object.entries(legacyTrainingRedirects)) {
	const path = `dist/${source.replace(/^\//, '')}/index.html`;
	if (!has(path)) {
		fail(`missing legacy redirect ${source} → ${destination}`);
		continue;
	}
	const html = await read(path);
	if (!html.includes(`content="0;url=${destination}"`)) fail(`${source}: expected redirect to ${destination}`);
}

// Source assets have one canonical copy, and build output stays within reviewed budgets.
const sourceAssets = (await Promise.all([
	walk(join(root, 'src/assets')),
	walk(join(root, 'src/portfolio/img')),
])).flat();
const assetsByHash = new Map();
for (const path of sourceAssets) {
	const hash = createHash('sha256').update(await readFile(path)).digest('hex');
	const matches = assetsByHash.get(hash) ?? [];
	matches.push(relative(root, path));
	assetsByHash.set(hash, matches);
}
for (const matches of assetsByHash.values()) {
	if (matches.length > 1) fail(`duplicate source assets: ${matches.join(', ')}`);
}

const distFiles = await walk(dist);
const distBytes = (await Promise.all(distFiles.map(async (path) => (await stat(path)).size)))
	.reduce((total, size) => total + size, 0);
if (distBytes > 36 * 1024 * 1024) fail(`dist exceeds the 36 MiB budget (${(distBytes / 1024 / 1024).toFixed(1)} MiB)`);
for (const path of distFiles) {
	const size = (await stat(path)).size;
	if (extname(path) === '.webp' && size > 1024 * 1024) {
		fail(`${relative(root, path)} exceeds the 1 MiB optimized-image budget`);
	}
}
const animatedNames = sourceAssets
	.filter((path) => extname(path).toLowerCase() === '.gif')
	.map((path) => basename(path, '.gif'));
for (const name of animatedNames) {
	if (distFiles.some((path) => basename(path).startsWith(`${name}.`) && extname(path) === '.webp')) {
		fail(`${name}.gif must be passed through once, not expanded into animated WebP variants`);
	}
}
const fontPreloads = [...homeDocument.matchAll(/<link rel="preload"[^>]+as="font"/g)];
if (fontPreloads.length !== 1) fail(`expected one critical font preload, found ${fontPreloads.length}`);

// Content starts below the layout h1, has no heading jumps, and describes informative images.
const contentFiles = (await walk(join(root, 'src/content'))).filter((path) => /\.mdx?$/.test(path));
for (const path of contentFiles) {
	const source = await readFile(path, 'utf8');
	let previousHeading = 1;
	for (const [index, line] of source.split('\n').entries()) {
		const heading = line.match(/^(#{1,6})\s/);
		if (!heading) continue;
		const level = heading[1].length;
		if (level > previousHeading + 1) fail(`${relative(root, path)}:${index + 1}: heading jumps from h${previousHeading} to h${level}`);
		previousHeading = level;
	}
	if (/!\[\]\(/.test(source)) fail(`${relative(root, path)}: informative image has empty alt text`);
}

// The dedicated dark text accent must pass AA on every dark surface.
const globalCss = await read('src/styles/global.css');
const darkTokens = globalCss.match(/:root\[data-theme='dark'\]\s*{([\s\S]*?)\n}/)?.[1] ?? '';
const color = (name) => darkTokens.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1];
const luminance = (hex) => {
	const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => Number.parseInt(value, 16) / 255)
		.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
	return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};
const contrast = (foreground, background) => {
	const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
	return (values[0] + 0.05) / (values[1] + 0.05);
};
const accentText = color('color-accent-text');
for (const surface of ['color-surface', 'color-surface-low', 'color-surface-container', 'color-surface-high', 'color-surface-highest', 'color-surface-lowest']) {
	const background = color(surface);
	if (!accentText || !background || contrast(accentText, background) < 4.5) fail(`dark ${surface}: accent text does not meet 4.5:1 contrast`);
}

// Every content file defines a locale route and appears on that locale's home page.
for (const locale of ['en', 'ro']) {
	const sourceDir = join(root, 'src/content/blog', locale);
	const posts = (await walk(sourceDir)).filter((path) => /\.(?:md|mdx)$/.test(path));
	const home = await read(locale === 'en' ? 'dist/index.html' : 'dist/ro/index.html');
	for (const post of posts) {
		const slug = relative(sourceDir, post).split(sep).join('/').replace(/\.(?:md|mdx)$/, '');
		const pathname = `/${locale === 'en' ? '' : 'ro/'}story/${slug}/`;
		const output = outputPath(pathname);
		if (!has(output)) {
			fail(`missing route for ${relative(root, post)}: ${pathname}`);
		} else {
			const [source, html] = await Promise.all([readFile(post, 'utf8'), read(output)]);
			const contentImageCount = source.match(/!\[[^\]]*\]\([^)]+\)/g)?.length ?? 0;
			const responsiveImageCount = html.match(/<img\b[^>]*\bsrcset="[^"]+"/g)?.length ?? 0;
			if (responsiveImageCount < contentImageCount) fail(`${pathname}: Markdown images must have responsive srcsets`);
			for (const [, descriptor] of html.matchAll(/\s(\d+)w(?:,|\")/g)) {
				if (Number(descriptor) > 1440) fail(`${pathname}: generated image width exceeds the 1440px editorial ceiling`);
			}
		}
		if (!home.includes(`href="${pathname}"`)) fail(`${pathname} is missing from the ${locale} home page`);
	}

	const storyPaths = [...new Set(
		[...home.matchAll(/href="(\/(?:ro\/)?story\/[^\"]+\/)"/g)].map((match) => match[1]),
	)];
	for (const pathname of storyPaths) {
		const html = await read(outputPath(pathname));
		const section = html.match(/<section class="more-stories"[\s\S]*?<\/section>/)?.[0];
		const rendered = section
			? [...section.matchAll(/href="([^\"]+)"/g)].map((match) => match[1])
			: [];
		const expected = storyPaths.filter((candidate) => candidate !== pathname).slice(0, 3);
		if (JSON.stringify(rendered) !== JSON.stringify(expected)) {
			fail(`${pathname}: expected more stories ${expected.join(', ') || 'none'}, got ${rendered.join(', ') || 'none'}`);
		}
	}
}

// Service routes and example counts come from generated index links and cv.json.
const homeHtml = await read('dist/index.html');
if (!homeHtml.includes('<details class="mobile-nav"')) fail('mobile navigation must use a native details disclosure');
if (homeHtml.includes('data-sheet-backdrop')) fail('closed mobile navigation must not leave an off-screen focusable sheet');

const servicesIndex = await read('dist/services/index.html');
const serviceSlugs = [...new Set([...servicesIndex.matchAll(/href="\/services\/([^"/]+)\/"/g)].map((match) => match[1]))];
const cv = JSON.parse(await read('src/portfolio/cv.json'));
for (const slug of serviceSlugs) {
	const skill = cv.skills.find((item) => slugify(item.name) === slug);
	if (!skill) {
		fail(`service ${slug} has no matching cv.json skill`);
		continue;
	}
	const expected = [...cv.publications, ...cv.projects].filter((item) => hasSkill(item.skills, skill.name)).length;
	for (const locale of ['', 'ro/']) {
		const pathname = `/${locale}services/${slug}/`;
		const path = outputPath(pathname);
		if (!has(path)) {
			fail(`missing service route ${pathname}`);
			continue;
		}
		const html = await read(path);
		const rendered = classCount(html, 'example-card') + classCount(html, 'gallery-item');
		if (rendered !== expected) fail(`${pathname}: expected ${expected} cv.json examples, rendered ${rendered}`);
	}
}

const packageJson = JSON.parse(await read('package.json'));
if (Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies }).some((name) => name.includes('tailwind'))) {
	fail('Tailwind dependencies should remain removed');
}

const roServices = await read('dist/ro/services/index.html');
if (!roServices.includes('Investigații și cercetare') || !roServices.includes('Curățare și pregătire de date')) {
	fail('/ro/services/: Romanian service copy must retain diacritics');
}
if (!/href="\/training\/"[^>]*hreflang="en"/.test(roServices)) {
	fail('/ro/services/: English-only Training link must use /training/ and hreflang="en"');
}
if (!roServices.includes('doar în limba engleză')) fail('/ro/services/: Training card must disclose that resources are English-only');

const roStudio = await read('dist/ro/studio/index.html');
if (!roStudio.includes('Reportaj original, cercetare bazată pe documente')) {
	fail('/ro/studio/: featured service descriptions must remain localized');
}
if (roStudio.includes('Original reporting, document-heavy research')) {
	fail('/ro/studio/: featured service descriptions must not be replaced with English CV summaries');
}

// Feeds and sitemaps must only publish URLs that resolve in dist.
for (const [path, language] of [['dist/rss.xml', 'en'], ['dist/ro/rss.xml', 'ro']]) {
	const xml = await read(path);
	if (!xml.includes('<rss') || !xml.includes(`<language>${language}</language>`)) fail(`${path}: invalid or wrong-language RSS feed`);
	const dates = [...xml.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)].map((match) => new Date(match[1]).valueOf());
	if (dates.some((date, index) => index > 0 && date > dates[index - 1])) fail(`${path}: entries must be newest-first`);
	for (const [, href] of xml.matchAll(/<link>(https:\/\/samizdata\.co\/[^<]*)<\/link>/g)) {
		if (!has(outputPath(new URL(href).pathname))) fail(`${path}: broken feed link ${href}`);
	}
}

for (const sitemapPath of ['dist/sitemap.xml', 'dist/sitemap-index.xml', 'dist/sitemap-0.xml']) {
	const xml = await read(sitemapPath);
	if (sitemapPath.endsWith('sitemap-0.xml') && !xml.includes('hreflang="x-default"')) fail(`${sitemapPath}: missing x-default locale links`);
	for (const [, href] of xml.matchAll(/<loc>(https:\/\/samizdata\.co\/[^<]*)<\/loc>/g)) {
		if (!has(outputPath(new URL(href).pathname))) fail(`${sitemapPath}: broken sitemap URL ${href}`);
	}
}

if (failures.length) {
	console.error(failures.map((message) => `✗ ${message}`).join('\n'));
	process.exit(1);
}

console.log(`✓ dist invariants hold (${htmlFiles.length} HTML files, ${serviceSlugs.length} services, ${Object.keys(legacyTrainingRedirects).length} redirects, 2 feeds)`);
