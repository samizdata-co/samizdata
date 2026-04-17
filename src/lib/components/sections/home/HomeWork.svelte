<script lang="ts">
  import cvData from "../../../../data/cv.json";
  import {
    defaultLocale,
    localizePath,
    type AppLocale,
  } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";
  import type {
    ArticleCardData,
    ImageCardData,
    ServiceCardData,
  } from "$lib/data/site";
  import ArticleCard from "$lib/components/ui/cards/ArticleCard.svelte";
  import ImageCard from "$lib/components/ui/cards/ImageCard.svelte";
  import ServiceCard from "$lib/components/ui/cards/ServiceCard.svelte";

  type Publication = (typeof cvData.publications)[number];
  type InvestigationPublication = Publication & {
    publisher: string;
    img: string;
  };
  type InteractivePublication = Publication & {
    img: string;
  };
  type Project = (typeof cvData.projects)[number];
  type DataExplorerProject = Project & {
    img: string;
  };
  type Skill = (typeof cvData.skills)[number];
  type ImageModule = { default: string };
  type SkillValue = string | string[] | undefined;

  const articleImages = import.meta.glob("../../../../data/img/*", {
    eager: true,
  }) as Record<string, ImageModule>;

  const hasSkill = (skills: SkillValue, expectedSkill: string) =>
    Array.isArray(skills) ? skills.includes(expectedSkill) : skills === expectedSkill;
  const featuredSkillNames = [
    "Investigations and research",
    "Interactive tools",
    "Data explorers",
  ] as const;
  const skillSummaries = new Map(
    cvData.skills.map((skill: Skill) => [skill.name, skill.summary] as const),
  );

  const investigations = cvData.publications.filter(
    (publication): publication is InvestigationPublication =>
      Boolean(publication.img) && hasSkill(publication.skills, "Investigations and research"),
  );
  const interactiveVisualisations = cvData.publications.filter(
    (publication): publication is InteractivePublication =>
      Boolean(publication.img) && hasSkill(publication.skills, "Interactive tools"),
  );
  const dataExplorers = cvData.projects.filter(
    (project): project is DataExplorerProject =>
      Boolean(project.img) && hasSkill(project.skills, "Data explorers"),
  );

  const getArticleImage = (imageName?: string) =>
    imageName ? (articleImages[`../../../../data/img/${imageName}`]?.default ?? "") : "";

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));
  const contactHref = $derived(`${localizePath("/", activeLocale)}#contact`);
  const serviceCards = $derived(
    copy.homeWork.serviceCards.map(
      (card: Omit<ServiceCardData, "href"> | ServiceCardData, index) => ({
        ...card,
        description:
          skillSummaries.get(featuredSkillNames[index as 0 | 1 | 2]) ?? card.description,
        href: "href" in card ? card.href : contactHref,
      }),
    ) as ServiceCardData[],
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
  const dataExplorerCards = $derived(
    dataExplorers.map(
      (project) =>
        ({
          title: project.name,
          image: getArticleImage(project.img),
          href: project.url,
        }) satisfies ImageCardData,
    ),
  );
</script>

<section class="work section-block-tight" id="work">
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

      <ServiceCard card={serviceCards[3]} />

      <div class="span-2">
        <ServiceCard card={serviceCards[2]} large />
      </div>

      {#each dataExplorerCards as card}
        <ImageCard {card} />
      {/each}
    </div>
  </div>
</section>

<style>
  .work {
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
