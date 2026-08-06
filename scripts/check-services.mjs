// Verifies the services section invariants after `astro build`.
// Run with: node scripts/check-services.mjs  (or `npm run check:services`)
//
// Expected example counts are pinned to the current cv.json (the same
// derivation the source site used): they only change if the CV gains a
// new matching publication/project, which is worth surfacing.
// Run `npm run build` first so `dist/` is current.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const fail = (msg) => {
	console.error(`✗ ${msg}`);
	process.exit(1);
};
const ok = (msg) => console.log(`✓ ${msg}`);

const has = (p) => existsSync(join(dist, p));
const read = (p) => readFileSync(join(dist, p), 'utf8');
const count = (p, needle) => read(p).split(`class="${needle}"`).length - 1;

const slugs = [
	'investigations-and-research',
	'data-analysis',
	'data-wrangling-and-cleaning',
	'visualisation',
	'interactive-tools',
	'data-explorers',
];

// Landing pages exist in both languages
for (const p of ['services/index.html', 'ro/services/index.html']) {
	if (!has(p)) fail(`missing services index: ${p}`);
}

// Every service detail page exists in both languages
for (const slug of slugs) {
	for (const locale of ['', 'ro/']) {
		if (!has(`${locale}services/${slug}/index.html`)) {
			fail(`missing service page: /${locale}services/${slug}/`);
		}
	}
}

// Example-card count per non-masonry service (card grids), from cv.json now.
// Visualisation is a masonry and is checked separately below.
const expectedExamples = {
	'investigations-and-research': 9,
	'data-analysis': 6,
	'data-wrangling-and-cleaning': 8,
	'interactive-tools': 9,
	'data-explorers': 2,
};
for (const [slug, n] of Object.entries(expectedExamples)) {
	for (const locale of ['', 'ro/']) {
		const got = count(`${locale}services/${slug}/index.html`, 'card-body example-card');
		if (got !== n) fail(`/${locale}services/${slug}/ expected ${n} examples, got ${got}`);
	}
}

// Visualisation uses the media masonry (11 items), not the card grid
for (const locale of ['', 'ro/']) {
	const p = `${locale}services/visualisation/index.html`;
	if (!read(p).includes('class="example-masonry"')) fail(`/${locale}services/visualisation/ must be a masonry`);
	if (count(p, 'gallery-item') !== 11) fail(`/${locale}services/visualisation/ expected 11 masonry items`);
}

// The landing index lists every service card + the accent Training card → #contact
const indexEn = read('services/index.html');
for (const slug of slugs) {
	if (!indexEn.includes(`/services/${slug}/`)) fail(`index must link /services/${slug}/`);
}
if (!indexEn.includes('href="#contact"')) fail('index Training card must point to #contact');

// Landing hero copy is localised
if (!read('ro/services/index.html').includes('Cum te putem ajuta.')) fail('RO services hero copy missing');

// RO detail pages use Romanian service names
const roNames = {
	'data-analysis': 'Analiza de date',
	'visualisation': 'Vizualizare',
	'data-explorers': 'Exploratoare de date',
};
for (const [slug, name] of Object.entries(roNames)) {
	if (!read(`ro/services/${slug}/index.html`).includes(name)) {
		fail(`RO /services/${slug}/ must show name "${name}"`);
	}
}

// Studio links the three featured services (EN + RO)
for (const [locale, base] of [['EN', 'studio/index.html'], ['RO', 'ro/studio/index.html']]) {
	const page = read(base);
	for (const slug of ['investigations-and-research', 'interactive-tools', 'data-explorers']) {
		const href = locale === 'RO' ? `/ro/services/${slug}/` : `/services/${slug}/`;
		if (!page.includes(`href="${href}"`)) fail(`${locale} studio must link /services/${slug}/`);
	}
}

ok('services section invariants hold');