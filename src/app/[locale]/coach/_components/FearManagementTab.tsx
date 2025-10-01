
'use client';

import React, { useState } from 'react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, HeartPulse, Trash2, ShieldAlert, Circle, CheckCircle, CircleDot, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useFearManagement } from '../_hooks/useFearManagement';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import StepEvaluationDialog from '@/components/StepEvaluationDialog';
import { FearManagementStepDTO, FearManagementStepStatus, FearManagementSuggestionDTO } from '@/modules/fear-management-suggestion/application/dtos/fear-management-suggestion.dto';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

type EvaluatingStep = {
  plan: FearManagementSuggestionDTO;
  step: FearManagementStepDTO;
  stepIndex: number;
} | null;

const statusIcons: Record<FearManagementStepStatus, React.ElementType> = {
  pending: Circle,
  completed: CheckCircle,
  skipped: XCircle,
};

const statusColors: Record<FearManagementStepStatus, string> = {
  pending: 'text-gray-500',
  completed: 'text-green-500',
  skipped: 'text-red-500',
};

interface FearManagementTabProps {
  selectedStudent: StudentDTO;
}

const FearManagementTab: React.FC<FearManagementTabProps> = ({ 
    selectedStudent,
}) => {
  const tCoach = useScopedI18n('coach');
  const tRelations = useScopedI18n('relations');
  const locale = useCurrentLocale();
  const [feedbackValues, setFeedbackValues] = useState<Record<string, string>>({});
  const [evaluatingStep, setEvaluatingStep] = useState<EvaluatingStep>(null);

  const {
    fearManagementSuggestions,
    isLoadingFearManagementSuggestions,
    generateFearManagementSuggestion,
    addFearFeedback,
    deleteFearSuggestion,
    fearUpdateProposal,
    setFearUpdateProposal,
    handleAcceptFearUpdate,
    deletingFearSuggestionId,
    setDeletingFearSuggestionId,
    updateStepDetails,
  } = useFearManagement(selectedStudent, locale);

  const isGeneratingFearSuggestion = generateFearManagementSuggestion.isPending;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className='flex-1'>
              <CardTitle className="text-lg">{tCoach('fearManagement.title')}</CardTitle>
              <CardDescription className="mt-1">{tCoach('fearManagement.description')}</CardDescription>
            </div>
            {selectedStudent.fears && selectedStudent.fears.length > 0 ? (
              <Button onClick={() => generateFearManagementSuggestion.mutate(selectedStudent)} disabled={isGeneratingFearSuggestion} className="ml-4">
                {isGeneratingFearSuggestion ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {tCoach('fearManagement.button')}
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingFearManagementSuggestions ? <Skeleton className="h-20 w-full" /> : fearManagementSuggestions.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {fearManagementSuggestions.map(suggestion => (
                <AccordionItem value={suggestion.id} key={suggestion.id} className="border rounded-lg bg-yellow-50/50 border-yellow-200">
                   <div className="flex justify-between items-center p-4">
                    <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                        <div>
                            <h4 className="font-semibold text-yellow-900">{suggestion.title}</h4>
                            <p className="text-xs text-yellow-600 pt-1">
                            {tCoach('fearManagement.strategyFor')} {`"${suggestion.targetedFear}"`} • {formatDistanceToNow(new Date(suggestion.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                            </p>
                        </div>
                    </AccordionTrigger>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/60 hover:text-destructive ml-2 shrink-0" onClick={() => setDeletingFearSuggestionId(suggestion.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                   </div>
                  <AccordionContent className="px-4 pb-4 pt-0">
                     <div className="space-y-4 border-t border-yellow-200/50 pt-4">
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                            <ReactMarkdown>{suggestion.rationale}</ReactMarkdown>
                        </div>
                        <div className="space-y-2">
                             {suggestion.steps.map((step, index) => {
                                const Icon = statusIcons[step.status] || Circle;
                                return (
                                <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-md border">
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setEvaluatingStep({ plan: suggestion, step, stepIndex: index })}>
                                        <Icon className={cn("h-5 w-5", statusColors[step.status])} />
                                    </Button>
                                    <div className="flex-1">
                                        <p className="text-sm">{step.text}</p>
                                        {step.feedback && <p className="text-xs italic text-muted-foreground mt-1">{`"${step.feedback}"`}</p>}
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-2">{tCoach('fearManagement.feedbackTitle')}</h4>
                             {suggestion.teacherFeedback ? (
                                <p className="text-sm italic text-muted-foreground">{`"${suggestion.teacherFeedback}"`}</p>
                            ) : (
                                <div className="flex items-center gap-2">
                                <Textarea
                                    placeholder={tCoach('fearManagement.feedbackPlaceholder')}
                                    value={feedbackValues[suggestion.id] || ''}
                                    onChange={(e) => setFeedbackValues(prev => ({ ...prev, [suggestion.id]: e.target.value }))}
                                    rows={2}
                                />
                                <Button
                                    size="sm"
                                    onClick={() => addFearFeedback.mutate({ suggestion: suggestion, feedback: feedbackValues[suggestion.id] || '' })}
                                    disabled={addFearFeedback.isPending || !feedbackValues[suggestion.id]}
                                >
                                    {tRelations('save')}
                                </Button>
                                </div>
                            )}
                        </div>
                     </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
              {selectedStudent.fears && selectedStudent.fears.length > 0 ? (
                <>
                  <HeartPulse className="mx-auto h-12 w-12 text-gray-400" />
                  <h4 className="mt-4 text-lg font-semibold">{tCoach('fearManagement.noSuggestions.title')}</h4>
                  <p className="mt-2 text-sm">{tCoach('fearManagement.noSuggestions.description')}</p>
                </>
              ) : (
                <>
                  <ShieldAlert className="mx-auto h-12 w-12 text-gray-400" />
                  <h4 className="mt-4 text-lg font-semibold">{tCoach('fearManagement.noSuggestions.noFears')}</h4>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <AlertDialog open={!!deletingFearSuggestionId} onOpenChange={() => setDeletingFearSuggestionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tCoach('fearManagement.deleteDialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>{tCoach('fearManagement.deleteDialog.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingFearSuggestionId(null)}>{tRelations('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deletingFearSuggestionId) { deleteFearSuggestion.mutate(deletingFearSuggestionId); } }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteFearSuggestion.isPending}>
              {deleteFearSuggestion.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : tCoach('supportPlan.deleteDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={!!fearUpdateProposal} onOpenChange={() => setFearUpdateProposal(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tCoach('fearManagement.updateDialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>{fearUpdateProposal?.updateProposal}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFearUpdateProposal(null)}>{tRelations('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleAcceptFearUpdate}>
              {tCoach('fearManagement.updateDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        <StepEvaluationDialog
            isOpen={!!evaluatingStep}
            onClose={() => setEvaluatingStep(null)}
            onSave={(status, feedback) => {
                if (evaluatingStep) {
                    updateStepDetails.mutate({
                        suggestionId: evaluatingStep.plan.id,
                        stepIndex: evaluatingStep.stepIndex,
                        details: { status: status as FearManagementStepStatus, feedback }
                    })
                }
            }}
            isSaving={updateStepDetails.isPending}
            evaluationData={evaluatingStep}
            isIndividualMode // Special flag for the dialog
        />
    </>
  );
};

export default FearManagementTab;
