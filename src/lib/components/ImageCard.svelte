<script lang="ts">
	import type { ImageCardData } from '$lib/data/homepage';

	let { card, tall = false }: { card: ImageCardData; tall?: boolean } = $props();
</script>

<article class:tall class="image-card">
	<img src={card.image} alt={card.title} />
	<div class="overlay">
		<div>
			<div class="eyebrow meta">{card.meta}</div>
			<h3>{card.title}</h3>
			<p>{card.description}</p>
			<div class="eyebrow tag">{card.tag}</div>
		</div>
	</div>
</article>

<style>
	.image-card {
		position: relative;
		min-height: 25rem;
		overflow: clip;
		background: var(--color-surface-highest);
		border: 1px solid rgba(222, 191, 197, 0.1);
	}

	img,
	.overlay {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	img {
		object-fit: cover;
		transition: transform 600ms ease;
	}

	.overlay {
		display: flex;
		align-items: end;
		padding: 2rem;
		background: rgba(27, 28, 25, 0.8);
		color: var(--color-surface);
		transition: background-color 180ms ease;
	}

	.image-card:hover img {
		transform: scale(1.05);
	}

	.image-card:hover .overlay {
		background: rgba(27, 28, 25, 0.7);
	}

	.meta,
	.tag {
		color: var(--color-primary-container);
	}

	h3 {
		margin: 0.4rem 0 0.6rem;
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 900;
		letter-spacing: -0.04em;
	}

	p {
		margin: 0 0 1rem;
		max-width: 28rem;
		line-height: 1.55;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.75);
	}

	.tall {
		min-height: 100%;
	}
</style>
