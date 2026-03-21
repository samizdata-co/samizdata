<script lang="ts">
	import type { ImageCardData } from '$lib/data/site';
	import CardShell from './CardShell.svelte';

	let { card, tall = false }: { card: ImageCardData; tall?: boolean } = $props();
</script>

<CardShell
	class={`image-card${tall ? ' tall' : ''}`}
	href={card.href}
	target="_blank"
	rel="noreferrer"
	variant="media"
>
	<img src={card.image} alt={card.title} />
</CardShell>

<style>
	:global(.image-card) {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface-highest);
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: transform 600ms ease;
	}

	:global(.card-shell:hover .image-card) img {
		transform: scale(1.05);
	}

	:global(.image-card.tall) {
		aspect-ratio: auto;
		min-height: 100%;
	}
</style>
