import type { ServiceCardData } from "$lib/data/site";
import type { LocaleMessages } from "./schema";

export const roMessages: LocaleMessages = {
  navigation: {
    homeLabel: "Pagina principala SAMIZDATA",
    primaryLabel: "Navigatie principala",
    mobileMenuOpen: "Deschide meniul",
    mobileMenuClose: "Inchide meniul",
    themeToggle: "Schimba tema",
    switchToDark: "Treci la modul intunecat",
    switchToLight: "Treci la modul luminos",
    about: "Cine suntem",
    work: "Ce facem",
    contact: "Contact",
  },
  localeSwitcher: {
    label: "Limba",
    names: {
      en: "English",
      ro: "Romana",
    },
  },
  footer: {
    connect: "Conectare",
    rights: "© 2026 SAMIZDATA Ltd.",
    location: "Londra, Regatul Unit",
  },
  seo: {
    home: {
      title: "Consultanta de storytelling bazat pe date",
      description:
        "SAMIZDATA cerceteaza, scrie si construieste povesti si instrumente bazate pe date pentru organizatii media, ONG-uri si institutii de interes public.",
    },
    contact: {
      title: "Contact",
      description:
        "Ia legatura cu SAMIZDATA pentru investigatii bazate pe date, unelte interactive, training pentru redactii si proiecte jurnalistice de interes public.",
    },
  },
  homeHero: {
    titleLead: "SAMIZDATA este o agenție de",
    titleAccent: "storytelling de date",
    titleTail: ".",
    body: "Cercetam, scriem si construim instrumente de date pentru organizatii media, ONG-uri si alte institutii de interes public.",
    primaryCta: "Hai sa vorbim!",
    secondaryCta: "Ce facem",
    scrollCue: "Portofoliu si expertiza",
  },
  homeAbout: {
    introLead:
      "SAMIZDATA este un studio independent de jurnalism de date condus de ",
    introHighlight: "Nicu Calcea",
    introTail:
      ", un jurnalist cu 16 ani de experienta. Iata cateva dintre proiectele la care a lucrat.",
  },
  clients: {
    title: "Clienti si publicatii",
  },
  homeWork: {
    serviceCards: [
      {
        title: "Investigatii si cercetare",
        description:
          "Reportaj original, cercetare bazata pe documente si investigatii ghidate de date, pregatite pentru publicare si verificare riguroasa.",
        icon: "file-search",
        cta: "Discuta despre o ancheta",
      },
      {
        title: "Unelte interactive",
        description:
          "Calculatoare, explainere si harti care ajuta cititorii sa exploreze subiecte complexe prin interactiune directa.",
        icon: "chart-no-axes-combined",
        cta: "Hai sa discutam despre viziunea ta",
      },
      {
        title: "Training",
        description:
          "Ateliere pentru redactii si ONG-uri despre alfabetizare in date, fluxuri de lucru investigative si tehnici etice de vizualizare.",
        icon: "graduation-cap",
        href: "https://training.nicu.md/",
        variant: "accent",
        label: "Vezi resursele noastre gratuite",
      },
    ] as (Omit<ServiceCardData, "href"> | ServiceCardData)[],
  },
  contactBlock: {
    title: "Ia legatura cu noi",
    body: "Fie ca ai un set urias de date sau doar germenul unei idei, hai sa vorbim.",
    email: "Email direct",
    locationLabel: "Locatie",
    location: "Londra, Regatul Unit",
    social: "Social media",
  },
};
