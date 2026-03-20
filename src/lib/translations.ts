import i18n, { type Config } from 'sveltekit-i18n';
import { defaultLocale, locales, type AppLocale } from '$lib/i18n/locales';

const config: Config = {
	fallbackLocale: defaultLocale,
	loaders: [
		{
			locale: 'en',
			key: 'locale',
			loader: async () => ({})
		},
		{
			locale: 'ro',
			key: 'locale',
			loader: async () => ({})
		}
	]
};

export const { locale, locales: availableLocales, loading, loadTranslations } = new i18n(config);

export const isAppLocale = (value: string): value is AppLocale =>
	locales.includes(value as AppLocale);
