import type { ServiceCardData } from "$lib/data/site";
import type { LocaleMessages } from "./schema";

export const enMessages: LocaleMessages = {
  navigation: {
    homeLabel: "SAMIZDATA home",
    primaryLabel: "Primary navigation",
    mobileMenuOpen: "Open menu",
    mobileMenuClose: "Close menu",
    themeToggle: "Toggle theme",
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    about: "Who we are",
    work: "What we do",
    training: "Training",
    contact: "Contact",
  },
  localeSwitcher: {
    label: "Language",
    names: {
      en: "English",
      ro: "Romana",
    },
  },
  footer: {
    connect: "Connect",
    rights: "© 2026 SAMIZDATA Ltd.",
    location: "London, UK",
  },
  seo: {
    home: {
      title: "Data Storytelling Consultancy",
      description:
        "SAMIZDATA researches, writes, and builds data-led stories and tools for media organisations, NGOs, and public-interest institutions.",
    },
    contact: {
      title: "Contact",
      description:
        "Get in touch with SAMIZDATA about data investigations, interactive tools, newsroom training, and public-interest storytelling projects.",
    },
  },
  homeHero: {
    titleLead: "SAMIZDATA is a",
    titleAccent: "data storytelling",
    titleTail: "consultancy.",
    body: "We research, write and build data tools for media organisations, NGOs and other public-benefit institutions.",
    primaryCta: "Let's talk!",
    secondaryCta: "What we do",
    scrollCue: "Portfolio & Expertise",
  },
  homeAbout: {
    introLead: "SAMIZDATA is an independent data journalism studio led by ",
    introHighlight: "Nicu Calcea",
    introTail:
      ", a journalist with 16 years' experience in media. Here are some of the things he has worked on.",
  },
  clients: {
    title: "Clients and bylines",
  },
  homeWork: {
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
        href: "/training",
        variant: "accent",
        label: "See our free resources",
      },
    ] as (Omit<ServiceCardData, "href"> | ServiceCardData)[],
  },
  contactBlock: {
    title: "Get in touch",
    body: "Whether you have a massive dataset or just the seed of an idea, let's talk about it.",
    email: "Direct email",
    locationLabel: "Location",
    location: "London, UK",
    social: "Social media",
  },
};
