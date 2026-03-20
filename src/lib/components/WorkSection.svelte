<script lang="ts">
	import { defaultLocale, localizePath, type AppLocale } from '$lib/i18n/locales';
	import type { FeatureCardData, ImageCardData, ReportCardData, ToolCardData } from '$lib/data/site';
	import { locale as localeStore } from '$lib/translations';
	import FeatureCard from './FeatureCard.svelte';
	import ImageCard from './ImageCard.svelte';
	import MaterialIcon from './MaterialIcon.svelte';
	import ReportCard from './ReportCard.svelte';
	import ToolCard from './ToolCard.svelte';

	const articleImage =
		'https://lh3.googleusercontent.com/aida-public/AB6AXuA88f_MTMAVUCI8SANUw-kGWuMgLttTQnabBRe8-aABG68oWemcrS3rTYpINwVCcqdrb5qXsuhGNIASGbV6Kdapk5UQS4dGrNFu3H-Om-pQSfjlnOzH690-kyfohQt76flViGn3DN-jGDPDS-jk-zQDT4lsNvDvseXum0Qj53SqxzVg5b6G1gb0-c_l7tRiQvt4f-7wtDsS0HGLfzik3aFGyeVj0jbnWIHtb88zMf1-gipyewqdBMDLDYYvIeck4oR3cS1DSmTakmU';
	const toolImage =
		'https://lh3.googleusercontent.com/aida-public/AB6AXuAqbYLToqJjTzbgBTgDQxXhJaMMquQsTkPQLlkYslPnxUdTYhG1iG4XMWxm06dv_jZqZ0L7LGen_8tF_C77mCYXx3rASkpZD_ob56QhR0PgqJxi8xM_e3uM4jcw5eNw-sRNBqJ76kJBzQesNsaqT6ZAUPw2wcOahKVMez97vQaLEO-xQnWoLBtRD8HMMbEXP7F4yqvovkd1tuYc2CRWR932uh3z4snUsSpdHUNatRRGUaUX2qmCOYp1htcrBjeRjsB0pDalM24dSqU';
	const reportImage =
		'https://lh3.googleusercontent.com/aida-public/AB6AXuAaPffUikoJVxHfyAE4acInUhsnDVopfwH1ZgHlv_2vQjHN_xBRJTJg8ztPSefx04slmZ8DmAsh8Iu9yTtBjH8nJIVSP33KYvSCOZ4xcMT0fLyen5gXOFHHFUNBAQx8zUbjpfCpGKhICwqso733tppOaR-uKQuM49vH12rdf-0kNs5YR8YGuiwpFKQV_PH8LZ6GsIlrGH3ndvIdqx8jgwZvDbw9GREJcIPlx3M4Rv9eWahnjPR6y2v750-CoHiI-3dNEqPugzUepvc';

	const copy = {
		en: {
			featureCards: [
				{
					title: 'Dashboards',
					description:
						'Custom analytical interfaces designed for clarity and rapid insight. We turn complex queries into visual narratives that hold up under scrutiny.',
					icon: 'dashboard',
					cta: 'View capability'
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
			featureArticle: {
				title: 'The Cost of Inaction: Climate Data Disparities',
				description:
					'A deep dive into how shifting weather patterns affect urban infrastructure in the Global South.',
				meta: 'The Guardian // 2024',
				tag: 'Journalism',
				image: articleImage
			} satisfies ImageCardData,
			toolCard: {
				title: 'Archive Engine v2',
				description: 'Open-source document processing tool for investigative reporters.',
				image: toolImage
			} satisfies ToolCardData,
			reportCard: {
				title: 'Algorithmic Accountability in Public Housing',
				description:
					'Commissioned by the UN to audit automated allocation systems across European capitals.',
				meta: 'Report // Feb 12',
				tag: 'Policy',
				cta: 'Read full report',
				image: reportImage
			} satisfies Omit<ReportCardData, 'href'>,
			moreLabel: 'See more case studies'
		},
		ro: {
			featureCards: [
				{
					title: 'Tablouri de bord',
					description:
						'Interfete analitice personalizate, concepute pentru claritate si perspectiva rapida. Transformam interogari complexe in naratiuni vizuale care rezista verificarii.',
					icon: 'dashboard',
					cta: 'Vezi capabilitatea'
				},
				{
					title: 'Training',
					description:
						'Ateliere pentru redactii si ONG-uri despre alfabetizare in date, fluxuri de lucru investigative si tehnici etice de vizualizare.',
					icon: 'school',
					variant: 'accent',
					label: 'Inscrieri deschise'
				}
			] as Omit<FeatureCardData, 'href'>[],
			featureArticle: {
				title: 'Costul inactiunii: disparitati in datele climatice',
				description:
					'O analiza ampla a modului in care schimbarile climatice afecteaza infrastructura urbana din Sudul Global.',
				meta: 'The Guardian // 2024',
				tag: 'Jurnalism',
				image: articleImage
			} satisfies ImageCardData,
			toolCard: {
				title: 'Archive Engine v2',
				description:
					'Instrument open-source de procesare a documentelor pentru jurnalisti de investigatie.',
				image: toolImage
			} satisfies ToolCardData,
			reportCard: {
				title: 'Responsabilitate algoritmica in locuintele publice',
				description:
					'Raport comandat de ONU pentru auditarea sistemelor automate de alocare din capitale europene.',
				meta: 'Raport // 12 feb',
				tag: 'Politici publice',
				cta: 'Citeste raportul complet',
				image: reportImage
			} satisfies Omit<ReportCardData, 'href'>,
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
	const featureArticle = $derived(strings.featureArticle);
	const toolCard = $derived(strings.toolCard);
	const reportCard = $derived({
		...strings.reportCard,
		href: contactHref
	});
</script>

<section class="work" id="work">
	<div class="shell">
		<div class="grid">
			<div class="span-2">
				<FeatureCard card={featureCards[0]} large />
			</div>
			<ImageCard card={featureArticle} tall />
			<FeatureCard card={featureCards[1]} />
			<div class="span-2">
				<ToolCard card={toolCard} />
			</div>
			<div class="span-2">
				<ReportCard card={reportCard} />
			</div>
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
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
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

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.span-2 {
			grid-column: span 2;
		}
	}

	@media (min-width: 1080px) {
		.grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
