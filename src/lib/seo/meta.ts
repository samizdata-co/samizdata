import { localizePath, locales, type AppLocale } from "$lib/i18n/locales";
import { siteConfig } from "$lib/data/site";

type MetaInput = {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
};

export const buildUrl = (pathname: string, locale: AppLocale) => {
  const localizedPath = localizePath(pathname, locale);

  return localizedPath === "/"
    ? siteConfig.url
    : `${siteConfig.url}${localizedPath}`;
};

export const buildAlternates = (pathname: string) =>
  locales.map((locale) => ({
    locale,
    href: buildUrl(pathname, locale),
  }));

export const buildMeta = ({ locale, pathname, title, description }: MetaInput) => ({
  title: `${siteConfig.name} • ${title}`,
  description,
  canonical: buildUrl(pathname, locale),
  alternates: buildAlternates(pathname),
});
