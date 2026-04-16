<script lang="ts">
  import { goto } from "$app/navigation";
  import { ChevronDown } from "@lucide/svelte";
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button";
  import DropdownMenuRoot from "$lib/components/ui/dropdown-menu/dropdown-menu.svelte";
  import DropdownMenuTrigger from "$lib/components/ui/dropdown-menu/dropdown-menu-trigger.svelte";
  import DropdownMenuContent from "$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte";
  import DropdownMenuItem from "$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte";
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

  function selectLanguage(href: string) {
    isOpen = false;
    void goto(href);
  }
</script>

<DropdownMenuRoot bind:open={isOpen}>
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        size="icon"
        class="min-w-11 w-auto gap-[0.55rem] px-3 text-[var(--color-ink-soft)] hover:text-[var(--color-primary-container)]"
        aria-label={copy.localeSwitcher.label}
      >
        <span class="text-[1.1rem] leading-none" aria-hidden="true">{currentOption.flag}</span>
        <ChevronDown class="size-4" size={18} strokeWidth={2.25} />
      </Button>
    {/snippet}
  </DropdownMenuTrigger>

  <DropdownMenuContent
    class="w-auto min-w-15 grid-cols-1 gap-[0.35rem] rounded-2xl p-[0.45rem]"
    align="end"
    sideOffset={14}
  >
    {#each alternateOptions as option}
      <DropdownMenuItem
        class="flex items-center justify-center rounded-xl p-[0.7rem]"
        aria-label={option.label}
        textValue={option.label}
        onSelect={() => {
          selectLanguage(option.href);
        }}
      >
        <span class="text-[1.1rem] leading-none" aria-hidden="true">{option.flag}</span>
        <span class="sr-only">{option.label}</span>
      </DropdownMenuItem>
    {/each}
  </DropdownMenuContent>
</DropdownMenuRoot>
