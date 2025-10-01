
'use client';

import React from 'react';
import { themes, Theme } from '@/config/themes';
import { useScopedI18n } from '@/locales/client';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface ThemeGalleryProps {
  onSelectTheme: (theme: Theme) => void;
  currentThemeName?: string;
  themes: Theme[];
}

const ThemeGallery: React.FC<ThemeGalleryProps> = ({ onSelectTheme, currentThemeName, themes }) => {
  const tThemes = useScopedI18n('classroom.theme.names');

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {themes.map((theme) => {
        const isSelected = currentThemeName === theme.name;
        return (
          <Card
            key={theme.name}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative',
              isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
            )}
            onClick={() => onSelectTheme(theme)}
          >
            <div className="p-4 space-y-2">
              <div className="flex justify-center space-x-[-8px]">
                <div
                  className="h-10 w-10 rounded-full border-2 border-card"
                  style={{ backgroundColor: `hsl(${theme.primary})` }}
                />
                <div
                  className="h-10 w-10 rounded-full border-2 border-card"
                  style={{ backgroundColor: `hsl(${theme.accent})` }}
                />
                <div
                  className="h-10 w-10 rounded-full border-2 border-card"
                  style={{ backgroundColor: `hsl(${theme.background})` }}
                />
              </div>
              <p className="text-center font-medium text-sm pt-2">{tThemes(theme.name as any)}</p>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center">
                <CheckCircle className="h-4 w-4" />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default ThemeGallery;
