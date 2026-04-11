export type TrainingPageMeta = {
  slug: string;
  href: string;
  title: string;
  description?: string;
  navLabel: string;
  section: string;
  order: number;
};

export type TrainingNavSection = {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
};

export const trainingPages: TrainingPageMeta[] = [
  {
    slug: "sources",
    href: "/training/sources",
    title: "Data Sources",
    description:
      "A starting point for finding useful public, official, and international datasets for journalism.",
    navLabel: "Data Sources",
    section: "Resources",
    order: 10,
  },
  {
    slug: "sources/academic",
    href: "/training/sources/academic",
    title: "Academic Data Sources",
    description:
      "A practical guide to finding papers, replication data, and alerts for academic research relevant to journalism.",
    navLabel: "Academic Data Sources",
    section: "Resources",
    order: 11,
  },
  {
    slug: "sources/calendar",
    href: "/training/sources/calendar",
    title: "Data Calendar",
    description:
      "Release calendars and publication schedules that help reporters plan stories around upcoming datasets.",
    navLabel: "Data Calendar",
    section: "Resources",
    order: 12,
  },
  {
    slug: "toolbox",
    href: "/training/toolbox",
    title: "Data Toolbox",
    description:
      "A practical toolbox of scraping, wrangling, analysis and visualisation resources for data journalism.",
    navLabel: "Data Toolbox",
    section: "Resources",
    order: 20,
  },
  {
    slug: "ddj",
    href: "/training/ddj",
    title: "Introduction to Data Journalism",
    description:
      "A concise introduction to what data journalism is, why it matters, and how it changes newsroom work.",
    navLabel: "Introduction to Data Journalism",
    section: "Lessons",
    order: 30,
  },
  {
    slug: "ai",
    href: "/training/ai",
    title: "AI for Journalists",
    description:
      "A practical introduction to what large language models are good at, what they get wrong, and how to think about them as a reporter.",
    navLabel: "AI for Journalists",
    section: "Lessons",
    order: 40,
  },
  {
    slug: "ai/google-sheets",
    href: "/training/ai/google-sheets",
    title: "AI in Google Sheets",
    description:
      "How to use language models inside Google Sheets, where the risks show up, and how to validate outputs before trusting them.",
    navLabel: "AI in Google Sheets",
    section: "Lessons",
    order: 41,
  },
  {
    slug: "awards",
    href: "/training/awards",
    title: "Data Journalism Awards",
    description:
      "A short list of awards relevant to data journalism and investigative reporting.",
    navLabel: "Data Journalism Awards",
    section: "Resources",
    order: 50,
  },
].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const trainingNav: TrainingNavSection[] = Array.from(
  trainingPages.reduce((map, page) => {
    const section = map.get(page.section) ?? [];
    section.push({ title: page.navLabel, href: page.href });
    map.set(page.section, section);
    return map;
  }, new Map<string, { title: string; href: string }[]>()),
).map(([title, items]) => ({ title, items }));

export const trainingPageHrefs = new Set(trainingPages.map((page) => page.href));
