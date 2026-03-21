import type { LayoutLoad } from "./$types";
import { getLocaleFromParam, stripLocaleFromPathname } from "$lib/i18n/locales";
import { loadTranslations } from "$lib/translations";

export const prerender = true;

export const load: LayoutLoad = async ({ params, url }) => {
  const locale = getLocaleFromParam(params.lang);
  const pathname = stripLocaleFromPathname(url.pathname);

  await loadTranslations(locale, pathname);

  return {
    locale,
    pathname,
  };
};
