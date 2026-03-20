import type { ParamMatcher } from '@sveltejs/kit';
import { isPrefixedLocale } from '$lib/i18n/locales';

export const match = ((param: string) => isPrefixedLocale(param)) satisfies ParamMatcher;
