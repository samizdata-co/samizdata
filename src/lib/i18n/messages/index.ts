import type { AppLocale } from "$lib/i18n/locales";
import { enMessages } from "./en";
import { roMessages } from "./ro";
import type { LocaleMessages } from "./schema";
export type { LocaleMessages } from "./schema";

export const messages: Record<AppLocale, LocaleMessages> = {
  en: enMessages,
  ro: roMessages,
};

export const getMessages = (locale: AppLocale) => messages[locale];
