<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  import { page } from "$app/state";
  import {
    defaultLocale,
    localeMeta,
    localizePath,
    type AppLocale,
  } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";

  let { pathname, localeOverride }: { pathname: string; localeOverride?: AppLocale } = $props();
  let isOpen = $state(false);

  const activeLocale = $derived(
    localeOverride ?? (($localeStore as AppLocale | undefined) ?? defaultLocale),
  );
  const copy = $derived(getMessages(activeLocale));
  const switcherOptions = $derived([
    {
      code: "en" as const,
      flag: localeMeta.en.flag,
      label: copy.localeSwitcher.names.en,
      href: `${localizePath(pathname, "en")}${page.url.hash}`,
    },
    {
      code: "ro" as const,
      flag: localeMeta.ro.flag,
      label: copy.localeSwitcher.names.ro,
      href: `${localizePath(pathname, "ro")}${page.url.hash}`,
    },
  ]);
  const currentOption = $derived(
    switcherOptions.find((option) => option.code === activeLocale) ??
      switcherOptions[0],
  );
  const alternateOptions = $derived(
    switcherOptions.filter((option) => option.code !== activeLocale),
  );
</script>

<details bind:open={isOpen} class="locale-switcher">
  <summary class="icon-button switcher-trigger" aria-label={copy.localeSwitcher.label}>
    <span class="flag" aria-hidden="true">{currentOption.flag}</span>
    <ChevronDown size={18} strokeWidth={2.25} />
  </summary>
  <div class="locale-menu">
    {#each alternateOptions as option}
      <a
        href={option.href}
        data-sveltekit-preload-data="off"
        data-sveltekit-preload-code="off"
        lang={option.code}
        hreflang={option.code}
        aria-label={option.label}
        onclick={() => {
          isOpen = false;
        }}
      >
        <span class="flag" aria-hidden="true">{option.flag}</span>
      </a>
    {/each}
  </div>
</details>

<style>
  .locale-switcher {
    position: relative;
  }

  .locale-switcher summary {
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    cursor: pointer;
  }

  .locale-switcher summary::-webkit-details-marker {
    display: none;
  }

  .locale-menu {
    position: absolute;
    top: calc(100% + 0.9rem);
    right: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.35rem;
    min-width: 3.75rem;
    padding: 0.45rem;
    background: var(--color-surface-lowest);
    border: 1px solid var(--color-border-soft);
    border-radius: 1rem;
    box-shadow: var(--shadow-ambient);
  }

  .locale-menu a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem;
    border-radius: 0.75rem;
  }

  .locale-menu a:hover {
    background: var(--color-primary-glow);
  }

  .switcher-trigger {
    width: auto;
    min-width: 2.75rem;
    padding-inline: 0.75rem;
  }

  .flag {
    font-size: 1.1rem;
    line-height: 1;
  }
</style>
