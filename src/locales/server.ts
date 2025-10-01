
import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getCurrentLocale } = createI18nServer({
  en: () => import('./en'),
  es: () => import('./es'),
  pt: () => import('./pt'),
  fr: () => import('./fr'),
  de: () => import('./de'),
  'zh-CN': () => import('./zh-CN'),
  ja: () => import('./ja'),
  ru: () => import('./ru'),
  it: () => import('./it'),
  pl: () => import('./pl'),
  nl: () => import('./nl'),
  ko: () => import('./ko'),
  hi: () => import('./hi'),
  id: () => import('./id'),
});
