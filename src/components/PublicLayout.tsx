
'use client';

import React from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--accent)),hsl(var(--background)))]" />
      
      <div className="absolute top-4 left-4 flex items-center gap-2">
         <Image src="/logo.png" alt="Ronda Logo" width={120} height={32} />
      </div>

      {children}
    </div>
  );
};

export default PublicLayout;
