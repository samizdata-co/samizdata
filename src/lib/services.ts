// Services data — ported from src/lib/data/services.ts on the original
// website. Each service is a cv.json "skill"; the per-detail pages list
// matching publications + projects as "examples". The `name`/`summary`/
// `keywords` are the English cv.json values, with Romanian overrides kept
// here (mirroring the source translation map). Derivation is identical to
// the original so results never drift.

import type { ImageMetadata } from 'astro';
import cvData from '../portfolio/cv.json';
import type { Language } from '../i18n';
import type { ServiceCardData } from './portfolio';

type Skill = (typeof cvData.skills)[number];
type Publication = (typeof cvData.publications)[number];
type Project = (typeof cvData.projects)[number];
type SkillValue = string | string[] | undefined;

export type ServiceExample = {
	kind: 'publication' | 'project';
	title: string;
	summary: string;
	href?: string;
	source?: string;
	year?: string;
	image: ImageMetadata | undefined;
};

export type Service = {
	slug: string;
	sourceName: string;
	name: string;
	summary: string;
	keywords: string[];
	level: Skill['level'];
	icon: NonNullable<ServiceCardData['icon']>;
	examples: ServiceExample[];
};

const serviceOrder = [
	'Investigations and research',
	'Data analysis',
	'Data wrangling and cleaning',
	'Visualisation',
	'Interactive tools',
	'Data explorers',
] as const;

const serviceIcons: Record<(typeof serviceOrder)[number], Service['icon']> = {
	'Investigations and research': 'file-search',
	'Data analysis': 'chart-no-axes-combined',
	'Data wrangling and cleaning': 'database',
	Visualisation: 'chart-no-axes-combined',
	'Interactive tools': 'chart-no-axes-combined',
	'Data explorers': 'database',
};

// Romanian names/summaries/keywords (from the original translation map).
// English pulls the live cv.json values; only `ro` is overridden.
const serviceTranslations: {
	name: string;
	summary: string;
	keywords: string[];
} = {
		'Investigations and research': {
			name: 'Investigatii si cercetare',
			summary:
				'Nicu este un jurnalist cu experienta in investigatii aprofundate despre clima, politica si Big Tech. Apeleaza la noi daca ai nevoie de cercetare si investigatii bazate pe date, pregatite pentru publicare.',
			keywords: [
				'Jurnalism de date',
				'Jurnalism de investigatie',
				'Cercetare',
				'Solicitari FOI',
			],
		},
		'Data analysis': {
			name: 'Analiza de date',
			summary:
				'SAMIZDATA transforma datele tale in concluzii utile, clare si usor de publicat. Scriem cod in R, Python si JavaScript si folosim instrumente specializate precum DuckDB si QGIS pentru a aborda chiar si cele mai dificile seturi de date.',
			keywords: ['R', 'Python', 'JavaScript', 'SQL'],
		},
		'Data wrangling and cleaning': {
			name: 'Curatare si pregatire de date',
			summary:
				'Folosim tehnici avansate de AI si machine learning pentru a extrage, lega si formata date dezordonate sau nestructurate in seturi curate si fiabile.',
			keywords: [
				'Deduplicare',
				'Legare de inregistrari',
				'Recunoasterea entitatilor numite',
			],
		},
		Visualisation: {
			name: 'Vizualizare',
			summary:
				'Grafice, dashboarduri si povesti vizuale pe scroll. Daca iti poti imagina ceva, noi il putem construi.',
			keywords: ['ggplot2', 'D3.js', 'Datawrapper', 'Flourish'],
		},
		'Interactive tools': {
			name: 'Unelte interactive',
			summary:
				'Calculatoare, instrumente de cautare, harti si explainere concepute pentru a ajuta publicul sa inteleaga subiecte complexe prin interactiune directa.',
			keywords: ['Svelte', 'SvelteKit'],
		},
		'Data explorers': {
			name: 'Exploratoare de date',
			summary:
				'Baze de date cautabile si instrumente publice de explorare care transforma registrele dezordonate in produse ce pot fi folosite concret.',
			keywords: ['Svelte', 'SvelteKit', 'PostgreSQL'],
		},
};

const articleImages = import.meta.glob('../portfolio/img/*', {
	eager: true,
	import: 'default',
}) as Record<string, ImageMetadata>;

const getArticleImage = (imageName?: string) =>
	imageName ? (articleImages[`../portfolio/img/${imageName}`] ?? undefined) : undefined;

const skillLookup = new Map(cvData.skills.map((s: Skill) => [s.name, s] as const));

const hasSkill = (skills: SkillValue, expectedSkill: string) =>
	Array.isArray(skills) ? skills.includes(expectedSkill) : skills === expectedSkill;

const slugifyService = (value: string) =>
	value
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const yearOf = (date?: string) =>
	date ? new Date(date).getUTCFullYear().toString() : undefined;

const compareExamples = (a: ServiceExample, b: ServiceExample) =>
	(Number.parseInt(b.year ?? '0', 10) || 0) - (Number.parseInt(a.year ?? '0', 10) || 0);

const getExamplesForSkill = (skillName: string): ServiceExample[] => {
	const fromPublications: ServiceExample[] = cvData.publications
		.filter((p: Publication) => hasSkill(p.skills, skillName))
		.map((p: Publication) => ({
			kind: 'publication',
			title: p.name,
			summary: p.summary ?? '',
			href: p.url,
			source: p.publisher,
			year: yearOf(p.releaseDate),
			image: getArticleImage(p.img),
		}));

	const fromProjects: ServiceExample[] = cvData.projects
		.filter((p: Project) => hasSkill(p.skills, skillName))
		.map((p: Project) => ({
			kind: 'project',
			title: p.name,
			summary: p.description,
			href: p.url,
			year: yearOf(p.startDate),
			image: getArticleImage(p.img),
		}));

	return [...fromPublications, ...fromProjects].sort(compareExamples);
};

const buildService = (skillName: (typeof serviceOrder)[number], lang: Language): Service => {
	const skill = skillLookup.get(skillName);

	if (!skill) {
		throw new Error(`Unknown service skill: ${skillName}`);
	}

	const localized = lang === 'ro' ? serviceTranslations[skillName as keyof typeof serviceTranslations] : null;

	return {
		slug: slugifyService(skill.name),
		sourceName: skill.name,
		name: localized?.name ?? skill.name,
		summary: localized?.summary ?? skill.summary,
		keywords: [...(localized?.keywords ?? skill.keywords)],
		level: skill.level,
		icon: serviceIcons[skillName],
		examples: getExamplesForSkill(skill.name),
	};
};

export const getServiceSlugs = () => serviceOrder.map((s) => slugifyService(s));

export const getServices = (lang: Language) => serviceOrder.map((skill) => buildService(skill, lang));

export const getServiceBySlug = (slug: string, lang: Language) =>
	getServices(lang).find((service) => service.slug === slug);