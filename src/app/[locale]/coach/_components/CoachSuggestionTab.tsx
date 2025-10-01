
'use client';

import React, { useState } from 'react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, MessageSquareQuote, CheckCircle, AlertTriangle, Lightbulb, HelpCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { useCoachSuggestions } from '../_hooks/useCoachSuggestions';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { ObservationDTO } from '@/modules/observation/application/dtos/observation.dto';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface CoachSuggestionTabProps {
  selectedStudent: StudentDTO;
  allStudents: StudentDTO[];
  observations: ObservationDTO[];
}

const CoachSuggestionTab: React.FC<CoachSuggestionTabProps> = ({ selectedStudent, allStudents, observations }) => {
  const tCoach = useScopedI18n('coach');
  const tRelations = useScopedI18n('relations');
  const locale = useCurrentLocale();
  const { 
    coachSuggestions, 
    isLoadingCoachSuggestions, 
    generateCoachSuggestion,
    deleteCoachSuggestion,
  } = useCoachSuggestions(
    selectedStudent,
    locale,
    allStudents,
    observations
  );

  const [suggestionToDelete, setSuggestionToDelete] = useState<string | null>(null);

  const isGeneratingSuggestion = generateCoachSuggestion.isPending;
  
  const handleDeleteConfirm = () => {
    if (suggestionToDelete) {
        deleteCoachSuggestion.mutate(suggestionToDelete);
        setSuggestionToDelete(null);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <CardTitle className="text-lg">{tCoach('coachSuggestion.title')}</CardTitle>
              <CardDescription className="mt-1">{tCoach('coachSuggestion.description')}</CardDescription>
            </div>
            <Button onClick={() => generateCoachSuggestion.mutate(selectedStudent)} disabled={isGeneratingSuggestion} className="ml-4">
              {isGeneratingSuggestion ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {tCoach('coachSuggestion.button')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingCoachSuggestions ? <Skeleton className="h-40 w-full" /> : coachSuggestions.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {coachSuggestions.map(suggestion => (
                <AccordionItem value={suggestion.id} key={suggestion.id} className="border rounded-lg bg-blue-50/50 border-blue-200">
                    <div className="flex justify-between items-center p-4">
                        <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                            <div>
                                <h4 className="font-semibold text-blue-900">{suggestion.title}</h4>
                                <p className="text-xs text-blue-500 pt-1">
                                {formatDistanceToNow(new Date(suggestion.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                </p>
                            </div>
                        </AccordionTrigger>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/60 hover:text-destructive ml-2 shrink-0" onClick={() => setSuggestionToDelete(suggestion.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <AccordionContent className="px-4 pb-4 pt-0">
                        <div className="space-y-4 border-t border-blue-200/50 pt-4">
                            <div>
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-green-700"><CheckCircle className="h-4 w-4"/>Aspectos Positivos</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-green-800">
                                    {suggestion.positiveAspects.map((aspect, i) => <li key={i}>{aspect}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-amber-700"><AlertTriangle className="h-4 w-4"/>Áreas a Mejorar</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-amber-800">
                                    {suggestion.areasForImprovement.map((area, i) => <li key={i}>{area}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-blue-700"><Lightbulb className="h-4 w-4"/>Sugerencia</h4>
                                <p className="text-sm mt-1 text-blue-800">{suggestion.suggestion}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-purple-700"><HelpCircle className="h-4 w-4"/>Pregunta para Profundizar</h4>
                                <p className="text-sm mt-1 italic text-purple-800">{`"${suggestion.deepeningQuestion}"`}</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
              <MessageSquareQuote className="mx-auto h-12 w-12 text-gray-400" />
              <h4 className="mt-4 text-lg font-semibold">{tCoach('coachSuggestion.noSuggestions.title')}</h4>
              <p className="mt-2 text-sm">{tCoach('coachSuggestion.noSuggestions.description')}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <AlertDialog open={!!suggestionToDelete} onOpenChange={(open) => !open && setSuggestionToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{tCoach('coachSuggestion.deleteDialog.title')}</AlertDialogTitle>
                <AlertDialogDescription>{tCoach('coachSuggestion.deleteDialog.description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSuggestionToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteCoachSuggestion.isPending}>
                    {deleteCoachSuggestion.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : tCoach('coachSuggestion.deleteDialog.confirm')}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CoachSuggestionTab;
