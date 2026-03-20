<script lang="ts">
	let { compact = false }: { compact?: boolean } = $props();
</script>

<div class="logo">
	<div class="mark" aria-hidden="true">
		<svg viewBox="0 0 24 24" fill="currentColor">
			<rect x="2" y="2" width="4" height="4" />
			<rect x="8" y="2" width="4" height="4" />
			<rect x="2" y="8" width="4" height="4" />
			<path d="M14 2h8v8h-8zM2 14h8v8H2zM14 14h8v8h-8zM14 11h8v2h-8zM11 14h2v8h-2z" />
		</svg>
	</div>
	<span class:compact>{compact ? 'SAMIZDATA' : 'SAMIZDATA'}</span>
</div>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
	}

	.mark {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--color-primary-container);
		color: white;
		flex-shrink: 0;
	}

	svg {
		width: 1.45rem;
		height: 1.45rem;
	}

	span {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 900;
		letter-spacing: -0.06em;
		line-height: 1;
		text-transform: uppercase;
	}

	span.compact {
		font-size: 1.25rem;
	}
</style>
