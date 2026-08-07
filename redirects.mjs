import { readdirSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const trainingDir = resolve(root, 'src/content/training');

function walk(directory) {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = resolve(directory, entry.name);
		return entry.isDirectory() ? walk(path) : path;
	});
}

const trainingSlugs = walk(trainingDir)
	.filter((path) => /\.mdx?$/.test(path))
	.map((path) => relative(trainingDir, path).split(sep).join('/').replace(/\.mdx?$/, ''));

const legacyVariants = (path, destination) => [
	[path, destination],
	[`${path}.html`, destination],
	[`${path}.qmd`, destination],
	[`${path}/index`, destination],
	[`${path}/index.qmd`, destination],
];

export const legacyTrainingRedirects = Object.fromEntries([
	['/index', '/training/'],
	['/index.qmd', '/training/'],
	...trainingSlugs.flatMap((slug) => legacyVariants(`/${slug}`, `/training/${slug}/`)),
	['/ai/python-classification-agent', '/training/ai/'],
	['/ai/python-classification-agent.html', '/training/ai/'],
	['/ai/python-classification-agent.qmd', '/training/ai/'],
]);
