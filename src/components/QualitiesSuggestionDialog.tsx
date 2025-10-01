
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useScopedI18n } from '@/locales/client';
import { Loader2 } from 'lucide-react';

interface QualitiesSuggestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  suggestions: string[];
  updateAction: 'add' | 'replace' | null;
  onUpdateActionChange: (action: 'add' | 'replace') => void;
  onConfirm: () => void;
  isSaving: boolean;
}

const QualitiesSuggestionDialog: React.FC<QualitiesSuggestionDialogProps> = ({
  isOpen,
  onClose,
  studentName,
  suggestions,
  updateAction,
  onUpdateActionChange,
  onConfirm,
  isSaving,
}) => {
  const t = useScopedI18n('coach.qualitiesSuggestion.dialog');
  const tRelations = useScopedI18n('relations');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title', { name: studentName })}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge key={index} variant="secondary" className="text-base">
                {suggestion}
              </Badge>
            ))}
          </div>
          <div>
            <h4 className="font-semibold mb-2">{t('confirmation')}</h4>
            <RadioGroup
              onValueChange={onUpdateActionChange}
              value={updateAction || ''}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add-qualities" />
                <Label htmlFor="add-qualities">{t('add')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="replace" id="replace-qualities" />
                <Label htmlFor="replace-qualities">{t('replace')}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isSaving}>
            {tRelations('cancel')}
          </Button>
          <Button onClick={onConfirm} disabled={!updateAction || isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QualitiesSuggestionDialog;

