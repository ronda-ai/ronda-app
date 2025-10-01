
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
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
              <Accordion type="single" collapsible className="w-full space-y-2">
                {suggestions.map(suggestion => (
                  <AccordionItem value={suggestion.id} key={suggestion.id} className="border rounded-lg bg-yellow-50/50 border-yellow-200">
                    <AccordionTrigger className="p-3 text-left hover:no-underline">
                      <h4 className="font-semibold text-yellow-900">{suggestion.title}</h4>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3">
                       <div className="prose prose-sm max-w-none text-yellow-800 border-t border-yellow-200/50 pt-3">
                           <ReactMarkdown>{suggestion.rationale}</ReactMarkdown>
                       </div>
                       <Separator className="my-2 bg-yellow-200"/>
                       <ul className="space-y-1 list-disc pl-5 text-xs text-yellow-700">
                           {suggestion.steps.map((step, i) => <li key={i}>{step.text}</li>)}
                       </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
