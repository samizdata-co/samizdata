import type { ServiceCardData } from "$lib/data/site";

export type LocaleMessages = {
  navigation: {
    homeLabel: string;
    primaryLabel: string;
    mobileMenuOpen: string;
    mobileMenuClose: string;
    themeToggle: string;
    switchToDark: string;
    switchToLight: string;
    about: string;
    work: string;
    contact: string;
  };
  localeSwitcher: {
    label: string;
    names: {
      en: string;
      ro: string;
    };
  };
  footer: {
    connect: string;
    rights: string;
    location: string;
  };
  seo: {
    home: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
    };
  };
  homeHero: {
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    scrollCue: string;
  };
  homeAbout: {
    introLead: string;
    introHighlight: string;
    introTail: string;
  };
  clients: {
    title: string;
  };
  homeWork: {
    serviceCards: (Omit<ServiceCardData, "href"> | ServiceCardData)[];
  };
  contactBlock: {
    title: string;
    body: string;
    email: string;
    locationLabel: string;
    location: string;
    social: string;
  };
};
