import type { ImageMetadata } from 'astro';
import cvData from '../portfolio/cv.json';

export { cvData };
export type CvPublication = (typeof cvData.publications)[number];
export type CvProject = (typeof cvData.projects)[number];
export type CvSkill = (typeof cvData.skills)[number];
export type SkillValue = string | string[] | undefined;

const imageModules = {
	...import.meta.glob('../portfolio/img/*', { eager: true, import: 'default' }),
	...import.meta.glob('../assets/shared/*', { eager: true, import: 'default' }),
} as Record<string, ImageMetadata>;
const imagesByName = new Map(
	Object.entries(imageModules).map(([path, image]) => [path.split('/').at(-1)!, image]),
);

export const getPortfolioImage = (imageName?: string) =>
	imageName ? imagesByName.get(imageName) : undefined;

export const hasSkill = (skills: SkillValue, expectedSkill: string) =>
	Array.isArray(skills) ? skills.includes(expectedSkill) : skills === expectedSkill;

export const yearOf = (date?: string) =>
	date ? new Date(date).getUTCFullYear().toString() : undefined;
