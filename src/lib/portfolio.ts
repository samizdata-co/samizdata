// Portfolio card data — ported from HomeWork.svelte / services.ts on the
// original website. cv.json + images live in src/portfolio/ (copied from the
// Svelte project so the derivation stays identical).

import cvData from '../portfolio/cv.json';

type Publication = (typeof cvData.publications)[number];
type Project = (typeof cvData.projects)[number];
type Skill = (typeof cvData.skills)[number];
type SkillValue = string | string[] | undefined;

const hasSkill = (skills: SkillValue, expectedSkill: string) =>
	Array.isArray(skills) ? skills.includes(expectedSkill) : skills === expectedSkill;

const articleImages = import.meta.glob('../portfolio/img/*', {
	eager: true,
	query: '?url',
	import: 'default',
}) as Record<string, string>;

const getArticleImage = (imageName?: string) =>
	imageName ? (articleImages[`../portfolio/img/${imageName}`] ?? '') : '';

export type ArticleCardData = {
	publication: string;
	year: string;
	headline: string;
	image: string;
	href?: string;
};

export type ImageCardData = {
	title: string;
	image: string;
	href?: string;
};

export type ServiceCardData = {
	title: string;
	description: string;
	icon: 'file-search' | 'chart-no-axes-combined' | 'database' | 'graduation-cap';
	href?: string;
	variant?: 'accent';
	label?: string;
	cta?: string;
};

const investigations = cvData.publications.filter(
	(p): p is Publication & { publisher: string; img: string } =>
		Boolean(p.img) && hasSkill(p.skills, 'Investigations and research'),
);
const interactiveVisualisations = cvData.publications.filter(
	(p): p is Publication & { img: string } =>
		Boolean(p.img) && hasSkill(p.skills, 'Interactive tools'),
);
const dataExplorers = cvData.projects.filter(
	(p): p is Project & { img: string } =>
		Boolean(p.img) && hasSkill(p.skills, 'Data explorers'),
);

export const investigationCards: ArticleCardData[] = investigations.map((p) => ({
	publication: p.publisher,
	year: new Date(p.releaseDate).getUTCFullYear().toString(),
	headline: p.name,
	image: getArticleImage(p.img),
	href: p.url,
}));

export const interactiveCards: ImageCardData[] = interactiveVisualisations.map((p) => ({
	title: p.name,
	image: getArticleImage(p.img),
	href: p.url,
}));

export const dataExplorerCards: ImageCardData[] = dataExplorers.map((p) => ({
	title: p.name,
	image: getArticleImage(p.img),
	href: p.url,
}));

// Featured service skills (order matches the original serviceCards copy).
export const featuredSkillSummaries = new Map(
	cvData.skills.map((skill: Skill) => [skill.name, skill.summary] as const),
);