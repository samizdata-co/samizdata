// @ts-check

import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { defineConfig, fontProviders } from 'astro/config';
import { legacyTrainingRedirects } from './redirects.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://samizdata.co',
	markdown: {
		processor: satteri({
			hastPlugins: [{
				name: 'external-links-new-tab',
				element: {
					filter: ['a'],
					visit(node, context) {
						const href = node.properties.href;
						if (typeof href !== 'string') return;
						let url;
						try {
							url = new URL(href, 'https://samizdata.co');
						} catch {
							return;
						}
						if (!['http:', 'https:'].includes(url.protocol) || url.hostname === 'samizdata.co') return;
						context.setProperty(node, 'target', '_blank');
						const rel = node.properties.rel;
						const relTokens = Array.isArray(rel) ? rel : [];
						context.setProperty(node, 'rel', [...new Set([...relTokens, 'noopener', 'noreferrer'])]);
					},
				},
			}],
		}),
	},
	trailingSlash: 'always',
	build: {
		format: 'directory',
	},
	image: {
		layout: 'constrained',
		responsiveStyles: true,
		breakpoints: [320, 480, 720, 1020],
	},
	redirects: { ...legacyTrainingRedirects, '/studio': '/', '/ro/studio': '/ro/' },
	i18n: {
		locales: ['en', 'ro'],
		defaultLocale: 'en',
	},
	integrations: [
		mdx(),
		pagefind(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', ro: 'ro' },
			},
			serialize(item) {
				const defaultLink = item.links?.find(({ lang }) => lang === 'en');
				if (defaultLink) item.links?.push({ lang: 'x-default', url: defaultLink.url });
				return item;
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
			styles: ['normal'],
			// latin-ext so Romanian diacritics (a-breve, s/t comma-below) render in the web font
			subsets: ['latin', 'latin-ext'],
		},
		{
			provider: fontProviders.google(),
			name: 'Work Sans',
			cssVariable: '--font-work-sans',
			fallbacks: ['ui-sans-serif', 'sans-serif'],
			weights: [400, 500],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
		},
	],
});
