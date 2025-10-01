
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';

const GlobalLoader = () => {
    const t = useScopedI18n('home'); // Asumiendo que el texto estará en home

    return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-lg font-semibold text-foreground">
                Cargando interfaz...
            </p>
        </div>
    );
};

export default GlobalLoader;
