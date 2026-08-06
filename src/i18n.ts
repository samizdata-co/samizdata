// Central i18n module: the only place that knows about languages and
// UI strings. Page/content structure is derived from this (folder names
// must match `languages` and the `i18n` config in astro.config.mjs).

export const defaultLang = 'en';
export const languages = ['en', 'ro'] as const;
export type Language = (typeof languages)[number];

export const ui = {
	en: {
		'site.title': 'SAMIZDATA',
		'site.description': 'Reading Eastern Europe through data.',
		'nav.home': 'Home',
		'nav.about': 'About',
		'footer.rights': 'All rights reserved.',
		'last.updated': 'Last updated on',
	},
	ro: {
		'site.title': 'SAMIZDATA',
		'site.description': 'Citim Europa de Est prin date.',
		'nav.home': 'Acasă',
		'nav.about': 'Despre',
		'footer.rights': 'Toate drepturile rezervate.',
		'last.updated': 'Ultima actualizare:',
	},
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Language) {
	return (key: TranslationKey) => ui[lang][key];
}

// Turns a URL pathname like "/ro/about/" into its canonical, locale-stripped,
// leading-slash form ("/about/"). Used for the header active-state and the
// language switcher. (Literal pathnames may have lost their leading slash if
// BASE_URL === "/", so we re-add it first.)
export function canonicalPath(pathname: string, lang: Language): string {
	const normalized = pathname.startsWith('/') ? pathname : '/' + pathname;
	return lang === defaultLang ? normalized : normalized.replace(new RegExp(`^/${lang}`), '');
}
