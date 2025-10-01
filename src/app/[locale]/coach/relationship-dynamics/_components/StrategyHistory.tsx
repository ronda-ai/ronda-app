
'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as ShadcnSelect } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { IndividualRelationshipStrategyDTO, IndividualStrategyStepStatus, StrategyStatus } from '@/modules/individual-relationship-strategy/application/dtos/individual-relationship-strategy.dto';
import { RelationshipRemediationDTO, RemediationStatus, RemediationStepStatus } from '@/modules/relationship-remediation/application/dtos/relationship-remediation.dto';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { UseMutationResult } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import {
    BookOpen,
    CheckCircle,
    Circle,
    Expand,
    Loader2,
    Trash2,
    Users,
    XCircle
} from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';


interface StrategyHistoryProps {
    isIndividualMode: boolean;
    selectedStudents: StudentDTO[];
    isLoadingHistory: boolean;
    isLoadingIndividualHistory: boolean;
    history?: RelationshipRemediationDTO[];
    individualHistory?: IndividualRelationshipStrategyDTO[];
    setSelectedRemediation?: (remediation: RelationshipRemediationDTO | null) => void;
    setSelectedIndividualStrategy?: (strategy: IndividualRelationshipStrategyDTO | null) => void;
    setEvaluatingStep: (step: any) => void;
    evaluationState?: Record<string, { status?: RemediationStatus | StrategyStatus; feedback?: string; }>;
    handleEvaluationChange?: (id: string, field: 'status' | 'feedback', value: string) => void;
    handleUpdateRemediation?: (id: string) => void;
    updateRemediationMutation?: UseMutationResult<any, Error, { id: string; data: { status?: RemediationStatus; feedback?: string; }; }, unknown>;
    updateIndividualStrategyMutation?: UseMutationResult<any, Error, { id: string; data: any; }, unknown>;
    strategyToDelete?: string | null;
    setStrategyToDelete?: (id: string | null) => void;
    deleteIndividualStrategyMutation?: UseMutationResult<void, Error, string, unknown>;
    deletingStrategyId?: string | null;
    remediationToDelete?: string | null;
    setRemediationToDelete?: (id: string | null) => void;
    deleteRemediationMutation?: UseMutationResult<void, Error, string, unknown>;
    deletingRemediationId?: string | null;
}

const stepStatusIcons: Record<RemediationStepStatus | IndividualStrategyStepStatus, React.ElementType> = {
  pending: Circle,
  completed: CheckCircle,
  skipped: XCircle,
};

const stepStatusColors: Record<RemediationStepStatus | IndividualStrategyStepStatus, string> = {
  pending: 'text-gray-500',
  completed: 'text-green-500',
  skipped: 'text-red-500',
};

const statusOptions: (RemediationStatus | StrategyStatus)[] = ['not_started', 'in_progress', 'successful', 'partially_successful', 'did_not_work', 'needs_adjustment'];


