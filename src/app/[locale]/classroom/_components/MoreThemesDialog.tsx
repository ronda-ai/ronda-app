'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import ThemeGallery from '@/app/[locale]/classroom/_components/ThemeGallery';
import { useScopedI18n } from '@/locales/client';
import { Theme } from '@/config/themes';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MoreThemesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: Theme) => void;
  currentThemeName?: string;
  themes: Theme[];
}

const MoreThemesDialog: React.FC<MoreThemesDialogProps> = ({
  isOpen,
  onClose,
  onSelectTheme,
  currentThemeName,
  themes,
}) => {
  const t = useScopedI18n('classroom.theme');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl flex flex-col h-[80vh]">
        <DialogHeader>
          <DialogTitle>{t('galleryTitle')}</DialogTitle>
          <DialogDescription>{t('galleryDescription')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6">
            <div className="py-4">
            <ThemeGallery
                onSelectTheme={onSelectTheme}
                currentThemeName={currentThemeName}
                themes={themes}
            />
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MoreThemesDialog;
