<script lang="ts">
  import ContactBlock from "$lib/components/content/ContactBlock.svelte";
  import ServiceCard from "$lib/components/ui/cards/ServiceCard.svelte";
  import { defaultLocale, localizePath, type AppLocale } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";
  import type { ServiceCardData } from "$lib/data/site";

  let { data } = $props();

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));
  const serviceCards = $derived(
    data.services.map(
      (service) =>
        ({
          title: service.name,
          description: service.summary,
          icon: service.icon,
          href: localizePath(`/services/${service.slug}`, activeLocale),
          cta: copy.services.browseCta,
        }) satisfies ServiceCardData,
    ),
  );
  const trainingCard = $derived({
    title: copy.services.trainingTitle,
    description: copy.services.trainingDescription,
    icon: "graduation-cap",
    href: "/training",
    label: copy.services.trainingCta,
    variant: "accent",
  } satisfies ServiceCardData);
</script>

<main class="services-home">
  <section class="hero section-block-tight">
    <div class="hero-noise" aria-hidden="true"></div>
    <div class="shell hero-grid">
      <div class="hero-copy">
        <h1 class="display-title">{copy.services.title}</h1>
        <p class="body-copy intro">{copy.services.intro}</p>
      </div>
    </div>
  </section>

  <section class="catalogue section-block-tight" id="services-grid">
    <div class="shell">
      <div class="service-grid">
        {#each serviceCards as card}
          <div>
            <ServiceCard {card} />
          </div>
        {/each}

        <div>
          <ServiceCard card={trainingCard} />
        </div>
      </div>
    </div>
  </section>

  <ContactBlock />
</main>

<style>
  .services-home {
    background:
      radial-gradient(circle at top left, var(--color-primary-glow), transparent 34%),
      var(--color-surface);
  }

  .hero {
    position: relative;
    overflow: clip;
    padding-top: 6rem;
  }

  .hero-noise {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(115deg, rgba(255, 255, 255, 0.06), transparent 36%),
      repeating-linear-gradient(
        90deg,
        transparent 0,
        transparent 1.8rem,
        rgba(255, 255, 255, 0.03) 1.8rem,
        rgba(255, 255, 255, 0.03) 1.86rem
      );
    opacity: 0.45;
    pointer-events: none;
  }

  .hero-grid,
  .service-grid {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero-grid {
    align-items: start;
    padding-top: clamp(1.25rem, 4vw, 3rem);
  }

  .hero-copy {
    max-width: 52rem;
  }

  .intro {
    margin-top: 1.25rem;
    max-width: 45rem;
  }

  .catalogue {
    padding-top: 0;
  }

  .service-grid {
    --card-grid-gap: 1.5rem;
  }

  @media (min-width: 720px) {
    .service-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .service-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
</style>
