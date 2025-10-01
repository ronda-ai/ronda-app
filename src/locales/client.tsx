
'use client';

import { createI18nClient } from 'next-international/client';

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale
} = createI18nClient({
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
