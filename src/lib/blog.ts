// Blog data helpers — the only place that filters posts by locale and
// builds locale-aware paths. Pages and feeds stay thin.
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { useTranslations, type Language } from '../i18n';

export async function getPosts(locale: Language) {
	return (await getCollection('blog')).filter((post) => post.id.startsWith(`${locale}/`));
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
			...post.data,
			link: `/${locale === 'en' ? '' : `${locale}/`}blog/${post.id.replace(`${locale}/`, '')}/`,
		})),
		customData: `<language>${locale}</language>`,
	});
}
