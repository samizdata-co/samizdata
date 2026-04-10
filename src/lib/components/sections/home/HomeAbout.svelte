<script lang="ts">
  import ClientsGrid from "$lib/components/content/ClientsGrid.svelte";
  import { defaultLocale, type AppLocale } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));
</script>

<section class="about section-block-tight" id="about">
  <div class="shell">
    <div class="intro-block">
      <p class="intro">
        {copy.homeAbout.introLead}<span
          ><a href="https://nicu.md/" target="_blank" rel="noreferrer"
            >{copy.homeAbout.introHighlight}</a
          ></span
        >{copy.homeAbout.introTail}
      </p>
    </div>

    <ClientsGrid />
  </div>
</section>

<style>
  .about {
    background: var(--color-surface-low);
    border-bottom: 1px solid var(--color-outline-ghost);
  }

  .intro-block {
    padding: 0 0 2.5rem;
  }

  .intro {
    max-width: min(66rem, 66vw);
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.8vw, 2.35rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.08;
    text-wrap: balance;
    color: var(--color-muted);
  }

  .intro span {
    color: var(--color-primary-container);
    font-style: italic;
  }

  @media (max-width: 900px) {
    .intro {
      max-width: 100%;
    }
  }

  :global(.about .clients) {
    margin-top: 0;
  }
</style>
