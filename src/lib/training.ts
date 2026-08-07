import { getCollection, type CollectionEntry } from 'astro:content';

export type TrainingPage = CollectionEntry<'training'> & { href: string };

export type TrainingNavSection = {
	title: string;
	items: { title: string; href: string }[];
};

export async function getTrainingPages(): Promise<TrainingPage[]> {
	return (await getCollection('training'))
		.map((page) => ({ ...page, href: `/training/${page.id}/` }))
		.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export function getTrainingNav(pages: TrainingPage[]): TrainingNavSection[] {
	const sections = new Map<string, { title: string; href: string }[]>();

	for (const page of pages) {
		const items = sections.get(page.data.section) ?? [];
		items.push({ title: page.data.title, href: page.href });
		sections.set(page.data.section, items);
	}

	return Array.from(sections, ([title, items]) => ({ title, items }));
}
