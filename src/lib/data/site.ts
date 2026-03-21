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
	image: string;
	href: string;
};

export type ArticleCardData = {
	publication: string;
	year: string;
	headline: string;
	image: string;
	href: string;
};

export const buildLocalizedHref = (pathname: string, locale: AppLocale) => localizePath(pathname, locale);
