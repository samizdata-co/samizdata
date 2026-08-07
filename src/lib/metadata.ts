import type { Language } from '../i18n';
import { siteConfig } from './site';

export interface LocaleAlternate {
	lang: Language;
	href: string;
}

const absolute = (pathname: string) => new URL(pathname, siteConfig.url).href;

/** Return reciprocal locale URLs for routes that have equivalent EN/RO pages. */
export function pageAlternates(pathname: string): LocaleAlternate[] {
	const normalized = pathname.replace(/\/+$/, '') || '/';
	if (normalized.startsWith('/training') || normalized.includes('/blog/')) return [];

	const unprefixed = normalized === '/ro' ? '/' : normalized.replace(/^\/ro(?=\/)/, '') || '/';
	return [
		{ lang: 'en', href: absolute(`${unprefixed === '/' ? '' : unprefixed}/`) },
		{ lang: 'ro', href: absolute(`/ro${unprefixed === '/' ? '' : unprefixed}/`) },
	];
}

export function serializeJsonLd(value: unknown): string {
	return JSON.stringify(value).replace(/</g, '\\u003c');
}
