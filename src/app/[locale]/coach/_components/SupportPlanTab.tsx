
'use client';

import React, { useState } from 'react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, BookOpenCheck, Trash2, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import StepEvaluationDialog from '@/components/StepEvaluationDialog';
import { useSupportPlans } from '../_hooks/useSupportPlans';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { ObservationDTO } from '@/modules/observation/application/dtos/observation.dto';
import { ChallengeHistoryDTO } from '@/modules/challenge/application/dtos/challenge-history.dto';
import { SupportPlanDTO, SupportPlanStepDTO, SupportPlanStepStatus } from '@/modules/support-plan/application/dtos/support-plan.dto';
import { Circle, CheckCircle2, CircleDot, XCircle, AlertCircle } from 'lucide-react';

type EvaluatingStep = {
  plan: SupportPlanDTO;
  step: SupportPlanStepDTO;
  stepIndex: number;
} | null;

const statusIcons: Record<SupportPlanStepStatus, React.ElementType> = {
  pending: Circle,
  achieved: CheckCircle2,
  'partially-achieved': CircleDot,
  'not-achieved': XCircle,
  discarded: AlertCircle,
};

const statusColors: Record<SupportPlanStepStatus, string> = {
  pending: 'text-gray-500',
  achieved: 'text-green-500',
  'partially-achieved': 'text-yellow-500',
  'not-achieved': 'text-red-500',
  discarded: 'text-gray-400 italic',
};

interface SupportPlanTabProps {
  selectedStudent: StudentDTO;
  allStudents: StudentDTO[];
  observations: ObservationDTO[];
  challengeHistory: ChallengeHistoryDTO[];
}

const SupportPlanTab: React.FC<SupportPlanTabProps> = ({ selectedStudent, allStudents, observations, challengeHistory }) => {
  const tCoach = useScopedI18n('coach');
  const tRelations = useScopedI18n('relations');
  const locale = useCurrentLocale();

  const {
    supportPlans,
    isLoadingSupportPlans,
    generateSupportPlan,
    addFeedbackToPlan,
    updateStepDetails,
    deleteSupportPlan,
    deletingPlanId,
    setDeletingPlanId,
  } = useSupportPlans(selectedStudent, locale, allStudents, observations, challengeHistory);

  const [feedbackValues, setFeedbackValues] = useState<Record<string, string>>({});
  const [evaluatingStep, setEvaluatingStep] = useState<EvaluatingStep>(null);

  const isGeneratingSupportPlan = generateSupportPlan.isPending;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className='flex-1'>
              <CardTitle className="text-lg">{tCoach('supportPlan.title')}</CardTitle>
              <CardDescription className="mt-1">{tCoach('supportPlan.description')}</CardDescription>
            </div>
            <Button onClick={() => generateSupportPlan.mutate(selectedStudent)} disabled={isGeneratingSupportPlan} className="ml-4">
              {isGeneratingSupportPlan ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {tCoach('supportPlan.button')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingSupportPlans ? <Skeleton className="h-20 w-full" /> : supportPlans.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {supportPlans.map(plan => (
                <AccordionItem value={plan.id} key={plan.id} className="border rounded-lg bg-muted/30">
                  <div className="flex justify-between items-center p-4">
                    <AccordionTrigger className="flex-1 hover:no-underline p-0">
                      <div className='text-left'>
                        <h4 className="font-semibold text-primary">{tCoach('supportPlan.planGenerated', { date: formatDistanceToNow(new Date(plan.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS }) })}</h4>
                      </div>
                    </AccordionTrigger>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive ml-2" onClick={() => setDeletingPlanId(plan.id)}>
                      {deleteSupportPlan.isPending && deletingPlanId === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  <AccordionContent className="p-4 pt-0">
                    <div className="space-y-3">
                      {plan.steps.map((step, index) => {
                        const Icon = statusIcons[step.status];
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-md border">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setEvaluatingStep({ plan, step, stepIndex: index })}>
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
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold text-sm mb-2">{tCoach('supportPlan.feedbackTitle')}</h4>
                      {plan.teacherFeedback ? (
                        <p className="text-sm italic text-muted-foreground">{`"${plan.teacherFeedback}"`}</p>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Textarea
                            placeholder={tCoach('supportPlan.feedbackPlaceholder')}
                            value={feedbackValues[plan.id] || ''}
                            onChange={e => setFeedbackValues(prev => ({ ...prev, [plan.id]: e.target.value }))}
                            rows={2}
                          />
                          <Button size="icon" onClick={() => addFeedbackToPlan.mutate({ planId: plan.id, feedback: feedbackValues[plan.id] || '' })} disabled={addFeedbackToPlan.isPending || !feedbackValues[plan.id]}>
                            <Send />
                          </Button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
              <BookOpenCheck className="mx-auto h-12 w-12 text-gray-400" />
              <h4 className="mt-4 text-lg font-semibold">{tCoach('supportPlan.noPlans.title')}</h4>
              <p className="mt-2 text-sm">{tCoach('supportPlan.noPlans.description')}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <AlertDialog open={!!deletingPlanId} onOpenChange={() => setDeletingPlanId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tCoach('supportPlan.deleteDialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>{tCoach('supportPlan.deleteDialog.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingPlanId(null)}>{tRelations('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deletingPlanId) { deleteSupportPlan.mutate(deletingPlanId); } }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteSupportPlan.isPending}>
              {deleteSupportPlan.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : tCoach('supportPlan.deleteDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <StepEvaluationDialog
        isOpen={!!evaluatingStep}
        onClose={() => setEvaluatingStep(null)}
        onSave={(status, feedback) => {
          if (evaluatingStep) {
            updateStepDetails.mutate({ planId: evaluatingStep.plan.id, stepIndex: evaluatingStep.stepIndex, details: { status: status as SupportPlanStepStatus, feedback } });
          }
        }}
        isSaving={updateStepDetails.isPending}
        evaluationData={evaluatingStep}
      />
    </>
  );
};

export default SupportPlanTab;
