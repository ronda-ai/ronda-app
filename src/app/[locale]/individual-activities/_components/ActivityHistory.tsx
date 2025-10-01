
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, BookCopy, Trash2, Send, Wand, FileDown, Circle, CheckCircle2, CircleDot, XCircle } from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useIndividualActivities } from '../_hooks/useIndividualActivities';
import { PersonalizedActivityDTO, PersonalizedActivityStepStatus } from '@/modules/personalized-activity/application/dtos/personalized-activity.dto';
import { encode } from 'html-entities';


interface ActivityHistoryProps {
    hooks: ReturnType<typeof useIndividualActivities>;
}

const statusIcons: Record<PersonalizedActivityStepStatus, React.ElementType> = {
  pending: Circle,
  completed: CheckCircle2,
  'in-progress': CircleDot,
  skipped: XCircle,
};

const statusColors: Record<PersonalizedActivityStepStatus, string> = {
  pending: 'text-gray-500',
  completed: 'text-green-500',
  'in-progress': 'text-yellow-500',
  skipped: 'text-red-500',
};

const ActivityHistory: React.FC<ActivityHistoryProps> = ({ hooks }) => {
    const {
        history,
        isLoadingHistory,
        selectedStudent,
        deletingPlanId, setDeletingPlanId,
        deleteActivityMutation,
        setAdaptingPlan,
        feedbackValues, setFeedbackValues,
        handleAddFeedback,
        addFeedbackMutation,
        setEvaluatingStep
    } = hooks;

    const tIndividualActivity = useScopedI18n('individualActivities');
    const tActivity = useScopedI18n('activityGenerator');
    const tModalities = useScopedI18n('activityGenerator.modalities');
    const tCoach = useScopedI18n('coach');
    const locale = useCurrentLocale();

    const handleDownloadIndividualPlan = (plan: PersonalizedActivityDTO) => {
        if (!selectedStudent) return;

        const htmlContent = `
          <!DOCTYPE html>
          <html lang="${locale}">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${encode(tIndividualActivity('history.title'))} para ${encode(selectedStudent.name)}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
              h1, h2, h3 { color: #222; }
              h1 { font-size: 1.8rem; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
              h2 { font-size: 1.4rem; color: #333; margin-top: 2rem; border-left: 4px solid #8A2BE2; padding-left: 0.8rem; }
              .meta-info { background-color: #f9f9f9; border: 1px solid #eee; border-radius: 8px; padding: 1rem; margin-bottom: 2rem; }
              .meta-info p { margin: 0 0 0.5rem 0; }
              .meta-info strong { color: #555; }
              .activity-card { border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1.5rem; overflow: hidden; }
              .activity-header { background-color: #f2f2f2; padding: 0.8rem 1rem; display: flex; justify-content: space-between; align-items: center; }
              .activity-header h3 { margin: 0; font-size: 1.2rem; }
              .activity-modality { background-color: #e6e6fa; color: #4B0082; padding: 0.2rem 0.6rem; border-radius: 1rem; font-size: 0.8rem; font-weight: bold; }
              .activity-content { padding: 1rem; }
              .skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; list-style-type: none; margin-top: 0.5rem; }
              .skills-list li { background-color: #eee; padding: 0.2rem 0.7rem; border-radius: 1rem; font-size: 0.9rem; }
            </style>
          </head>
          <body>
            <h1>${encode(tIndividualActivity('history.title'))} para ${encode(selectedStudent.name)}</h1>
            <div class="meta-info">
              <p><strong>${tActivity('form.topicLabel')}:</strong> ${encode(plan.topic)}</p>
              <p><strong>${tActivity('form.skillsLabel')}:</strong></p>
              <ul class="skills-list">
                ${plan.skills.map(skill => `<li>${encode(skill)}</li>`).join('')}
              </ul>
               <p><strong>${tIndividualActivity('generator.themesLabel')}:</strong></p>
               <ul class="skills-list">
                ${plan.themes.map(theme => `<li>${encode(theme)}</li>`).join('')}
              </ul>
            </div>
            ${plan.activities.map(activity => `
              <div class="activity-card">
                <div class="activity-header">
                  <h3>${encode(activity.title)}</h3>
                  <span class="activity-modality">${encode(tModalities(activity.modality as any))}</span>
                </div>
                <div class="activity-content">
                  <p>${encode(activity.description)}</p>
                </div>
              </div>
            `).join('')}
          </body>
          </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const safeFilename = `${plan.topic.substring(0, 20)}_${selectedStudent.name}`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.setAttribute('href', url);
        link.setAttribute('download', `plan_${safeFilename}.html`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{tIndividualActivity('history.title')}</CardTitle>
                    <CardDescription>{tIndividualActivity('history.description', { name: selectedStudent?.name })}</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingHistory ? <Skeleton className="h-32 w-full" /> : history.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full space-y-4">
                        {history.map((plan) => (
                            <AccordionItem value={plan.id} key={plan.id} className="border rounded-lg bg-muted/30">
                                <div className="flex justify-between items-center p-4">
                                    <AccordionTrigger className="flex-1 p-0 hover:no-underline">
                                        <div>
                                            <h4 className="font-semibold text-lg">
                                                {tActivity('history.header', { topic: `"${plan.topic}"`})}
                                            </h4>
                                            <p className="text-xs text-muted-foreground text-left mt-1">
                                                {formatDistanceToNow(new Date(plan.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <div className="flex items-center ml-2">
                                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary" onClick={() => handleDownloadIndividualPlan(plan)}>
                                            <FileDown className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary" onClick={() => setAdaptingPlan(plan)}>
                                            <Wand className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="text-destructive hover:text-destructive"
                                          onClick={() => setDeletingPlanId(plan.id)}
                                          disabled={deleteActivityMutation.isPending && deleteActivityMutation.variables === plan.id}
                                        >
                                          {deleteActivityMutation.isPending && deleteActivityMutation.variables === plan.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                          ) : (
                                            <Trash2 className="h-4 w-4" />
                                          )}
                                        </Button>
                                    </div>
                                </div>
                                <AccordionContent className="px-4 pb-4 pt-0">
                                    <div className="pt-4 space-y-4">
                                        <div className="space-y-3">
                                        {plan.activities.map((activity, index) => {
                                            const StatusIcon = statusIcons[activity.status] || Circle;
                                            return (
                                            <div key={index}>
                                              <Card className="overflow-hidden bg-background">
                                                  <CardHeader className="flex-row items-center justify-between p-4 bg-muted/50 border-b">
                                                      <div className="flex items-center gap-3">
                                                        <CardTitle className="text-md">{activity.title}</CardTitle>
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{tModalities(activity.modality as any)}</Badge>
                                                          <Button variant="ghost" size="sm" className="h-auto p-1" onClick={() => setEvaluatingStep({ plan, step: activity, stepIndex: index })}>
                                                            <StatusIcon className={cn('h-4 w-4', statusColors[activity.status])} />
                                                          </Button>
                                                      </div>
                                                  </CardHeader>
                                                  <CardContent className="p-4">
                                                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                                                        {activity.feedback && (
                                                        <p className="text-xs text-muted-foreground italic pt-2 mt-2 border-t">
                                                          {`"${activity.feedback}"`}
                                                        </p>
                                                      )}
                                                  </CardContent>
                                              </Card>
                                            </div>
                                          )})}
                                        </div>

                                        <Separator />
                                        <div>
                                            <h4 className="font-semibold text-sm mb-2">{tActivity('history.feedbackTitle')}</h4>
                                            {plan.feedback ? (
                                                <p className="text-sm italic text-muted-foreground">{`"${plan.feedback}"`}</p>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                <Textarea
                                                    placeholder={tActivity('history.feedbackPlaceholder')}
                                                    value={feedbackValues[plan.id] || ''}
                                                    onChange={e => setFeedbackValues(prev => ({ ...prev, [plan.id]: e.target.value }))}
                                                    rows={2}
                                                />
                                                <Button size="icon" onClick={() => handleAddFeedback(plan.id)} disabled={addFeedbackMutation.isPending}>
                                                    <Send />
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
                          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                            <BookCopy className="mx-auto h-12 w-12 text-gray-400" />
                            <h4 className="mt-4 text-lg font-semibold">{tIndividualActivity('history.noResults.title')}</h4>
                            <p className="mt-2 text-sm">{tIndividualActivity('history.noResults.description')}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={!!deletingPlanId} onOpenChange={() => setDeletingPlanId(null)}>
              <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle>{tIndividualActivity('history.deleteDialog.title')}</AlertDialogTitle>
                      <AlertDialogDescription>{tIndividualActivity('history.deleteDialog.description')}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setDeletingPlanId(null)}>{useScopedI18n('relations')('cancel')}</AlertDialogCancel>
                      <AlertDialogAction onClick={() => { if (deletingPlanId) { deleteActivityMutation.mutate(deletingPlanId); } }}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          disabled={deleteActivityMutation.isPending}>
                          {deleteActivityMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : tCoach('supportPlan.deleteDialog.confirm')}
                      </AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default ActivityHistory;
