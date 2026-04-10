import type { Handle } from "@sveltejs/kit";
import { getLocaleFromParam } from "$lib/i18n/locales";

export const handle: Handle = async ({ event, resolve }) => {
  const locale = getLocaleFromParam(event.params.lang);

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", locale),
  });
};
