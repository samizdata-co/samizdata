import { browser } from "$app/environment";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "samizdata-theme";

export const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

export const getSystemTheme = (): Theme => {
  if (!browser) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getStoredTheme = (): Theme | null => {
  if (!browser) {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

export const getPreferredTheme = (): Theme => getStoredTheme() ?? getSystemTheme();

export const applyTheme = (theme: Theme) => {
  if (!browser) {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

export const persistTheme = (theme: Theme) => {
  if (!browser) {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
};

export const setTheme = (theme: Theme) => {
  applyTheme(theme);
  persistTheme(theme);
};
