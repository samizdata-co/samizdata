<script lang="ts">
	import { page } from '$app/state';
	import { defaultLocale, localeMeta, localizePath, type AppLocale } from '$lib/i18n/locales';
	import { locale as localeStore } from '$lib/translations';
	import Logo from './Logo.svelte';
	import MaterialIcon from './MaterialIcon.svelte';

	let { pathname }: { pathname: string } = $props();

	const copy = {
		en: {
			homeLabel: 'SAMIZDATA home',
			primaryLabel: 'Primary navigation',
			languageLabel: 'Language',
			themeToggle: 'Toggle theme',
			work: 'What we do',
			about: 'Who we are',
			contact: 'Contact',
			languageName: 'English',
			otherLanguageName: 'Romanian'
		},
		ro: {
			homeLabel: 'Pagina principala SAMIZDATA',
			primaryLabel: 'Navigatie principala',
			languageLabel: 'Limba',
			themeToggle: 'Schimba tema',
			work: 'Ce facem',
			about: 'Cine suntem',
			contact: 'Contact',
			languageName: 'Romana',
			otherLanguageName: 'English'
		}
	} as const;

	const activeLocale = $derived(($localeStore as AppLocale | undefined) ?? defaultLocale);
	const strings = $derived(copy[activeLocale]);
	const navItems = $derived([
		{ label: strings.work, href: `${localizePath('/', activeLocale)}#work` },
		{ label: strings.about, href: `${localizePath('/', activeLocale)}#about` },
		{ label: strings.contact, href: localizePath('/contact', activeLocale) }
	]);
	const switcherOptions = $derived([
		{
			code: 'en' as const,
			flag: localeMeta.en.flag,
			label: copy.en.languageName,
			href: `${localizePath(pathname, 'en')}${page.url.hash}`
		},
		{
			code: 'ro' as const,
			flag: localeMeta.ro.flag,
			label: copy.ro.languageName,
			href: `${localizePath(pathname, 'ro')}${page.url.hash}`
		}
	]);
	const currentOption = $derived(
		switcherOptions.find((option) => option.code === activeLocale) ?? switcherOptions[0]
	);
</script>

<nav class="nav">
	<div class="shell nav-inner">
		<a href={localizePath('/', activeLocale)} aria-label={strings.homeLabel}>
			<Logo />
		</a>

		<div class="links" aria-label={strings.primaryLabel}>
			{#each navItems as item}
				<a href={item.href}>{item.label}</a>
			{/each}
		</div>

		<div class="actions">
			<details class="locale-switcher">
				<summary aria-label={strings.languageLabel}>
					<MaterialIcon name="language" size="22px" />
					<span class="flag" aria-hidden="true">{currentOption.flag}</span>
					<span class="summary-label">{currentOption.label}</span>
					<MaterialIcon name="expand_more" size="18px" />
				</summary>
				<div class="locale-menu">
					{#each switcherOptions as option}
						<a
							href={option.href}
							data-sveltekit-preload-data="off"
							data-sveltekit-preload-code="off"
							data-sveltekit-reload
							class:active={option.code === activeLocale}
							aria-current={option.code === activeLocale ? 'page' : undefined}
							lang={option.code}
						>
							<span class="flag" aria-hidden="true">{option.flag}</span>
							<span>{option.label}</span>
						</a>
					{/each}
				</div>
			</details>
			<button type="button" class="theme-toggle" aria-label={strings.themeToggle}>
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
	.actions button,
	.locale-switcher summary {
		color: rgba(27, 28, 25, 0.7);
		transition: color 180ms ease;
	}

	.links a:hover,
	.actions button:hover,
	.locale-switcher summary:hover {
		color: var(--color-primary-container);
	}

	.locale-switcher summary :global(.material-symbols-outlined:first-child) {
		color: var(--color-primary-container);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-left: auto;
	}

	button,
	summary {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0;
		background: none;
		border: 0;
		cursor: pointer;
	}

	.locale-switcher {
		position: relative;
	}

	.locale-switcher summary {
		list-style: none;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--color-ink);
	}

	.locale-switcher summary::-webkit-details-marker {
		display: none;
	}

	.locale-menu {
		position: absolute;
		top: calc(100% + 0.9rem);
		right: 0;
		display: grid;
		gap: 0.35rem;
		min-width: 11rem;
		padding: 0.45rem;
		background: color-mix(in srgb, var(--color-surface) 94%, white);
		border: 1px solid rgba(138, 112, 118, 0.12);
		border-radius: 1rem;
		box-shadow: var(--shadow-ambient);
	}

	.locale-menu a {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.7rem 0.85rem;
		border-radius: 0.75rem;
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.locale-menu a:hover {
		background: rgba(159, 24, 83, 0.08);
	}

	.locale-menu a.active {
		background: var(--color-primary-container);
		color: white;
	}

	.flag {
		font-size: 1rem;
		line-height: 1;
	}

	.summary-label,
	.locale-menu span:last-child {
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.theme-toggle {
		color: var(--color-primary-container);
		transform: scale(0.95);
	}

	@media (max-width: 520px) {
		.summary-label,
		.locale-menu span:last-child {
			display: none;
		}
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
