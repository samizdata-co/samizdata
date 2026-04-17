import type { ServiceCardData } from "$lib/data/site";
import type { LocaleMessages } from "./schema";

export const roMessages: LocaleMessages = {
  navigation: {
    homeLabel: "Pagina principală SAMIZDATA",
    primaryLabel: "Navigație principală",
    mobileMenuOpen: "Deschide meniul",
    mobileMenuClose: "Închide meniul",
    themeToggle: "Schimbă tema",
    switchToDark: "Treci la modul întunecat",
    switchToLight: "Treci la modul luminos",
    about: "Cine suntem",
    work: "Ce facem",
    services: "Servicii",
    training: "Training",
    contact: "Contact",
  },
  localeSwitcher: {
    label: "Limba",
    names: {
      en: "English",
      ro: "Română",
    },
  },
  footer: {
    connect: "Conectare",
    rights: "© 2026 SAMIZDATA Ltd.",
    location: "Londra, Regatul Unit",
  },
  seo: {
    home: {
      title: "Consultanță de storytelling bazat pe date",
      description:
        "SAMIZDATA cercetează, scrie și construiește povești și instrumente bazate pe date pentru organizații media, ONG-uri și instituții de interes public.",
    },
    contact: {
      title: "Contact",
      description:
        "Ia legătura cu SAMIZDATA pentru investigații bazate pe date, unelte interactive, training pentru redacții și proiecte jurnalistice de interes public.",
    },
    services: {
      title: "Servicii",
      description:
        "Descoperă serviciile SAMIZDATA pentru investigații, analiză, vizualizare, unelte interactive, curățare de date și produse de interes public.",
    },
  },
  homeHero: {
    titleLead: "SAMIZDATA este o agenție de",
    titleAccent: "storytelling de date",
    titleTail: ".",
    body: "Cercetăm, scriem și construim instrumente de date pentru organizații media, ONG-uri și alte instituții de interes public.",
    primaryCta: "Hai să vorbim!",
    secondaryCta: "Ce facem",
    scrollCue: "Portofoliu și expertiză",
  },
  homeAbout: {
    introLead:
      "SAMIZDATA este un studio independent de jurnalism de date condus de ",
    introHighlight: "Nicu Calcea",
    introTail:
      ", un jurnalist cu 16 ani de experiență. Iată câteva dintre proiectele la care a lucrat.",
  },
  clients: {
    title: "Clienți și publicații",
  },
  homeWork: {
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
        title: "Exploratoare de date",
        description:
          "Baze de date căutabile și instrumente de consultare de interes public care transformă registre haotice în produse utile.",
        icon: "database",
        cta: "Planifică un produs de date",
      },
      {
        title: "Training",
        description:
          "Ateliere pentru redacții și ONG-uri despre alfabetizare în date, fluxuri de lucru investigative și tehnici etice de vizualizare.",
        icon: "graduation-cap",
        href: "/training",
        variant: "accent",
        label: "Vezi resursele noastre gratuite",
      },
    ] as (Omit<ServiceCardData, "href"> | ServiceCardData)[],
  },
  contactBlock: {
    title: "Ia legătura cu noi",
    body: "Fie că ai un set uriaș de date sau doar germenul unei idei, hai să vorbim.",
    email: "Email direct",
    locationLabel: "Locație",
    location: "Londra, Regatul Unit",
    social: "Social media",
  },
  services: {
    title: "Cum te putem ajuta.",
    intro:
      "Ajutăm redacții și organizații ale societății civile de orice dimensiune să folosească datele cât mai eficient, fie că asta înseamnă să dăm sens unor registre haotice, fie să le prezentăm în cea mai bună formă.",
    browseCta: "Explorează serviciul",
    contactCta: "Contact",
    examplesTitle: "Exemple selectate",
    visitService: "Vezi lucrarea",
    publicationsLabel: "Publicație",
    projectsLabel: "Proiect",
    noExamples: "Adăugăm în curând exemple pentru această pagină de serviciu.",
    allServices: "Toate serviciile",
    trainingTitle: "Training",
    trainingDescription:
      "Ai nevoie de workshopuri, coaching pentru redacție sau sesiuni practice pentru echipe și studenți? Vizitează secțiunea de training.",
    trainingCta: "Mergi la training",
  },
};
