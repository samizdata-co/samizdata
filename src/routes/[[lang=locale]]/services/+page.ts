import type { PageLoad } from "./$types";
import { getLocaleFromParam } from "$lib/i18n/locales";
import { getServices } from "$lib/data/services";

export const prerender = true;
export const entries = () => [{}, { lang: "ro" }];

export const load: PageLoad = ({ params }) => ({
  services: getServices(getLocaleFromParam(params.lang)),
});
