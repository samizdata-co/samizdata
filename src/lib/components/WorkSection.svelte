<script lang="ts">
	import cvData from '../../data/cv.json';
	import { defaultLocale, localizePath, type AppLocale } from '$lib/i18n/locales';
	import type { ArticleCardData, FeatureCardData, ImageCardData } from '$lib/data/site';
	import { locale as localeStore } from '$lib/translations';
	import ArticleCard from './cards/ArticleCard.svelte';
	import FeatureCard from './cards/FeatureCard.svelte';
	import ImageCard from './cards/ImageCard.svelte';
	import MaterialIcon from './MaterialIcon.svelte';

	type Publication = (typeof cvData.publications)[number];
	type InvestigationPublication = Publication & {
		category: 'investigation';
		publisher: string;
		img?: string;
	};
	type InteractivePublication = Publication & {
		category: 'interactive';
		img?: string;
	};
	type ImageModule = { default: string };

	const articleImages = import.meta.glob('../../data/img/*', {
		eager: true
	}) as Record<string, ImageModule>;

	const investigations = cvData.publications.filter(
		(publication): publication is InvestigationPublication => publication.category === 'investigation'
	);
	const interactiveVisualisations = cvData.publications.filter(
		(publication): publication is InteractivePublication => publication.category === 'interactive'
	);

	const getArticleImage = (imageName?: string) =>
		imageName ? articleImages[`../../data/img/${imageName}`]?.default ?? '' : '';

	const copy = {
		en: {
			featureCards: [
				{
					title: 'Investigations and research',
					description:
						'Original reporting, document-heavy research, and data-led investigations built to stand up to scrutiny and publication.',
					icon: 'dashboard',
					cta: 'Discuss a project'
				},
				{
					title: 'Interactive visualisations',
					description:
						'Calculators, explainers, and maps designed to help readers explore complex stories through direct interaction.',
					icon: 'dashboard',
					cta: 'Plan an interactive'
				},
				{
					title: 'Training',
					description:
						'Workshops for newsrooms and NGOs on data literacy, investigative workflows, and ethical visualisation techniques.',
					icon: 'school',
					variant: 'accent',
					label: 'Enrollment open'
				}
			] as Omit<FeatureCardData, 'href'>[],
			moreLabel: 'See more case studies'
		},
		ro: {
			featureCards: [
				{
					title: 'Investigații și cercetare',
					description:
						'Reportaj original, cercetare bazată pe documente și investigații ghidate de date, pregătite pentru publicare și verificare riguroasă.',
					icon: 'dashboard',
					cta: 'Discutăm despre proiect'
				},
				{
					title: 'Vizualizări interactive',
					description:
						'Calculatoare, explainere și hărți care ajută cititorii să exploreze subiecte complexe prin interacțiune directă.',
					icon: 'dashboard',
					cta: 'Planificăm un interactiv'
				},
				{
					title: 'Training',
					description:
						'Ateliere pentru redacții și ONG-uri despre alfabetizare în date, fluxuri de lucru investigative și tehnici etice de vizualizare.',
					icon: 'school',
					variant: 'accent',
					label: 'Inscrieri deschise'
				}
			] as Omit<FeatureCardData, 'href'>[],
			moreLabel: 'Vezi mai multe studii de caz'
		}
	} as const;

	const activeLocale = $derived(($localeStore as AppLocale | undefined) ?? defaultLocale);
	const strings = $derived(copy[activeLocale]);
	const contactHref = $derived(localizePath('/contact', activeLocale));
	const featureCards = $derived(
		strings.featureCards.map((card) => ({
			...card,
			href: contactHref
		}))
	);
	const investigationCards = $derived(
		investigations.map(
			(publication) =>
				({
					publication: publication.publisher,
					year: new Date(publication.releaseDate).getUTCFullYear().toString(),
					headline: publication.name,
					image: getArticleImage(publication.img),
					href: publication.url
				}) satisfies ArticleCardData
		)
	);
	const interactiveCards = $derived(
		interactiveVisualisations.map(
			(publication) =>
				({
					title: publication.name,
					image: getArticleImage(publication.img),
					href: publication.url
				}) satisfies ImageCardData
		)
	);
</script>

<section class="work" id="work">
	<div class="shell">
		<div class="grid">
			<div class="span-2">
				<FeatureCard card={featureCards[0]} large />
			</div>

			{#each investigationCards as card}
				<ArticleCard {card} />
			{/each}

			<div class="span-2">
				<FeatureCard card={featureCards[1]} large />
			</div>

			{#each interactiveCards as card}
				<ImageCard {card} />
			{/each}

			<FeatureCard card={featureCards[2]} />
		</div>

		<div class="more">
			<a class="more-link" href={contactHref}>
				<span>{strings.moreLabel}</span>
				<MaterialIcon name="add" size="22px" />
			</a>
		</div>
	</div>
</section>

<style>
	.work {
		padding-block: 6rem;
		background: var(--color-surface-low);
	}

	.grid {
		--card-grid-gap: 1.5rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--card-grid-gap);
	}

	.more {
		display: flex;
		justify-content: center;
		padding-top: 3rem;
	}

	.more-link {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem 3rem;
		background: var(--color-surface-high);
		border: 1px solid rgba(138, 112, 118, 0.1);
		font-family: var(--font-display);
		font-size: 0.8rem;
		font-weight: 900;
		letter-spacing: 0.2em;
		color: var(--color-ink);
		text-transform: uppercase;
		transition:
			background-color 180ms ease,
			transform 180ms ease;
	}

	.more-link:hover {
		background: var(--color-surface-highest);
		transform: translateY(-0.1rem);
	}

	@media (min-width: 640px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1200px) {
		.grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}

		.span-2 {
			grid-column: span 2;
		}
	}
</style>
