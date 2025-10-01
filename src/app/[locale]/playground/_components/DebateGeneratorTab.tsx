
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Sparkles,
  Lightbulb,
  Trash2,
  Scale,
  Play,
  TowerControl,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useDebateGenerator, DebateComplexity } from '../_hooks/useDebateGenerator';
import DebateSessionDialog from './DebateSessionDialog';


const DebateGeneratorTab: React.FC = () => {
    const t = useScopedI18n('playground');
    const tRelations = useScopedI18n('relations');
    const locale = useCurrentLocale();

    const {
      topic: debateTopic, setTopic: setDebateTopic,
      complexity, setComplexity,
      debateToDelete, setDebateToDelete,
      debates, isLoadingDebates,
      generateDebateMutation,
      deleteDebateMutation,
      handleGenerateDebate,
      generateTopicSuggestionMutation,
      startSessionMutation,
      stopSessionMutation,
      liveSessionData,
      setLiveSessionData,
      students,
  } = useDebateGenerator();

  const complexityOptions: { value: DebateComplexity, label: string }[] = [
      { value: 'beginner', label: t('debateGenerator.complexities.beginner') },
      { value: 'intermediate', label: t('debateGenerator.complexities.intermediate') },
      { value: 'advanced', label: t('debateGenerator.complexities.advanced') },
  ];
  
    return (
        <>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Scale /> {t('debateGenerator.title')}
                </CardTitle>
                <CardDescription>{t('debateGenerator.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleGenerateDebate} className="flex flex-col md:flex-row items-end gap-4">
                    <div className="flex-grow space-y-2">
                        <Label htmlFor="debate-topic">{t('debateGenerator.topicLabel')}</Label>
                        <div className='flex gap-2'>
                            <Input 
                                id="debate-topic"
                                value={debateTopic}
                                onChange={e => setDebateTopic(e.target.value)}
                                placeholder={t('debateGenerator.topicPlaceholder')}
                            />
                            <Button variant="outline" size="icon" type="button" onClick={() => generateTopicSuggestionMutation.mutate()} disabled={generateTopicSuggestionMutation.isPending}>
                                 {generateTopicSuggestionMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="complexity">{t('debateGenerator.complexityLabel')}</Label>
                        <Select value={complexity} onValueChange={v => setComplexity(v as DebateComplexity)}>
                            <SelectTrigger id="complexity" className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {complexityOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" disabled={generateDebateMutation.isPending}>
                        {generateDebateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        {t('debateGenerator.button')}
                    </Button>
                </form>
                </CardContent>
            </Card>
            <div className="mt-8 space-y-6">
                 {isLoadingDebates || generateDebateMutation.isPending ? (
                    <div className="grid md:grid-cols-1 gap-8">
                        <Skeleton className="h-64 w-full" />
                    </div>
                ) : debates.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {debates.map(debate => (
                             <AccordionItem value={debate.id} key={debate.id} className="border rounded-lg bg-muted/30">
                                <div className="flex justify-between items-center p-4">
                                    <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                                        <div>
                                            <h3 className="font-semibold text-lg text-primary">{debate.topic}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {formatDistanceToNow(new Date(debate.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                     <div className="flex items-center gap-1">
                                        <Button 
                                            variant={debate.status === 'live' ? 'secondary' : 'outline'}
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (debate.status === 'live' && debate.liveId) {
                                                    setLiveSessionData({ debateId: debate.id, liveId: debate.liveId });
                                                } else {
                                                    startSessionMutation.mutate(debate.id);
                                                }
                                            }}
                                            disabled={startSessionMutation.isPending}
                                        >
                                            {startSessionMutation.isPending && startSessionMutation.variables === debate.id ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : debate.status === 'live' ? (
                                                <TowerControl className="mr-2 h-4 w-4" />
                                            ) : (
                                                <Play className="mr-2 h-4 w-4" />
                                            )}
                                            {debate.status === 'live' ? t('debateGenerator.manageSession') : t('debateGenerator.startSession')}
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive" onClick={(e) => {e.stopPropagation(); setDebateToDelete(debate.id)}}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                 <AccordionContent className="px-4 pb-4 pt-0">
                                    <div className="space-y-6 border-t pt-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                                <h4 className="font-semibold text-green-800">{t('debateGenerator.affirmativeStance')}</h4>
                                                <p className="text-sm text-green-700 mt-1">{debate.affirmativeStance}</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                                <h4 className="font-semibold text-red-800">{t('debateGenerator.negativeStance')}</h4>
                                                <p className="text-sm text-red-700 mt-1">{debate.negativeStance}</p>
                                            </div>
                                        </div>
                                         <div>
                                            <h4 className="font-semibold text-foreground">{t('debateGenerator.guidingQuestions')}</h4>
                                            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                                                {debate.guidingQuestions.map((q, i) => <li key={i}>{q}</li>)}
                                            </ul>
                                         </div>
                                         <div>
                                            <h4 className="font-semibold text-foreground">{t('debateGenerator.rules')}</h4>
                                            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                                                {debate.rules.map((r, i) => <li key={i}>{r}</li>)}
                                            </ul>
                                         </div>
                                    </div>
                                 </AccordionContent>
                             </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                     <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                        <Scale className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold">{t('debateGenerator.noDebates.title')}</h4>
                        <p className="mt-2 text-sm">{t('debateGenerator.noDebates.description')}</p>
                    </div>
                )}
            </div>
             <AlertDialog open={!!debateToDelete} onOpenChange={(open) => !open && setDebateToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('debateGenerator.deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('debateGenerator.deleteDialog.description')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDebateToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => debateToDelete && deleteDebateMutation.mutate(debateToDelete)} disabled={deleteDebateMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {deleteDebateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('riddleBattle.evaluation.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DebateSessionDialog
                isOpen={!!liveSessionData}
                onClose={() => setLiveSessionData(null)}
                sessionData={liveSessionData}
                stopSessionMutation={stopSessionMutation}
                students={students}
            />
        </>
    );
};

export default DebateGeneratorTab;
