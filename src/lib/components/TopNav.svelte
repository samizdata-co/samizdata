<script lang="ts">
  import { Menu, X } from "@lucide/svelte";
  import { defaultLocale, localizePath, type AppLocale } from "$lib/i18n/locales";
  import Logo from "./Logo.svelte";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import { locale as localeStore } from "$lib/translations";

  let { pathname }: { pathname: string } = $props();
  let isMobileMenuOpen = $state(false);

  const copy = {
    en: {
      homeLabel: "SAMIZDATA home",
      primaryLabel: "Primary navigation",
      mobileMenuOpen: "Open menu",
      mobileMenuClose: "Close menu",
      themeToggle: "Toggle theme",
      work: "What we do",
      about: "Who we are",
      contact: "Contact",
    },
    ro: {
      homeLabel: "Pagina principala SAMIZDATA",
      primaryLabel: "Navigatie principala",
      mobileMenuOpen: "Deschide meniul",
      mobileMenuClose: "Inchide meniul",
      themeToggle: "Schimba tema",
      work: "Ce facem",
      about: "Cine suntem",
      contact: "Contact",
    },
  } as const;

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const strings = $derived(copy[activeLocale]);
  const navItems = $derived([
    { label: strings.about, href: `${localizePath("/", activeLocale)}#about` },
    { label: strings.work, href: `${localizePath("/", activeLocale)}#work` },
    {
      label: strings.contact,
      href: `${localizePath("/", activeLocale)}#contact`,
    },
  ]);
</script>

<nav class="nav">
  <div class="shell nav-inner">
    <a href={localizePath("/", activeLocale)} aria-label={strings.homeLabel}>
      <Logo />
    </a>

    <div class="links" aria-label={strings.primaryLabel}>
      {#each navItems as item}
        <a href={item.href}>{item.label}</a>
      {/each}
    </div>

    <div class="actions">
      <LanguageSwitcher {pathname} />
      <!--
      <button
        type="button"
        class="theme-toggle"
        aria-label={strings.themeToggle}
      >
        <MoonStar size={22} strokeWidth={2} />
      </button>
      -->
      <button
        type="button"
        class="menu-toggle"
        aria-label={isMobileMenuOpen
          ? strings.mobileMenuClose
          : strings.mobileMenuOpen}
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
      aria-label={strings.primaryLabel}
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
  .actions :global(summary) {
    color: rgba(27, 28, 25, 0.7);
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

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0;
    background: none;
    border: 0;
    cursor: pointer;
  }

  .menu-toggle {
    display: inline-flex;
  }

  /*
  .theme-toggle {
    color: var(--color-primary-container);
    transform: scale(0.95);
  }
  */

  .mobile-menu {
    display: grid;
    gap: 0.4rem;
    padding-top: 0.25rem;
    padding-bottom: 1rem;
    border-top: 1px solid rgba(138, 112, 118, 0.12);
  }

  .mobile-menu a {
    padding: 0.9rem 0;
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(27, 28, 25, 0.82);
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
