<script lang="ts">
  import { Menu, X } from "@lucide/svelte";
  import {
    defaultLocale,
    localizePath,
    type AppLocale,
  } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";
  import Logo from "$lib/components/ui/Logo.svelte";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  let { pathname }: { pathname: string } = $props();
  let isMobileMenuOpen = $state(false);

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));
  const navItems = $derived([
    { label: copy.navigation.about, href: `${localizePath("/", activeLocale)}#about` },
    { label: copy.navigation.work, href: `${localizePath("/", activeLocale)}#work` },
    {
      label: copy.navigation.contact,
      href: `${localizePath("/", activeLocale)}#contact`,
    },
  ]);
</script>

<nav class="nav">
  <div class="shell nav-inner">
    <a href={localizePath("/", activeLocale)} aria-label={copy.navigation.homeLabel}>
      <Logo />
    </a>

    <div class="links" aria-label={copy.navigation.primaryLabel}>
      {#each navItems as item}
        <a href={item.href}>{item.label}</a>
      {/each}
    </div>

    <div class="actions">
      <ThemeToggle />
      <LanguageSwitcher {pathname} />
      <button
        type="button"
        class="icon-button menu-toggle"
        aria-label={isMobileMenuOpen
          ? copy.navigation.mobileMenuClose
          : copy.navigation.mobileMenuOpen}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-nav"
        onclick={() => {
          isMobileMenuOpen = !isMobileMenuOpen;
        }}
      >
        {#if isMobileMenuOpen}
          <X size={24} strokeWidth={2.25} />
        {:else}
          <Menu size={24} strokeWidth={2.25} />
        {/if}
      </button>
    </div>
  </div>

  {#if isMobileMenuOpen}
    <div
      class="shell mobile-menu"
      id="mobile-nav"
      aria-label={copy.navigation.primaryLabel}
    >
      {#each navItems as item}
        <a
          href={item.href}
          onclick={() => {
            isMobileMenuOpen = false;
          }}
        >
          {item.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>

<style>
  .nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 50;
    background: var(--color-nav-surface);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--color-border-soft);
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
  .actions :global(button),
  .actions :global(summary) {
    color: var(--color-ink-soft);
    transition: color 180ms ease;
  }

  .links a:hover,
  .actions button:hover,
  .actions :global(summary:hover) {
    color: var(--color-primary-container);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-left: auto;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .mobile-menu {
    display: grid;
    gap: 0.4rem;
    padding-top: 0.25rem;
    padding-bottom: 1rem;
    border-top: 1px solid var(--color-border-soft);
  }

  .mobile-menu a {
    padding: 0.9rem 0;
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-ink-soft);
  }

  .mobile-menu a:hover {
    color: var(--color-primary-container);
  }

  @media (min-width: 800px) {
    .links {
      display: flex;
    }

    .actions {
      margin-left: 0;
    }

    .menu-toggle,
    .mobile-menu {
      display: none;
    }
  }
</style>
