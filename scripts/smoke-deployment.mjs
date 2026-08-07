// Small post-deployment check for behavior that cannot be proven from dist alone.
const rawBase = process.argv[2] ?? process.env.SMOKE_BASE_URL;

if (!rawBase) {
	console.error('Usage: npm run smoke -- https://preview.example.com');
	process.exit(2);
}

const base = new URL(rawBase);
if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) {
	throw new Error('The deployment URL must be an HTTP(S) origin without credentials, query, or fragment');
}
base.pathname = '/';

const canonicalOrigin = new URL('https://samizdata.co');
const failures = [];
const fail = (message) => failures.push(message);

async function request(path, redirect = 'follow') {
	try {
		return await fetch(new URL(path, base), {
			redirect,
			headers: { 'user-agent': 'samizdata-deployment-smoke/1.0' },
			signal: AbortSignal.timeout(15_000),
		});
	} catch (error) {
		fail(`${path}: ${error instanceof Error ? error.message : error}`);
		return null;
	}
}

const pages = [
	'/',
	'/ro/',
	'/story/what-is-eastern-europe/',
	'/studio/',
	'/contact/',
	'/services/',
	'/training/',
];

for (const path of pages) {
	const response = await request(path);
	if (!response) continue;
	if (response.status !== 200) {
		fail(`${path}: expected 200, got ${response.status}`);
		continue;
	}
	if (!response.headers.get('content-type')?.includes('text/html')) fail(`${path}: expected HTML`);
	const canonical = new URL(path, canonicalOrigin).href;
	if (!(await response.text()).includes(`<link rel="canonical" href="${canonical}"`)) {
		fail(`${path}: expected canonical ${canonical}`);
	}
}

for (const [path, marker] of [['/rss.xml', '<rss'], ['/sitemap.xml', '<sitemapindex']]) {
	const response = await request(path);
	if (!response) continue;
	if (response.status !== 200) {
		fail(`${path}: expected 200, got ${response.status}`);
		continue;
	}
	if (!(await response.text()).includes(marker)) fail(`${path}: expected ${marker}`);
}

const missingPath = `/__deployment-smoke-missing-${Date.now()}/`;
const missing = await request(missingPath);
if (missing) {
	const body = await missing.text();
	if (missing.status !== 404) fail(`${missingPath}: expected 404, got ${missing.status}`);
	if (!body.includes('Pagina căutată nu există.')) fail(`${missingPath}: custom bilingual 404 was not served`);
}

for (const path of ['/ro', '/studio', '/services', '/training']) {
	const response = await request(path, 'manual');
	if (!response) continue;
	if (![301, 308].includes(response.status)) {
		fail(`${path}: expected permanent slash redirect, got ${response.status}`);
		continue;
	}
	const location = response.headers.get('location');
	const actualPath = location ? new URL(location, base).pathname : '';
	if (actualPath !== `${path}/`) fail(`${path}: expected redirect to ${path}/, got ${location ?? 'no Location header'}`);
}

for (const [source, destination] of [
	['/ai/', '/training/ai/'],
	['/ai/python-classification-agent/', '/training/ai/'],
]) {
	const response = await request(source);
	if (!response) continue;
	if (response.status !== 200) {
		fail(`${source}: expected static redirect page, got ${response.status}`);
		continue;
	}
	const body = await response.text();
	if (!body.includes(`content="0;url=${destination}"`)) fail(`${source}: expected meta redirect to ${destination}`);
	if (!body.includes('<meta name="robots" content="noindex">')) fail(`${source}: redirect page must be noindex`);
}

if (failures.length) {
	console.error(failures.map((message) => `✗ ${message}`).join('\n'));
	process.exit(1);
}

console.log(`✓ deployment smoke checks pass at ${base.origin}`);
