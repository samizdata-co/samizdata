// Portfolio card data — ported from HomeWork.svelte / services.ts on the
// original website. cv.json + images live in src/portfolio/ (copied from the
// Svelte project so the derivation stays identical).

import type { ImageMetadata } from 'astro';
import { cvData, getPortfolioImage, hasSkill, portfolioHref, type CvProject, type CvPublication } from './cv';

export type ArticleCardData = {
	publication: string;
	year: string;
	headline: string;
	image: ImageMetadata | undefined;
	href?: string;
};

export type ImageCardData = {
	title: string;
	image: ImageMetadata | undefined;
	href?: string;
};

export type ServiceCardData = {
	title: string;
	description: string;
	icon: 'file-search' | 'chart-no-axes-combined' | 'database' | 'graduation-cap';
	href?: string;
	hreflang?: string;
	variant?: 'accent';
	label?: string;
	cta?: string;
};

const investigations = cvData.publications.filter(
	(p): p is CvPublication & { publisher: string; img: string } =>
		Boolean(p.img) && hasSkill(p.skills, 'Investigations and research'),
);
const interactiveVisualisations = cvData.publications.filter(
	(p): p is CvPublication & { img: string } =>
		Boolean(p.img) && hasSkill(p.skills, 'Interactive tools'),
);
// The homepage row beside the "Data explorers" service card holds two cards:
// feature the newest explorers with an image. Older ones (e.g. OpenMoney.md)
// still appear on the Data explorers service page.
const featuredDataExplorerCount = 2;
const dataExplorers = cvData.projects
	.filter(
		(p): p is CvProject & { img: string } =>
			Boolean(p.img) && hasSkill(p.skills, 'Data explorers'),
	)
	.sort((a, b) => b.startDate.localeCompare(a.startDate))
	.slice(0, featuredDataExplorerCount);

export const investigationCards: ArticleCardData[] = investigations.map((p) => ({
	publication: p.publisher,
	year: new Date(p.releaseDate).getUTCFullYear().toString(),
	headline: p.name,
	image: getPortfolioImage(p.img),
	href: portfolioHref(p.url),
}));

export const interactiveCards: ImageCardData[] = interactiveVisualisations.map((p) => ({
	title: p.name,
	image: getPortfolioImage(p.img),
	href: portfolioHref(p.url),
}));

export const dataExplorerCards: ImageCardData[] = dataExplorers.map((p) => ({
	title: p.name,
	image: getPortfolioImage(p.img),
	href: portfolioHref(p.url),
}));