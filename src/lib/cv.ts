import type { ImageMetadata } from 'astro';
import cvData from '../portfolio/cv.json';

export { cvData };
export type CvPublication = (typeof cvData.publications)[number];
export type CvProject = (typeof cvData.projects)[number];
export type CvSkill = (typeof cvData.skills)[number];
export type SkillValue = string | string[] | undefined;

// Animated GIFs are not imported: they ship as MP4 + poster pairs generated
// by scripts/encode-portfolio-media.mjs (same base name, src/portfolio/video).
// Importing a GIF would emit the multi-megabyte original into dist even when
// unused, because Astro only prunes originals it has generated variants for.
const imageModules = {
	...import.meta.glob(['../portfolio/img/*', '!../portfolio/img/*.gif'], { eager: true, import: 'default' }),
	...import.meta.glob('../assets/shared/*', { eager: true, import: 'default' }),
} as Record<string, ImageMetadata>;
const fileName = (path: string) => path.split('/').at(-1)!;
const baseName = (path: string) => fileName(path).replace(/\.[^.]+$/, '');
const imagesByName = new Map(Object.entries(imageModules).map(([path, image]) => [fileName(path), image]));

export type PortfolioVideo = { src: string; poster: ImageMetadata };

const videoSources = import.meta.glob<string>('../portfolio/video/*.mp4', {
	eager: true,
	query: '?url',
	import: 'default',
});
const videoPosters = import.meta.glob<ImageMetadata>('../portfolio/video/*.webp', {
	eager: true,
	import: 'default',
});
const postersByName = new Map(Object.entries(videoPosters).map(([path, poster]) => [baseName(path), poster]));
// Keyed by poster so card data can keep carrying a plain ImageMetadata.
const videosByPoster = new Map<ImageMetadata, PortfolioVideo>();
for (const [path, src] of Object.entries(videoSources)) {
	const name = baseName(path);
	const poster = postersByName.get(name);
	if (!poster) throw new Error(`${name}.mp4 has no ${name}.webp poster; run node scripts/encode-portfolio-media.mjs`);
	videosByPoster.set(poster, { src, poster });
	imagesByName.set(`${name}.gif`, poster);
}

/** Card image for a cv.json `img` name; for a GIF this is its video's poster (see getPortfolioVideo). */
export const getPortfolioImage = (imageName?: string) =>
	imageName ? imagesByName.get(imageName) : undefined;

export const getPortfolioVideo = (image: ImageMetadata) => videosByPoster.get(image);

export const hasSkill = (skills: SkillValue, expectedSkill: string) =>
	Array.isArray(skills) ? skills.includes(expectedSkill) : skills === expectedSkill;

export const yearOf = (date?: string) =>
	date ? new Date(date).getUTCFullYear().toString() : undefined;

// cv.json still points SAMIZDATA stories at the retired newsletter host
// (blog.samizdata.co/p/<slug>), which only 301s back to /story/<slug>/.
// Link straight to the local post when it exists so cards stay on-site.
const englishPostSlugs = new Set(
	Object.keys(import.meta.glob('../content/blog/en/*.{md,mdx}')).map((path) =>
		path.split('/').at(-1)!.replace(/\.mdx?$/, ''),
	),
);

export const portfolioHref = (url?: string) => {
	if (!url) return undefined;
	const match = /^https:\/\/blog\.samizdata\.co\/p\/([^/?#]+)\/?$/.exec(url);
	return match && englishPostSlugs.has(match[1]) ? `/story/${match[1]}/` : url;
};

export const isExternalHref = (href?: string) => Boolean(href && /^https?:\/\//.test(href));
