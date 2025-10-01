
'use client';
import {I18nProviderClient, useCurrentLocale} from '@/locales/client';
import {Toaster} from '@/components/ui/toaster';
import Providers from './providers';
import {useAuthStore} from '@/stores/auth.store';
import {useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';
import { useAccessibilityStore } from '@/stores/accessibility.store';
import { cn } from '@/lib/utils';

function ThemeInjector() {
    const { data: config } = useQuery<AIConfigurationDTO>({
        queryKey: ['aiConfiguration'],
        queryFn: () => fetch('/api/ai/configuration').then(res => res.ok ? res.json() : null),
    });

    useEffect(() => {
        if (config?.theme) {
            const root = document.documentElement;
            if (config.theme.primary) root.style.setProperty('--primary', config.theme.primary);
            if (config.theme.background) root.style.setProperty('--background', config.theme.background);
            if (config.theme.accent) root.style.setProperty('--accent', config.theme.accent);
        }
    }, [config]);

    return null;
}

function AccessibilityManager() {
    const { fontSize, isMotionReduced } = useAccessibilityStore();

    useEffect(() => {
        const root = document.documentElement;
        
        // Font Size
        const multiplier = (fontSize && !isNaN(fontSize)) ? fontSize / 100 : 1;
        root.style.setProperty('--font-size-multiplier', String(multiplier));
        
        // Reduce Motion
        root.classList.toggle('reduce-motion', isMotionReduced);

    }, [fontSize, isMotionReduced]);

    return null;
}


export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const locale = useCurrentLocale();

  useEffect(() => {
    // This is a crucial step to ensure client-side auth state is initialized
    // from sessionStorage before the first render.
    useAuthStore.persist.rehydrate();
    useAccessibilityStore.persist.rehydrate();
  }, []);

  return (
    <Providers>
      <I18nProviderClient locale={locale}>
        <ThemeInjector />
        <AccessibilityManager />
        {children}
        <Toaster />
      </I18nProviderClient>
    </Providers>
  );
}
