import type { LayoutLoad } from "./$types";
import { getMessages } from "$lib/i18n/messages";
import { getLocaleFromParam, stripLocaleFromPathname } from "$lib/i18n/locales";
import { buildMeta } from "$lib/seo/meta";
import { loadTranslations } from "$lib/translations";

export const prerender = true;

export const load: LayoutLoad = async ({ params, url }) => {
  const locale = getLocaleFromParam(params.lang);
  const pathname = stripLocaleFromPathname(url.pathname);
  const messages = getMessages(locale);

  await loadTranslations(locale, pathname);

  return {
    locale,
    pathname,
    meta: buildMeta({
      locale,
      pathname,
      title: messages.seo.home.title,
      description: messages.seo.home.description,
    }),
  };
};
