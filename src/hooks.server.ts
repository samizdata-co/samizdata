import { redirect, type Handle } from "@sveltejs/kit";
import { getLocaleFromParam } from "$lib/i18n/locales";
import { trainingPageHrefs } from "$lib/training/content";

const resolveLegacyTrainingSlug = (slug: string) => {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  const withoutExtension = normalized.replace(/\.(html|qmd)$/i, "");

  if (withoutExtension === "index") {
    return "/training";
  }

  if (withoutExtension === "sources") {
    return "/training/sources";
  }

  if (withoutExtension === "ai/python-classification-agent") {
    return "/training/ai";
  }

  if (withoutExtension.endsWith("/index")) {
    const candidate = withoutExtension.slice(0, -"/index".length);
    return candidate ? `/training/${candidate}` : "/training";
  }

  const candidateHref = `/training/${withoutExtension}`;

  return trainingPageHrefs.has(candidateHref) ? candidateHref : null;
};

export const handle: Handle = async ({ event, resolve }) => {
  const locale = getLocaleFromParam(event.params.lang);
  const pathname = event.url.pathname;

  if (!pathname.startsWith("/training")) {
    const legacyHref = resolveLegacyTrainingSlug(pathname.slice(1));

    if (legacyHref) {
      throw redirect(308, legacyHref);
    }
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", locale),
  });
};
