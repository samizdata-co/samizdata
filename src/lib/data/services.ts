import type { AppLocale } from "$lib/i18n/locales";
import type { ServiceCardData } from "$lib/data/site";
import cvData from "../../data/cv.json";

type Skill = (typeof cvData.skills)[number];
type Publication = (typeof cvData.publications)[number];
type Project = (typeof cvData.projects)[number];
type SkillValue = string | string[] | undefined;
type ImageModule = { default: string };

export type ServiceExample = {
  kind: "publication" | "project";
  title: string;
  summary: string;
  href: string;
  source?: string;
  year?: string;
  image: string;
};

export type LocalizedService = {
  slug: string;
  sourceName: Skill["name"];
  name: string;
  summary: string;
  keywords: string[];
  level: Skill["level"];
  icon: ServiceCardData["icon"];
  examples: ServiceExample[];
};

const serviceOrder = [
  "Investigations and research",
  "Data analysis",
  "Data wrangling and cleaning",
  "Visualisation",
  "Interactive tools",
  "Data explorers",
] as const;

const serviceIcons: Record<(typeof serviceOrder)[number], ServiceCardData["icon"]> = {
  "Investigations and research": "file-search",
  "Data analysis": "chart-no-axes-combined",
  "Data wrangling and cleaning": "database",
  Visualisation: "chart-no-axes-combined",
  "Interactive tools": "chart-no-axes-combined",
  "Data explorers": "database",
};

const serviceTranslations = {
  ro: {
    "Investigations and research": {
      name: "Investigatii si cercetare",
      summary:
        "Nicu este un jurnalist cu experienta in investigatii aprofundate despre clima, politica si Big Tech. Apeleaza la noi daca ai nevoie de cercetare si investigatii bazate pe date, pregatite pentru publicare.",
      keywords: [
        "Jurnalism de date",
        "Jurnalism de investigatie",
        "Cercetare",
        "Solicitari FOI",
      ],
    },
    "Data analysis": {
      name: "Analiza de date",
      summary:
        "SAMIZDATA transforma datele tale in concluzii utile, clare si usor de publicat. Scriem cod in R, Python si JavaScript si folosim instrumente specializate precum DuckDB si QGIS pentru a aborda chiar si cele mai dificile seturi de date.",
      keywords: ["R", "Python", "JavaScript", "SQL"],
    },
    "Data wrangling and cleaning": {
      name: "Curatare si pregatire de date",
      summary:
        "Folosim tehnici avansate de AI si machine learning pentru a extrage, lega si formata date dezordonate sau nestructurate in seturi curate si fiabile.",
      keywords: [
        "Deduplicare",
        "Legare de inregistrari",
        "Recunoasterea entitatilor numite",
      ],
    },
    Visualisation: {
      name: "Vizualizare",
      summary:
        "Grafice, dashboarduri si povesti vizuale pe scroll. Daca iti poti imagina ceva, noi il putem construi.",
      keywords: ["ggplot2", "D3.js", "Datawrapper", "Flourish"],
    },
    "Interactive tools": {
      name: "Unelte interactive",
      summary:
        "Calculatoare, instrumente de cautare, harti si explainere concepute pentru a ajuta publicul sa inteleaga subiecte complexe prin interactiune directa.",
      keywords: ["Svelte", "SvelteKit"],
    },
    "Data explorers": {
      name: "Exploratoare de date",
      summary:
        "Baze de date cautabile si instrumente publice de explorare care transforma registrele dezordonate in ceva ce oamenii pot folosi cu adevarat.",
      keywords: ["Svelte", "SvelteKit", "PostgreSQL"],
    },
  },
} as const;

const serviceImages = import.meta.glob("../../data/img/*", {
  eager: true,
}) as Record<string, ImageModule>;

const skillLookup = new Map(
  cvData.skills.map((skill: Skill) => [skill.name, skill] as const),
);

const hasSkill = (skills: SkillValue, expectedSkill: string) =>
  Array.isArray(skills) ? skills.includes(expectedSkill) : skills === expectedSkill;

const slugifyService = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getImage = (imageName?: string) =>
  imageName ? (serviceImages[`../../data/img/${imageName}`]?.default ?? "") : "";

const compareExamples = (left: ServiceExample, right: ServiceExample) => {
  const leftValue = left.year ? Number.parseInt(left.year, 10) : 0;
  const rightValue = right.year ? Number.parseInt(right.year, 10) : 0;

  return rightValue - leftValue;
};

const getExamplesForSkill = (skillName: string): ServiceExample[] => {
  const publicationExamples = cvData.publications
    .filter((publication: Publication) => hasSkill(publication.skills, skillName))
    .map((publication: Publication): ServiceExample => ({
      kind: "publication" as const,
      title: publication.name,
      summary: publication.summary ?? "",
      href: publication.url,
      source: publication.publisher,
      year: publication.releaseDate
        ? new Date(publication.releaseDate).getUTCFullYear().toString()
        : undefined,
      image: getImage(publication.img),
    }));

  const projectExamples = cvData.projects
    .filter((project: Project) => hasSkill(project.skills, skillName))
    .map((project: Project): ServiceExample => ({
      kind: "project" as const,
      title: project.name,
      summary: project.description,
      href: project.url,
      year: project.startDate ? new Date(project.startDate).getUTCFullYear().toString() : undefined,
      image: getImage(project.img),
    }));

  return [...publicationExamples, ...projectExamples].sort(compareExamples);
};

const localizeSkill = (skill: Skill, locale: AppLocale) => {
  if (locale === "ro") {
    return serviceTranslations.ro[skill.name as keyof typeof serviceTranslations.ro];
  }

  return {
    name: skill.name,
    summary: skill.summary,
    keywords: skill.keywords,
  };
};

const buildService = (skillName: (typeof serviceOrder)[number], locale: AppLocale): LocalizedService => {
  const skill = skillLookup.get(skillName);

  if (!skill) {
    throw new Error(`Unknown service skill: ${skillName}`);
  }

  const localized = localizeSkill(skill, locale);

  return {
    slug: slugifyService(skill.name),
    sourceName: skill.name,
    name: localized.name,
    summary: localized.summary,
    keywords: [...localized.keywords],
    level: skill.level,
    icon: serviceIcons[skillName],
    examples: getExamplesForSkill(skill.name),
  };
};

export const getServiceSlugs = () => serviceOrder.map((serviceName) => slugifyService(serviceName));

export const getServices = (locale: AppLocale) =>
  serviceOrder.map((serviceName) => buildService(serviceName, locale));

export const getServiceBySlug = (slug: string, locale: AppLocale) =>
  getServices(locale).find((service) => service.slug === slug);
