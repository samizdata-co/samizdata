// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://samizdata.co',
	i18n: {
		locales: ['en', 'ro'],
		defaultLocale: 'en',
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', ro: 'ro' },
			},
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Space Grotesk',
			cssVariable: '--font-space-grotesk',
			fallbacks: ['ui-sans-serif', 'sans-serif'],
			weights: [700, 900],
			// latin-ext so Romanian diacritics (a-breve, s/t comma-below) render in the web font
			subsets: ['latin', 'latin-ext'],
		},
		{
			provider: fontProviders.google(),
			name: 'Work Sans',
			cssVariable: '--font-work-sans',
			fallbacks: ['ui-sans-serif', 'sans-serif'],
			weights: [400, 500],
			subsets: ['latin', 'latin-ext'],
		},
	],
});
