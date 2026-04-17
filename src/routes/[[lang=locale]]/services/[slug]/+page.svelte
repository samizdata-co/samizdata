<script lang="ts">
  import { ChevronLeft } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import ContactBlock from "$lib/components/content/ContactBlock.svelte";
  import ServiceExampleCard from "$lib/components/services/ServiceExampleCard.svelte";
  import { defaultLocale, localizePath, type AppLocale } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";

  let { data } = $props();

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));
  const serviceHref = $derived(localizePath("/services", activeLocale));
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <link rel="canonical" href={data.meta.canonical} />
  {#each data.meta.alternates as alternate}
    <link rel="alternate" hreflang={alternate.locale} href={alternate.href} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={data.meta.alternates[0].href} />
</svelte:head>

<main class="service-page">
  <section class="hero section-block-tight">
    <div class="shell hero-grid">
      <div class="hero-copy">
        <a class="back-link eyebrow" href={serviceHref}>
          <ChevronLeft size={16} strokeWidth={2.2} />
          {copy.services.allServices}
        </a>
        <h1 class="section-title">{data.service.name}</h1>
        <p class="skill-keywords">{data.service.keywords.join(" • ")}</p>
        <p class="body-copy intro">{data.service.summary}</p>
        <div class="button-row hero-actions">
          <Button href="#examples">{copy.services.examplesTitle}</Button>
          <Button href="#contact" variant="outline">{copy.services.contactCta}</Button>
        </div>
      </div>
    </div>
  </section>

  <section class="examples section-block-tight" id="examples">
    <div class="shell examples-shell">
      <div class="section-copy">
        <h2>{copy.services.examplesTitle}</h2>
      </div>

      {#if data.service.examples.length > 0}
        <div class="example-grid">
          {#each data.service.examples as example}
            <ServiceExampleCard
              {example}
              labels={{
                publication: copy.services.publicationsLabel,
                project: copy.services.projectsLabel,
                visit: copy.services.visitService,
              }}
            />
          {/each}
        </div>
      {:else}
        <p class="empty-state">{copy.services.noExamples}</p>
      {/if}
    </div>
  </section>

  <ContactBlock />
</main>

<style>
  .service-page {
    background:
      radial-gradient(circle at top left, var(--color-primary-glow), transparent 36%),
      linear-gradient(180deg, var(--color-surface-low), var(--color-surface));
  }

  .hero {
    padding-top: 6rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1.4rem;
    color: var(--color-primary-container);
    text-decoration: none;
  }

  .intro {
    margin: 1.25rem 0 0;
    max-width: 45rem;
  }

  .skill-keywords {
    margin: 1rem 0 0;
    max-width: 46rem;
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.4vw, 1.18rem);
    font-weight: 700;
    line-height: 1.55;
    letter-spacing: -0.02em;
    color: var(--color-primary-container);
  }

  .hero-actions {
    margin-top: 2rem;
  }

  .examples-shell {
    display: grid;
    gap: 1.5rem;
  }

  .section-copy {
    max-width: 42rem;
  }

  .section-copy h2 {
    margin: 0.5rem 0 0.8rem;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.04em;
  }

  .empty-state {
    margin: 0;
    color: var(--color-muted);
    line-height: 1.65;
  }

  .example-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 900px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }

    .example-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .hero-grid {
      gap: 2rem;
    }

    .example-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
