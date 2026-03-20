<script lang="ts">
	import type { FeatureCardData } from '$lib/data/site';
	import MaterialIcon from './MaterialIcon.svelte';

	let { card, large = false }: { card: FeatureCardData; large?: boolean } = $props();
</script>

<article class:accent={card.variant === 'accent'} class:large class="card">
	<div>
		<MaterialIcon
			name={card.icon === 'dashboard' ? 'dashboard_customize' : 'school'}
			size="36px"
			class="icon"
		/>
		<h3>{card.title}</h3>
		<p>{card.description}</p>
	</div>

	{#if card.cta}
		<a href={card.href} class="cta">
			<span>{card.cta}</span>
			<MaterialIcon name="arrow_forward" size="18px" />
		</a>
	{:else if card.label}
		<div class="eyebrow footer-label">{card.label}</div>
	{/if}
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
		min-height: 100%;
		padding: 2rem;
		background: var(--color-surface-lowest);
		border: 1px solid rgba(222, 191, 197, 0.1);
		transition:
			transform 220ms ease,
			box-shadow 220ms ease,
			background-color 220ms ease;
	}

	.card:hover {
		transform: translateY(-0.2rem);
		box-shadow: var(--shadow-ambient);
	}

	.card.accent {
		background: var(--color-primary-container);
		color: white;
		box-shadow: 0 1rem 2rem rgba(159, 24, 83, 0.1);
	}

	.card :global(.icon),
	.card :global(.material-symbols-outlined) {
		color: var(--color-primary-container);
	}

	.card.accent :global(.material-symbols-outlined) {
		color: white;
	}

	h3 {
		margin: 1.5rem 0 1rem;
		font-family: var(--font-display);
		font-size: clamp(1.9rem, 3.5vw, 2.5rem);
		font-weight: 900;
		letter-spacing: -0.04em;
	}

	p {
		margin: 0;
		font-size: 1.125rem;
		line-height: 1.7;
		color: var(--color-muted);
	}

	.card.accent p {
		color: rgba(255, 255, 255, 0.82);
		font-size: 0.92rem;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-primary-container);
	}

	.footer-label {
		color: inherit;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.large {
		padding: 2.5rem;
	}
</style>
