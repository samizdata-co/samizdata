<script lang="ts">
  import cvData from "../../data/cv.json";
  import {
    defaultLocale,
    localizePath,
    type AppLocale,
  } from "$lib/i18n/locales";
  import type {
    ArticleCardData,
    FeatureCardData,
    ImageCardData,
  } from "$lib/data/site";
  import { locale as localeStore } from "$lib/translations";
  import ArticleCard from "./cards/ArticleCard.svelte";
  import FeatureCard from "./cards/FeatureCard.svelte";
  import ImageCard from "./cards/ImageCard.svelte";
  import MaterialIcon from "./MaterialIcon.svelte";
  import Clients from "./Clients.svelte";

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
      introLead: "SAMIZDATA is an independent data journalism studio led by ",
      introHighlight: "Nicu Calcea",
      introTail:
        ", a journalist with 16 years’ experience. Here are some of the things he has worked on.",
      featureCards: [
        {
          title: "Investigations and research",
          description:
            "Original reporting, document-heavy research, and data-led investigations built to stand up to scrutiny and publication.",
          icon: "dashboard",
          cta: "Commission a story",
        },
        {
          title: "Interactive tools",
          description:
            "Calculators, explainers, and maps designed to help readers explore complex stories through direct interaction.",
          icon: "dashboard",
          cta: "Let's talk about your vision",
        },
        {
          title: "Training",
          description:
            "Workshops for newsrooms and NGOs on data literacy, investigative workflows, and ethical visualisation techniques.",
          icon: "school",
          variant: "accent",
          label: "See our free resources",
        },
      ] as Omit<FeatureCardData, "href">[],
      moreLabel: "See more work",
    },
    ro: {
      introLead:
        "SAMIZDATA este un studio independent de jurnalism de date condus de ",
      introHighlight: "Nicu Calcea",
      introTail:
        ", un jurnalist cu 16 ani de experiență. Iată câteva dintre proiectele la care a lucrat.",
      featureCards: [
        {
          title: "Investigații și cercetare",
          description:
            "Reportaj original, cercetare bazată pe documente și investigații ghidate de date, pregătite pentru publicare și verificare riguroasă.",
          icon: "dashboard",
          cta: "Discută despre o anchetă",
        },
        {
          title: "Unelte interactive",
          description:
            "Calculatoare, explainere și hărți care ajută cititorii să exploreze subiecte complexe prin interacțiune directă.",
          icon: "dashboard",
          cta: "Hai să discutăm despre viziunea ta",
        },
        {
          title: "Training",
          description:
            "Ateliere pentru redacții și ONG-uri despre alfabetizare în date, fluxuri de lucru investigative și tehnici etice de vizualizare.",
          icon: "school",
          variant: "accent",
          label: "Vezi resursele noastre gratuite",
        },
      ] as Omit<FeatureCardData, "href">[],
      moreLabel: "Vezi mai multe proiecte",
    },
  } as const;

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const strings = $derived(copy[activeLocale]);
  const contactHref = $derived(localizePath("/contact", activeLocale));
  const featureCards = $derived(
    strings.featureCards.map((card) => ({
      ...card,
      href: contactHref,
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
    <div class="intro-block">
      <p class="intro">
        {strings.introLead}<span>{strings.introHighlight}</span
        >{strings.introTail}
      </p>
    </div>

    <div class="grid">
      <div class="span-2">
        <FeatureCard card={featureCards[0]} large />
      </div>

      {#each investigationCards as card}
        <ArticleCard {card} />
      {/each}

      <div class="span-2">
        <FeatureCard card={featureCards[1]} large />
      </div>

      {#each interactiveCards as card}
        <ImageCard {card} />
      {/each}

      <FeatureCard card={featureCards[2]} />
    </div>

    <div class="more">
      <a class="more-link" href={contactHref}>
        <span>{strings.moreLabel}</span>
        <MaterialIcon name="add" size="22px" />
      </a>
    </div>

    <Clients />
  </div>
</section>

<style>
  .work {
    padding-block: 6rem;
    background: var(--color-surface-low);
  }

  .intro-block {
    margin: 0 0 3rem;
    padding: 0 0 2.5rem;
    border-bottom: 1px solid var(--color-outline-ghost);
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

  @media (max-width: 900px) {
    .intro {
      max-width: 100%;
    }
  }

  .intro span {
    color: var(--color-primary-container);
    font-style: italic;
  }

  .grid {
    --card-grid-gap: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--card-grid-gap);
  }

  .more {
    display: flex;
    justify-content: center;
    padding-top: 3rem;
  }

  .more-link {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 3rem;
    background: var(--color-surface-high);
    border: 1px solid rgba(138, 112, 118, 0.1);
    font-family: var(--font-display);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.2em;
    color: var(--color-ink);
    text-transform: uppercase;
    transition:
      background-color 180ms ease,
      transform 180ms ease;
  }

  .more-link:hover {
    background: var(--color-surface-highest);
    transform: translateY(-0.1rem);
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
