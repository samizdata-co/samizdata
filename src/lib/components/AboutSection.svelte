<script lang="ts">
  import { defaultLocale, type AppLocale } from "$lib/i18n/locales";
  import { locale as localeStore } from "$lib/translations";
  import Clients from "./Clients.svelte";

  const copy = {
    en: {
      introLead: "SAMIZDATA is an independent data journalism studio led by ",
      introHighlight: "Nicu Calcea",
      introTail:
        ", a journalist with 16 years’ experience. Here are some of the things he has worked on.",
    },
    ro: {
      introLead:
        "SAMIZDATA este un studio independent de jurnalism de date condus de ",
      introHighlight: "Nicu Calcea",
      introTail:
        ", un jurnalist cu 16 ani de experiență. Iată câteva dintre proiectele la care a lucrat.",
    },
  } as const;

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const strings = $derived(copy[activeLocale]);
</script>

<section class="about" id="about">
  <div class="shell">
    <div class="intro-block">
      <p class="intro">
        {strings.introLead}<span>{strings.introHighlight}</span
        >{strings.introTail}
      </p>
    </div>

    <Clients />
  </div>
</section>

<style>
  .about {
    padding: 6rem 0 2rem;
    background: var(--color-surface-low);
    border-bottom: 1px solid var(--color-outline-ghost);
  }

  .intro-block {
    margin: 0 0 0;
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
    margin-top: 0rem;
  }
</style>
