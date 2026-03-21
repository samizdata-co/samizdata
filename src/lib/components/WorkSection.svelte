<script lang="ts">
  import cvData from "../../data/cv.json";
  import {
    defaultLocale,
    localizePath,
    type AppLocale,
  } from "$lib/i18n/locales";
  import type {
    ArticleCardData,
    ServiceCardData,
    ImageCardData,
  } from "$lib/data/site";
  import { locale as localeStore } from "$lib/translations";
  import ArticleCard from "./cards/ArticleCard.svelte";
  import ImageCard from "./cards/ImageCard.svelte";
  import ServiceCard from "./cards/ServiceCard.svelte";

  type Publication = (typeof cvData.publications)[number];
  type InvestigationPublication = Publication & {
    category: "investigation";
    publisher: string;
    img?: string;
  };
  type InteractivePublication = Publication & {
    category: "interactive";
    img?: string;
  };
  type ImageModule = { default: string };

  const articleImages = import.meta.glob("../../data/img/*", {
    eager: true,
  }) as Record<string, ImageModule>;

  const investigations = cvData.publications.filter(
    (publication): publication is InvestigationPublication =>
      publication.category === "investigation",
  );
  const interactiveVisualisations = cvData.publications.filter(
    (publication): publication is InteractivePublication =>
      publication.category === "interactive",
  );

  const getArticleImage = (imageName?: string) =>
    imageName
      ? (articleImages[`../../data/img/${imageName}`]?.default ?? "")
      : "";

  const copy = {
    en: {
      serviceCards: [
        {
          title: "Investigations and research",
          description:
            "Original reporting, document-heavy research, and data-led investigations built to stand up to scrutiny and publication.",
          icon: "file-search",
          cta: "Commission a story",
        },
        {
          title: "Interactive tools",
          description:
            "Calculators, explainers, and maps designed to help readers explore complex stories through direct interaction.",
          icon: "chart-no-axes-combined",
          cta: "Let's talk about your vision",
        },
        {
          title: "Training",
          description:
            "Workshops for newsrooms and NGOs on data literacy, investigative workflows, and ethical visualisation techniques.",
          icon: "graduation-cap",
          href: "https://training.nicu.md/",
          variant: "accent",
          label: "See our free resources",
        },
      ] as (Omit<ServiceCardData, "href"> | ServiceCardData)[],
    },
    ro: {
      serviceCards: [
        {
          title: "Investigații și cercetare",
          description:
            "Reportaj original, cercetare bazată pe documente și investigații ghidate de date, pregătite pentru publicare și verificare riguroasă.",
          icon: "file-search",
          cta: "Discută despre o anchetă",
        },
        {
          title: "Unelte interactive",
          description:
            "Calculatoare, explainere și hărți care ajută cititorii să exploreze subiecte complexe prin interacțiune directă.",
          icon: "chart-no-axes-combined",
          cta: "Hai să discutăm despre viziunea ta",
        },
        {
          title: "Training",
          description:
            "Ateliere pentru redacții și ONG-uri despre alfabetizare în date, fluxuri de lucru investigative și tehnici etice de vizualizare.",
          icon: "graduation-cap",
          href: "https://training.nicu.md/",
          variant: "accent",
          label: "Vezi resursele noastre gratuite",
        },
      ] as (Omit<ServiceCardData, "href"> | ServiceCardData)[],
    },
  } as const;

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const strings = $derived(copy[activeLocale]);
  const contactHref = $derived(`${localizePath("/", activeLocale)}#contact`);
  const serviceCards = $derived(
    strings.serviceCards.map((card) => ({
      ...card,
      href: "href" in card ? card.href : contactHref,
    })),
  );
  const investigationCards = $derived(
    investigations.map(
      (publication) =>
        ({
          publication: publication.publisher,
          year: new Date(publication.releaseDate).getUTCFullYear().toString(),
          headline: publication.name,
          image: getArticleImage(publication.img),
          href: publication.url,
        }) satisfies ArticleCardData,
    ),
  );
  const interactiveCards = $derived(
    interactiveVisualisations.map(
      (publication) =>
        ({
          title: publication.name,
          image: getArticleImage(publication.img),
          href: publication.url,
        }) satisfies ImageCardData,
    ),
  );
</script>

<section class="work" id="work">
  <div class="shell">
    <div class="grid">
      <div class="span-2">
        <ServiceCard card={serviceCards[0]} large />
      </div>

      {#each investigationCards as card}
        <ArticleCard {card} />
      {/each}

      <div class="span-2">
        <ServiceCard card={serviceCards[1]} large />
      </div>

      {#each interactiveCards as card}
        <ImageCard {card} />
      {/each}

      <ServiceCard card={serviceCards[2]} />
    </div>
  </div>
</section>

<style>
  .work {
    padding: 2rem 0 6rem;
    background: var(--color-surface-low);
  }

  .grid {
    --card-grid-gap: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--card-grid-gap);
  }

  .span-2 {
    grid-column: span 1;
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .span-2 {
      grid-column: span 2;
    }
  }
</style>
