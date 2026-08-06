import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { useTranslations } from '../../i18n';

export async function GET(context) {
	const t = useTranslations('ro');
	const posts = (await getCollection('blog')).filter((post) => post.id.startsWith('ro/'));
	return rss({
		title: t('site.title'),
		description: t('site.description'),
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/ro/blog/${post.id.replace('ro/', '')}/`,
		})),
		customData: '<language>ro</language>',
	});
}
