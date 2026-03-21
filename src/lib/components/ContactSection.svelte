<script lang="ts">
	import { defaultLocale, type AppLocale } from '$lib/i18n/locales';
	import { locale as localeStore } from '$lib/translations';
	import MaterialIcon from './MaterialIcon.svelte';

	let { standalone = false }: { standalone?: boolean } = $props();

	const copy = {
		en: {
			title: 'Get in touch',
			body:
				"Whether you have a massive dataset or just the seed of an idea, let's build something rigorous together.",
			email: 'Direct Email',
			locationLabel: 'Location',
			location: 'London, UK',
			social: 'Social'
		},
		ro: {
			title: 'Ia legătura cu noi',
			body:
				'Fie că ai un set uriaș de date sau doar germenul unei idei, hai să construim împreună ceva riguros.',
			email: 'Email direct',
			locationLabel: 'Locație',
			location: 'Londra, Regatul Unit',
			social: 'Social'
		}
	} as const;

	const activeLocale = $derived(($localeStore as AppLocale | undefined) ?? defaultLocale);
	const strings = $derived(copy[activeLocale]);
</script>

<section class:standalone class="contact" id="contact">
	<div class="shell contact-grid">
		<div id="about">
			<h2 class="section-title">{strings.title}</h2>
			<p>{strings.body}</p>
		</div>

		<div class="stack">
			<a class="email-card" href="mailto:mail@samizdata.co">
				<div>
					<span class="eyebrow">{strings.email}</span>
					<strong>mail@samizdata.co</strong>
				</div>
				<MaterialIcon name="north_east" size="36px" />
			</a>

			<div class="meta-grid">
				<div class="meta-card">
					<span class="eyebrow muted">{strings.locationLabel}</span>
					<p>{strings.location}</p>
				</div>
				<div class="meta-card">
					<span class="eyebrow muted">{strings.social}</span>
					<p><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.contact {
		padding-block: 8rem;
		background: var(--color-surface);
	}

	.contact.standalone {
		padding-top: 12rem;
		min-height: calc(100vh - 6rem);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: start;
	}

	h2 {
		margin: 0 0 2rem;
	}

	p {
		max-width: 32rem;
		margin: 0;
		font-size: 1.25rem;
		line-height: 1.6;
		color: var(--color-muted);
	}

	.stack {
		display: grid;
		gap: 1.25rem;
	}

	.email-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		padding: 2.5rem;
		background: var(--color-surface-low);
		border: 1px solid rgba(222, 191, 197, 0.1);
		transition:
			background-color 220ms ease,
			color 220ms ease,
			transform 220ms ease;
	}

	.email-card:hover {
		background: var(--color-primary-container);
		color: white;
		transform: translateY(-0.15rem);
	}

	.email-card .eyebrow {
		display: block;
		margin-bottom: 0.6rem;
		color: var(--color-primary-container);
	}

	.email-card:hover .eyebrow {
		color: rgba(255, 255, 255, 0.76);
	}

	.email-card strong {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 900;
		letter-spacing: -0.06em;
	}

	.meta-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.meta-card {
		padding: 2rem;
		background: var(--color-surface-high);
		border: 1px solid rgba(222, 191, 197, 0.1);
	}

	.meta-card p {
		margin-top: 0.9rem;
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 900;
		letter-spacing: -0.04em;
		color: var(--color-ink);
	}

	.meta-card a {
		text-decoration: underline;
		text-decoration-color: var(--color-primary-container);
		text-underline-offset: 0.5rem;
	}

	@media (min-width: 900px) {
		.contact-grid {
			grid-template-columns: minmax(0, 1fr) minmax(24rem, 36rem);
			gap: 4rem;
		}
	}
</style>
