<script lang="ts">
  import { MoonStar, SunMedium } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";
  import { defaultLocale, type AppLocale } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";
  import { applyTheme, getPreferredTheme, setTheme, type Theme } from "$lib/theme";

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));

  let theme = $state<Theme>("light");

  const nextTheme = $derived(theme === "dark" ? "light" : "dark");
  const toggleLabel = $derived(
    nextTheme === "dark"
      ? copy.navigation.switchToDark
      : copy.navigation.switchToLight,
  );

  onMount(() => {
    theme = getPreferredTheme();
    applyTheme(theme);
  });

  function toggleTheme() {
    theme = nextTheme;
    setTheme(theme);
  }
</script>

<Button
  type="button"
  variant="ghost"
  size="icon"
  aria-label={toggleLabel}
  title={copy.navigation.themeToggle}
  onclick={toggleTheme}
>
  {#if theme === "dark"}
    <SunMedium size={18} strokeWidth={2.2} />
  {:else}
    <MoonStar size={18} strokeWidth={2.2} />
  {/if}
</Button>
