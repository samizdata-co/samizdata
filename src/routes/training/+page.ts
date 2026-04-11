import { siteConfig } from "$lib/data/site";

export const prerender = true;

export const load = () => ({
  meta: {
    title: `${siteConfig.name} • Training`,
    description:
      "Open training resources on data journalism, AI workflows, sourcing, and investigative reporting from SAMIZDATA.",
    canonical: `${siteConfig.url}/training`,
  },
});
