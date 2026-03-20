<script lang="ts">
	import type { ReportCardData } from '$lib/data/site';

	let { card }: { card: ReportCardData } = $props();
</script>

<article class="report-card">
	<div class="thumb">
		<img src={card.image} alt={card.title} />
	</div>

	<div class="content">
		<div class="meta-row">
			<span class="eyebrow muted">{card.meta}</span>
			<span class="tag">{card.tag}</span>
		</div>
		<h3>{card.title}</h3>
		<p>{card.description}</p>
		<a href={card.href}>{card.cta}</a>
	</div>
</article>

<style>
	.report-card {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1.5rem;
		padding: 2.5rem;
		background: var(--color-surface-lowest);
		border: 1px solid rgba(222, 191, 197, 0.1);
	}

	.thumb {
		display: none;
		width: 8rem;
		height: 8rem;
		background: var(--color-surface-container);
		overflow: clip;
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(1);
		opacity: 0.5;
	}

	.meta-row {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.tag {
		padding: 0.3rem 0.55rem;
		background: rgba(159, 24, 83, 0.1);
		color: var(--color-primary-container);
		font-family: var(--font-display);
		font-size: 0.62rem;
		font-weight: 900;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h3 {
		margin: 0 0 0.65rem;
		font-family: var(--font-display);
		font-size: clamp(1.9rem, 3vw, 2.2rem);
		font-weight: 900;
		letter-spacing: -0.04em;
	}

	p {
		margin: 0 0 1rem;
		font-size: 0.875rem;
		line-height: 1.65;
		color: var(--color-muted);
	}

	a {
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-primary-container);
		text-decoration: underline;
		text-decoration-color: rgba(159, 24, 83, 0.3);
		text-underline-offset: 0.3rem;
	}

	@media (min-width: 640px) {
		.report-card {
			grid-template-columns: 8rem minmax(0, 1fr);
			align-items: start;
			gap: 2rem;
		}

		.thumb {
			display: block;
		}
	}
</style>
