import type { RequestHandler } from "./$types";
import { locales, localizePath } from "$lib/i18n/locales";
import { siteConfig } from "$lib/data/site";
import { getServiceSlugs } from "$lib/data/services";
import { trainingPages } from "$lib/training/content";

const pages = [
  "/",
  "/contact",
  "/services",
  ...getServiceSlugs().map((slug) => `/services/${slug}`),
  "/training",
  ...trainingPages.map((page) => page.href),
];

export const prerender = true;

export const GET: RequestHandler = async () => {
  const urls = pages.flatMap((page) =>
    locales.map((locale) => {
      if (page.startsWith("/training") && locale !== "en") {
        return null;
      }

      const localizedPath = localizePath(page, locale);
      const href =
        localizedPath === "/"
          ? siteConfig.url
          : `${siteConfig.url}${localizedPath}`;

      return `<url><loc>${href}</loc></url>`;
    }),
  ).filter(Boolean);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
