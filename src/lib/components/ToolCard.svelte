<script lang="ts">
	import type { ToolCardData } from '$lib/data/homepage';

	let { card }: { card: ToolCardData } = $props();
</script>

<article class="tool-card">
	<img src={card.image} alt={card.title} />
	<div class="shade">
		<div class="content">
			<h3>{card.title}</h3>
			<p>{card.description}</p>
		</div>
	</div>
</article>

<style>
	.tool-card {
		position: relative;
		min-height: 19rem;
		overflow: clip;
		background: var(--color-surface-highest);
		border: 1px solid rgba(222, 191, 197, 0.1);
	}

	img,
	.shade {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	img {
		object-fit: cover;
	}

	.shade {
		display: flex;
		align-items: end;
		padding: 2rem;
		background: linear-gradient(180deg, transparent 0%, rgba(27, 28, 25, 0.2), rgba(27, 28, 25, 0.9));
		opacity: 0;
		transition: opacity 300ms ease;
	}

	.content {
		transform: translateY(0);
		opacity: 1;
		transition:
			transform 240ms ease,
			opacity 240ms ease;
	}

	.tool-card:hover .shade {
		opacity: 1;
	}

	.tool-card:hover .content {
		transform: translateY(0);
		opacity: 1;
	}

	h3 {
		margin: 0 0 0.4rem;
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 2.5rem);
		font-weight: 900;
		letter-spacing: -0.04em;
		color: var(--color-surface);
	}

	p {
		margin: 0;
		max-width: 26rem;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.75);
		line-height: 1.55;
	}
</style>
