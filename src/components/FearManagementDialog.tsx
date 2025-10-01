
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useScopedI18n } from '@/locales/client';
import { Loader2, Sparkles, HeartPulse } from 'lucide-react';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { FearManagementSuggestionDTO } from '@/modules/fear-management-suggestion/application/dtos/fear-management-suggestion.dto';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import ReactMarkdown from 'react-markdown';
import { Separator } from './ui/separator';

interface FearManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentDTO | null;
  fear: string | null;
  suggestions: FearManagementSuggestionDTO[];
  onGenerateSuggestion: (fear: string) => void;
  isGenerating: boolean;
}

const FearManagementDialog: React.FC<FearManagementDialogProps> = ({
  isOpen,
  onClose,
  student,
  fear,
  suggestions,
  onGenerateSuggestion,
  isGenerating,
}) => {
  const t = useScopedI18n('coach.fearManagement.dialog');
  const tRelations = useScopedI18n('relations');

  if (!student || !fear) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('title', { fear: `"${fear}"` })}</DialogTitle>
          <DialogDescription>{t('description', { name: student.name })}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {suggestions.length > 0 ? (
            <ScrollArea className="h-64 pr-4">
                <div className="space-y-3">
                    {suggestions.map(suggestion => (
                        <Card key={suggestion.id} className="bg-yellow-50/50">
                            <CardHeader className="p-3">
                                <CardTitle className="text-base text-yellow-900">{suggestion.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                               <div className="prose prose-sm max-w-none text-yellow-800">
                                   <ReactMarkdown>{suggestion.rationale}</ReactMarkdown>
                               </div>
                               <Separator className="my-2 bg-yellow-200"/>
                               <ul className="space-y-1 list-disc pl-4 text-xs text-yellow-700">
                                   {suggestion.steps.map((step, i) => <li key={i}>{step.text}</li>)}
                               </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
                <HeartPulse className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <h4 className="font-semibold">{t('noSuggestions.title')}</h4>
                <p className="text-sm">{t('noSuggestions.description')}</p>
            </div>
          )}
        </div>
        <DialogFooter className="flex-col sm:flex-col sm:space-y-2 sm:space-x-0">
          <Button
            onClick={() => onGenerateSuggestion(fear)}
            disabled={isGenerating}
          >
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {t('generateButton')}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            {tRelations('cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FearManagementDialog;
