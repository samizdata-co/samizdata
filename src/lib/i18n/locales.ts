export const defaultLocale = "en" as const;
export const prefixLocales = ["ro"] as const;
export const locales = [defaultLocale, ...prefixLocales] as const;

export type AppLocale = (typeof locales)[number];
export type PrefixedLocale = (typeof prefixLocales)[number];

export const localeMeta: Record<AppLocale, { flag: string }> = {
  en: { flag: "🇬🇧" },
  ro: { flag: "🇷🇴" },
};

export const isPrefixedLocale = (value: string): value is PrefixedLocale =>
  prefixLocales.includes(value as PrefixedLocale);

export const getLocaleFromParam = (value?: string): AppLocale =>
  value && isPrefixedLocale(value) ? value : defaultLocale;

export const stripLocaleFromPathname = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  if (!first || !isPrefixedLocale(first)) {
    return pathname || "/";
  }

  return rest.length ? `/${rest.join("/")}` : "/";
};

export const localizePath = (pathname: string, locale: AppLocale): string => {
  const normalized =
    pathname === "/" ? "/" : `/${pathname.replace(/^\/+/, "")}`;

  if (locale === defaultLocale) {
    return normalized;
  }

  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
};
