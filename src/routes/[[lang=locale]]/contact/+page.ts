import { getMessages } from "$lib/i18n/messages";
import { getLocaleFromParam, stripLocaleFromPathname } from "$lib/i18n/locales";
import { buildMeta } from "$lib/seo/meta";

export const prerender = true;
export const entries = () => [{}, { lang: "ro" }];

export const load = ({ params, url }) => {
  const locale = getLocaleFromParam(params.lang);
  const pathname = stripLocaleFromPathname(url.pathname);
  const messages = getMessages(locale);

  return {
    meta: buildMeta({
      locale,
      pathname,
      title: messages.seo.contact.title,
      description: messages.seo.contact.description,
    }),
  };
};
