// Blog data helpers — the only place that filters posts by locale and
// builds locale-aware paths. Pages and feeds stay thin.
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { useTranslations, type Language } from '../i18n';
import { siteConfig } from './site';
import type { LocaleAlternate } from './metadata';

export const postPath = (id: string) => {
	const [locale, ...slug] = id.split('/');
	return `/${locale === 'en' ? '' : `${locale}/`}story/${slug.join('/')}/`;
};

export async function getPosts(locale: Language) {
	return (await getCollection('blog'))
		.filter((post) => post.id.startsWith(`${locale}/`))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function blogAlternates(translationGroup?: string): Promise<LocaleAlternate[]> {
	if (!translationGroup) return [];
	return (await getCollection('blog'))
		.filter((post) => post.data.translationGroup === translationGroup)
		.map((post) => ({
			lang: post.id.split('/')[0] as Language,
			href: new URL(postPath(post.id), siteConfig.url).href,
		}))
		.sort((a, b) => a.lang.localeCompare(b.lang));
}

export async function blogStaticPaths(locale: Language) {
	const posts = await getPosts(locale);
	return posts.map((post) => ({
		params: { slug: post.id.replace(`${locale}/`, '') },
		props: post,
	}));
}

export async function rssFeed(context: { site: string }, locale: Language) {
	const t = useTranslations(locale);
	const posts = await getPosts(locale);
	return rss({
		title: t('site.title'),
		description: t('site.description'),
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: postPath(post.id),
		})),
		customData: `<language>${locale}</language>`,
	});
}
