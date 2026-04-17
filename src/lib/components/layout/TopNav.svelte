<script lang="ts">
  import { Menu, X } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import SheetRoot from "$lib/components/ui/sheet/sheet.svelte";
  import SheetTrigger from "$lib/components/ui/sheet/sheet-trigger.svelte";
  import SheetContent from "$lib/components/ui/sheet/sheet-content.svelte";
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

  let {
    pathname,
    showLanguageSwitcher = true,
    localeOverride,
  }: {
    pathname: string;
    showLanguageSwitcher?: boolean;
    localeOverride?: AppLocale;
  } = $props();
  let isMobileMenuOpen = $state(false);

  const activeLocale = $derived(
    localeOverride ?? (($localeStore as AppLocale | undefined) ?? defaultLocale),
  );
  const copy = $derived(getMessages(activeLocale));
	const navItems = $derived([
    { label: copy.navigation.about, href: `${localizePath("/", activeLocale)}#about` },
    { label: copy.navigation.work, href: `${localizePath("/", activeLocale)}#work` },
    { label: copy.navigation.services, href: localizePath("/services", activeLocale) },
    { label: copy.navigation.training, href: "/training" },
    {
      label: copy.navigation.contact,
      href: `${localizePath("/", activeLocale)}#contact`,
    },
	]);

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }
</script>

<nav class="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border-soft)] bg-[var(--color-nav-surface)] backdrop-blur-[20px]">
  <div class="shell flex items-center gap-6 py-4">
    <a href={localizePath("/", activeLocale)} aria-label={copy.navigation.homeLabel}>
      <Logo />
    </a>

    <div
      class="ml-auto mr-12 hidden gap-12 font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.18em] min-[800px]:flex"
      aria-label={copy.navigation.primaryLabel}
    >
      {#each navItems as item}
        <a
          class="text-[var(--color-ink-soft)] transition-colors duration-180 hover:text-[var(--color-primary-container)]"
          href={item.href}
        >
          {item.label}
        </a>
      {/each}
    </div>

    <div class="ml-auto flex items-center gap-5 min-[800px]:ml-0">
      <ThemeToggle />
      {#if showLanguageSwitcher}
        <LanguageSwitcher {pathname} localeOverride={activeLocale} />
      {/if}

      <SheetRoot bind:open={isMobileMenuOpen}>
        <SheetTrigger>
          {#snippet child({ props })}
            <Button
              {...props}
              type="button"
              variant="ghost"
              size="icon"
              class="inline-flex text-[var(--color-ink-soft)] hover:text-[var(--color-primary-container)] min-[800px]:hidden"
              aria-label={isMobileMenuOpen
                ? copy.navigation.mobileMenuClose
                : copy.navigation.mobileMenuOpen}
            >
              {#if isMobileMenuOpen}
                <X size={24} strokeWidth={2.25} />
              {:else}
                <Menu size={24} strokeWidth={2.25} />
              {/if}
            </Button>
          {/snippet}
        </SheetTrigger>

        <SheetContent
          class="w-[min(100vw,24rem)] border-l border-[var(--color-border-soft)] bg-[var(--color-surface-lowest)] p-0"
          side="right"
        >
          <div
            class="shell grid gap-[0.4rem] pb-4 pt-[4.5rem]"
            id="mobile-nav"
            aria-label={copy.navigation.primaryLabel}
          >
            {#each navItems as item}
              <a
                class="py-[0.9rem] font-[var(--font-display)] text-[0.9rem] font-bold uppercase tracking-[0.14em] text-[var(--color-ink-soft)] transition-colors duration-180 hover:text-[var(--color-primary-container)]"
                href={item.href}
                onclick={closeMobileMenu}
              >
                {item.label}
              </a>
            {/each}
          </div>
        </SheetContent>
      </SheetRoot>
    </div>
  </div>
</nav>
