import { localizePath, type AppLocale } from '$lib/i18n/locales';

export type NavItem = {
	label: string;
	href: string;
};

export type FeatureCardData = {
	title: string;
	description: string;
	icon: 'dashboard' | 'school';
	href: string;
	variant?: 'accent';
	label?: string;
	cta?: string;
};

export type ImageCardData = {
	title: string;
	description: string;
	image: string;
	meta: string;
	tag: string;
};

export type ToolCardData = {
	title: string;
	description: string;
	image: string;
};

export type ReportCardData = {
	title: string;
	description: string;
	meta: string;
	tag: string;
	href: string;
	image: string;
	cta: string;
};

export const buildLocalizedHref = (pathname: string, locale: AppLocale) => localizePath(pathname, locale);