const StrategyHistory: React.FC<StrategyHistoryProps> = ({
    isIndividualMode,
    selectedStudents,
    isLoadingHistory,
    isLoadingIndividualHistory,
    history,
    individualHistory,
    setSelectedRemediation,
    setSelectedIndividualStrategy,
    setEvaluatingStep,
    evaluationState,
    handleEvaluationChange,
    handleUpdateRemediation,
    updateRemediationMutation,
    updateIndividualStrategyMutation,
    strategyToDelete,
    setStrategyToDelete,
    deleteIndividualStrategyMutation,
    deletingStrategyId,
    remediationToDelete,
    setRemediationToDelete,
    deleteRemediationMutation,
    deletingRemediationId,
}) => {
    const t = useScopedI18n('coach.relationshipLab');
    const tRelations = useScopedI18n('relations');
    const locale = useCurrentLocale();
    
    const historyTitle = isIndividualMode ? t('individual.history.title') : t('history.title');
    const historyDescription = isIndividualMode ? t('individual.history.description') : t('history.description');
    const noResultsTitle = isIndividualMode ? t('individual.history.prompt.title') : t('history.noResults.title');
    const noResultsDescription = isIndividualMode ? t('individual.history.prompt.description') : t('history.noResults.description');
    const promptTitle = isIndividualMode ? t('individual.history.prompt.title') : t('history.prompt.title');
    const promptDescription = isIndividualMode ? t('individual.history.prompt.description') : t('history.prompt.description');
    
    const handleConfirmDelete = () => {
        if (strategyToDelete && deleteIndividualStrategyMutation) {
            deleteIndividualStrategyMutation.mutate(strategyToDelete);
        }
        if (remediationToDelete && deleteRemediationMutation) {
            deleteRemediationMutation.mutate(remediationToDelete);
        }
    };

    const renderIndividualHistory = () => {
      if (isLoadingIndividualHistory) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        );
      }
      return individualHistory && individualHistory.length > 0 ? (
           <Accordion type="single" collapsible className="w-full space-y-4">
                {individualHistory.map(item => (
                    <AccordionItem value={item.id} key={item.id} className="border rounded-lg bg-muted/30">
                        <div className="flex items-center p-4">
                            <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                                <div>
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <div className="flex items-center gap-1 ml-2">
                                <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive" onClick={() => setStrategyToDelete && setStrategyToDelete(item.id)}>
                                    {deletingStrategyId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedIndividualStrategy && setSelectedIndividualStrategy(item as IndividualRelationshipStrategyDTO)}>
                                    <Expand className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                        <AccordionContent className="px-4 pb-4">
                            <div className="prose prose-sm max-w-none text-muted-foreground border-t pt-4">
                                <ReactMarkdown>{item.rationale}</ReactMarkdown>
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-2 mb-4">
                                {item.steps.map((step, index) => {
                                    const StepIcon = stepStatusIcons[step.status] || Circle;
                                    return (
                                        <div key={index}>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="w-full justify-start text-left h-auto p-2"
                                                onClick={() => setEvaluatingStep({ individualStrategy: item, step, stepIndex: index })}
                                            >
                                                <StepIcon
                                                    className={cn(
                                                        'h-5 w-5 mr-3 flex-shrink-0',
                                                        stepStatusColors[step.status]
                                                    )}
                                                />
                                                <span className="flex-grow whitespace-normal text-sm">{step.text}</span>
                                            </Button>
                                            {step.feedback && (
                                                <p className="text-xs text-muted-foreground italic pl-10 pt-1">
                                                {`"${step.feedback}"`}
                                                </p>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-4">
                                <div className='flex-1 space-y-2'>
                                    <Label>{t('history.statusLabel')}</Label>
                                    <ShadcnSelect value={(evaluationState && evaluationState[item.id]?.status) ?? item.status} onValueChange={value => handleEvaluationChange && handleEvaluationChange(item.id, 'status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('history.statusPlaceholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map(status => (
                                                <SelectItem key={status} value={status}>{t(`status.${status}` as any)}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </ShadcnSelect>
                                </div>
                                <Button size="sm" onClick={() => handleUpdateRemediation && handleUpdateRemediation(item.id)} disabled={updateIndividualStrategyMutation?.isPending}>
                                    {updateIndividualStrategyMutation?.isPending && updateIndividualStrategyMutation.variables?.id === item.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                                    {t('history.saveFeedbackButton')}
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
      ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h4 className="mt-4 text-lg font-semibold">{noResultsTitle}</h4>
              <p className="mt-2 text-sm">{noResultsDescription}</p>
          </div>
      )
    }

    const renderGroupHistory = () => {
         if (isLoadingHistory) {
            return (
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            )
        }
        return history && history.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
                {history.map(item => {
                    const titleMatch = item.strategyTitle.match(/###\s*(.*)/);
                    const title = titleMatch ? titleMatch[1] : t('history.header', { focus: `"${item.focus}"` });

                    return (
                        <AccordionItem value={item.id} key={item.id} className="border rounded-lg bg-muted/30">
                            <div className="flex items-center p-4">
                                <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                                    <div>
                                        <h4 className="font-semibold">{title}</h4>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                        </p>
                                    </div>
                                </AccordionTrigger>
                                <div className="flex items-center gap-1 ml-2">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive" onClick={() => setRemediationToDelete && setRemediationToDelete(item.id)}>
                                        {deletingRemediationId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedRemediation && setSelectedRemediation(item)}>
                                        <Expand className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                            <AccordionContent className="px-4 pb-4">
                                <div className="prose prose-sm max-w-none text-muted-foreground border-t pt-4">
                                    <ReactMarkdown>{item.strategyTitle.replace(/###\s*(.*)\n*/, '')}</ReactMarkdown>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-2 mb-4">
                                    {item.steps.map((step, index) => {
                                        const StepIcon = stepStatusIcons[step.status] || Circle;
                                        return (
                                            <div key={index}>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="w-full justify-start text-left h-auto p-2"
                                                    onClick={() => setEvaluatingStep({ remediation: item, step, stepIndex: index })}
                                                >
                                                    <StepIcon
                                                        className={cn(
                                                            'h-5 w-5 mr-3 flex-shrink-0',
                                                            stepStatusColors[step.status]
                                                        )}
                                                    />
                                                    <span className="flex-grow whitespace-normal text-sm">{step.text}</span>
                                                </Button>
                                                {step.feedback && (
                                                    <p className="text-xs text-muted-foreground italic pl-10 pt-1">
                                                    {`"${step.feedback}"`}
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                
                                {handleUpdateRemediation && handleEvaluationChange && updateRemediationMutation && (
                                    <>
                                        <Separator className="my-4" />
                                        <div className="space-y-4">
                                            <div className='flex-1 space-y-2'>
                                                <Label>{t('history.statusLabel')}</Label>
                                                <ShadcnSelect value={(evaluationState && evaluationState[item.id]?.status) ?? item.status} onValueChange={value => handleEvaluationChange(item.id, 'status', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('history.statusPlaceholder')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statusOptions.map(status => (
                                                            <SelectItem key={status} value={status}>{t(`status.${status}` as any)}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </ShadcnSelect>
                                            </div>
                                            <div className='space-y-2'>
                                                <Label>{t('history.feedbackLabel')}</Label>
                                                <Textarea
                                                    value={(evaluationState && evaluationState[item.id]?.feedback) ?? item.feedback ?? ''}
                                                    onChange={e => handleEvaluationChange(item.id, 'feedback', e.target.value)}
                                                    placeholder={t('history.feedbackPlaceholder')} rows={2} />
                                            </div>
                                            <Button size="sm" onClick={() => handleUpdateRemediation(item.id)} disabled={updateRemediationMutation.isPending}>
                                                {updateRemediationMutation.isPending && updateRemediationMutation.variables?.id === item.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                                                {t('history.saveFeedbackButton')}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h4 className="mt-4 text-lg font-semibold">{t('history.noResults.title')}</h4>
                <p className="mt-2 text-sm">{t('history.noResults.description')}</p>
            </div>
        );
    }
    

    const renderContent = () => {
        if (selectedStudents.length === 0) {
            return (
                 <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h4 className="mt-4 text-lg font-semibold">{promptTitle}</h4>
                    <p className="mt-2 text-sm">{promptDescription}</p>
                </div>
            )
        }
        
        return isIndividualMode ? renderIndividualHistory() : renderGroupHistory();
    }


    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>{historyTitle}</CardTitle>
                <CardDescription>{historyDescription}</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                {renderContent()}
            </CardContent>

             <AlertDialog open={!!strategyToDelete || !!remediationToDelete} onOpenChange={() => { setStrategyToDelete && setStrategyToDelete(null); setRemediationToDelete && setRemediationToDelete(null); }}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('individual.deleteDialog.title')}</AlertDialogTitle>
                    <AlertDialogDescription>
                    {t('individual.deleteDialog.description')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => { setStrategyToDelete && setStrategyToDelete(null); setRemediationToDelete && setRemediationToDelete(null); }}>{tRelations('cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                        type="button"
                        onClick={handleConfirmDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={deleteIndividualStrategyMutation?.isPending || deleteRemediationMutation?.isPending}
                    >
                        {(deleteIndividualStrategyMutation?.isPending || deleteRemediationMutation?.isPending) ? <Loader2 className="h-4 w-4 animate-spin" /> : (t('individual.deleteDialog.confirm'))}
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
}

export default StrategyHistory;
