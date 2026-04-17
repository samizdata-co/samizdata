import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";
import { getServiceBySlug, getServiceSlugs } from "$lib/data/services";
import { getLocaleFromParam } from "$lib/i18n/locales";
import { getMessages } from "$lib/i18n/messages";
import { buildMeta } from "$lib/seo/meta";

export const prerender = true;
export const entries: EntryGenerator = () =>
  ([undefined, "ro"] as const).flatMap((lang) =>
    getServiceSlugs().map((slug) => (lang ? { lang, slug } : { slug })),
  );

export const load: PageLoad = ({ params }) => {
  const locale = getLocaleFromParam(params.lang);
  const service = getServiceBySlug(params.slug, locale);
  const messages = getMessages(locale);

  if (!service) {
    throw error(404, "Service not found");
  }

  return {
    service,
    meta: buildMeta({
      locale,
      pathname: `/services/${service.slug}`,
      title: `${messages.seo.services.title} • ${service.name}`,
      description: service.summary,
    }),
  };
};
