// Services data — ported from src/lib/data/services.ts on the original
// website. Each service is a cv.json "skill"; the per-detail pages list
// matching publications + projects as "examples". The `name`/`summary`/
// `keywords` are the English cv.json values, with Romanian overrides kept
// here (mirroring the source translation map). Derivation is identical to
// the original so results never drift.

import type { ImageMetadata } from 'astro';
import type { Language } from '../i18n';
import type { ServiceCardData } from './portfolio';
import {
	cvData,
	getPortfolioImage,
	hasSkill,
	yearOf,
	type CvProject,
	type CvPublication,
	type CvSkill,
} from './cv';

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
	level: CvSkill['level'];
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
type LocalizedService = {
	name: string;
	summary: string;
	keywords: string[];
};

const serviceTranslations: Record<(typeof serviceOrder)[number], LocalizedService> = {
		'Investigations and research': {
			name: 'Investigații și cercetare',
			summary:
				'Nicu este un jurnalist cu experiență în investigații aprofundate despre climă, politică și Big Tech. Apelează la noi dacă ai nevoie de cercetare și investigații bazate pe date, pregătite pentru publicare.',
			keywords: [
				'Jurnalism de date',
				'Jurnalism de investigație',
				'Cercetare',
				'Solicitări FOI',
			],
		},
		'Data analysis': {
			name: 'Analiză de date',
			summary:
				'SAMIZDATA transformă datele tale în concluzii utile, clare și ușor de publicat. Scriem cod în R, Python și JavaScript și folosim instrumente specializate precum DuckDB și QGIS pentru a aborda chiar și cele mai dificile seturi de date.',
			keywords: ['R', 'Python', 'JavaScript', 'SQL'],
		},
		'Data wrangling and cleaning': {
			name: 'Curățare și pregătire de date',
			summary:
				'Folosim tehnici avansate de AI și machine learning pentru a extrage, corela și formata date dezordonate sau nestructurate în seturi curate și fiabile.',
			keywords: [
				'Deduplicare',
				'Corelare de înregistrări',
				'Recunoașterea entităților numite',
			],
		},
		Visualisation: {
			name: 'Vizualizare',
			summary:
				'Grafice, dashboarduri și povești vizuale derulate pe ecran. Dacă îți poți imagina ceva, noi îl putem construi.',
			keywords: ['ggplot2', 'D3.js', 'Datawrapper', 'Flourish'],
		},
		'Interactive tools': {
			name: 'Unelte interactive',
			summary:
				'Calculatoare, instrumente de căutare, hărți și explainere concepute pentru a ajuta publicul să înțeleagă subiecte complexe prin interacțiune directă.',
			keywords: ['Svelte', 'SvelteKit'],
		},
		'Data explorers': {
			name: 'Exploratoare de date',
			summary:
				'Baze de date căutabile și instrumente publice de explorare care transformă registrele dezordonate în produse ce pot fi folosite concret.',
			keywords: ['Svelte', 'SvelteKit', 'PostgreSQL'],
		},
};

const skillLookup = new Map(cvData.skills.map((skill: CvSkill) => [skill.name, skill] as const));

const slugifyService = (value: string) =>
	value
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const compareExamples = (a: ServiceExample, b: ServiceExample) =>
	(Number.parseInt(b.year ?? '0', 10) || 0) - (Number.parseInt(a.year ?? '0', 10) || 0);

const getExamplesForSkill = (skillName: string): ServiceExample[] => {
	const fromPublications: ServiceExample[] = cvData.publications
		.filter((publication: CvPublication) => hasSkill(publication.skills, skillName))
		.map((publication: CvPublication) => ({
			kind: 'publication',
			title: publication.name,
			summary: publication.summary ?? '',
			href: publication.url,
			source: publication.publisher,
			year: yearOf(publication.releaseDate),
			image: getPortfolioImage(publication.img),
		}));

	const fromProjects: ServiceExample[] = cvData.projects
		.filter((project: CvProject) => hasSkill(project.skills, skillName))
		.map((project: CvProject) => ({
			kind: 'project',
			title: project.name,
			summary: project.description,
			href: project.url,
			year: yearOf(project.startDate),
			image: getPortfolioImage(project.img),
		}));

	return [...fromPublications, ...fromProjects].sort(compareExamples);
};

const buildService = (skillName: (typeof serviceOrder)[number], lang: Language): Service => {
	const skill = skillLookup.get(skillName);

	if (!skill) {
		throw new Error(`Unknown service skill: ${skillName}`);
	}

	const localized = lang === 'ro' ? serviceTranslations[skillName] : null;

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