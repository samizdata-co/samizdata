<script lang="ts">
	import {
		featureArticle,
		featureCards,
		reportCard,
		toolCard
	} from '$lib/data/homepage';
	import FeatureCard from './FeatureCard.svelte';
	import ImageCard from './ImageCard.svelte';
	import MaterialIcon from './MaterialIcon.svelte';
	import ReportCard from './ReportCard.svelte';
	import ToolCard from './ToolCard.svelte';
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
			<a class="more-link" href="#contact">
				<span>See more case studies</span>
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
