<script lang="ts">
	import type { NavItem } from '$lib/data/homepage';
	import Logo from './Logo.svelte';
	import MaterialIcon from './MaterialIcon.svelte';

	let { items }: { items: NavItem[] } = $props();
</script>

<nav class="nav">
	<div class="shell nav-inner">
		<a href="#top" aria-label="SAMIZDATA home">
			<Logo />
		</a>

		<div class="links" aria-label="Primary navigation">
			{#each items as item}
				<a href={item.href}>{item.label}</a>
			{/each}
		</div>

		<div class="actions">
			<button type="button" class="locale">
				<MaterialIcon name="language" size="22px" />
				<span>UK</span>
			</button>
			<button type="button" class="theme-toggle" aria-label="Toggle theme">
				<MaterialIcon name="dark_mode" size="22px" />
			</button>
		</div>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto;
		z-index: 50;
		background: color-mix(in srgb, var(--color-surface) 80%, transparent);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(222, 191, 197, 0.1);
	}

	.nav-inner {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding-block: 1rem;
	}

	.links {
		display: none;
		margin-left: auto;
		margin-right: 3rem;
		gap: 3rem;
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.links a,
	.actions button {
		color: rgba(27, 28, 25, 0.7);
		transition: color 180ms ease;
	}

	.links a:hover,
	.actions button:hover {
		color: var(--color-primary-container);
	}

	.locale {
		color: var(--color-ink);
	}

	.locale :global(.material-symbols-outlined) {
		color: var(--color-primary-container);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-left: auto;
	}

	button {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0;
		background: none;
		border: 0;
		cursor: pointer;
	}

	.locale span {
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.theme-toggle {
		color: var(--color-primary-container);
		transform: scale(0.95);
	}

	@media (min-width: 800px) {
		.links {
			display: flex;
		}

		.actions {
			margin-left: 0;
		}
	}
</style>
