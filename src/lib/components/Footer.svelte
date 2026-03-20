<script lang="ts">
	import { footerLinks } from '$lib/data/homepage';
	import Logo from './Logo.svelte';
</script>

<footer class="footer">
	<div class="shell footer-grid">
		<div class="brand">
			<Logo compact />
			<p class="eyebrow muted">© 2024 SAMIZDATA.</p>
		</div>

		<div class="connect">
			<p class="eyebrow">Connect</p>
			<a href="mailto:mail@samizdata.co">mail@samizdata.co</a>
			<span>London, UK</span>
		</div>

		<div class="legal">
			{#each footerLinks as link}
				<a href={link.href}>{link.label}</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	.footer {
		padding-block: 4rem;
		background: var(--color-surface-low);
		border-top: 1px solid rgba(222, 191, 197, 0.2);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	.brand,
	.connect,
	.legal {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.connect a,
	.connect span,
	.legal a {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	.connect .eyebrow {
		color: var(--color-ink);
		font-weight: 900;
	}

	.legal {
		gap: 0.9rem;
	}

	.legal a:hover,
	.connect a:hover {
		text-decoration: underline;
		text-decoration-color: var(--color-primary-container);
		text-underline-offset: 0.3rem;
	}

	@media (min-width: 820px) {
		.footer-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			align-items: start;
		}

		.legal {
			align-items: end;
		}

		.legal {
			flex-direction: row;
			justify-content: end;
			gap: 2rem;
		}
	}
</style>
