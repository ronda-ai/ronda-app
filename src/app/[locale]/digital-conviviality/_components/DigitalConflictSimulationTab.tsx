
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Sparkles,
  ShieldAlert,
  Trash2,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useDigitalConviviality } from '../_hooks/useDigitalConviviality';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

const DigitalConflictSimulationTab: React.FC = () => {
    const t = useScopedI18n('playground.digitalConviviality.conflictSimulation');
    const tRelations = useScopedI18n('relations');
    const locale = useCurrentLocale();

    const {
        conflictTopics, setConflictTopics,
        scenarios,
        isLoadingScenarios,
        scenarioToDelete,
        setScenarioToDelete,
        generateConflictScenarioMutation,
        deleteScenarioMutation,
        handleGenerateConflictScenario,
    } = useDigitalConviviality();

    const isGenerating = generateConflictScenarioMutation.isPending;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldAlert /> {t('title')}
                    </CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleGenerateConflictScenario} className="flex flex-col md:flex-row items-end gap-4">
                        <div className="flex-grow space-y-2">
                            <Label htmlFor="conflict-topics">{t('topicsLabel')}</Label>
                            <Input 
                                id="conflict-topics"
                                value={conflictTopics}
                                onChange={e => setConflictTopics(e.target.value)}
                                placeholder={t('topicsPlaceholder')}
                            />
                        </div>
                        <Button type="submit" disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {t('button')}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-8">
                <h3 className="text-2xl font-semibold tracking-tight mb-6">{t('history.title')}</h3>
                {isLoadingScenarios ? (
                    <Skeleton className="h-96 w-full" />
                ) : scenarios.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {scenarios.map((item) => (
                           <AccordionItem value={item.id} key={item.id} className="border rounded-lg bg-muted/30">
                                <div className="flex justify-between items-center p-4">
                                     <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                                         <div>
                                            <p className="font-semibold text-lg text-foreground">{item.title}</p>
                                            <div className="flex items-center flex-wrap gap-2 mt-2">
                                              {item.topics?.map(topic => <Badge key={topic} variant="outline">{topic}</Badge>)}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                     <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive" onClick={(e) => {e.stopPropagation(); setScenarioToDelete(item.id)}}>
                                        {deleteScenarioMutation.isPending && deleteScenarioMutation.variables === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <AccordionContent className="px-4 pb-4 pt-0">
                                     <div className="space-y-6 border-t pt-4">
                                        <p className="italic text-muted-foreground">"{item.scenario}"</p>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{t('strategiesTitle')}</h4>
                                            <div className="mt-2 space-y-3">
                                                {item.strategies.map((strategy, index) => (
                                                    <div key={index} className="p-3 border rounded-md bg-background">
                                                        <p className="font-medium text-primary">{strategy.name}</p>
                                                        <p className="text-sm mt-1">{strategy.description}</p>
                                                        <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">
                                                            <strong>{t('outcomeLabel')}:</strong> {strategy.simulatedOutcome}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                     </div>
                                </AccordionContent>
                           </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                        <ShieldAlert className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold">{t('noScenario.title')}</h4>
                        <p className="mt-2 text-sm">{t('noScenario.description')}</p>
                    </div>
                )}
            </div>
            <AlertDialog open={!!scenarioToDelete} onOpenChange={open => !open && setScenarioToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('deleteDialog.description')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setScenarioToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {if(scenarioToDelete) deleteScenarioMutation.mutate(scenarioToDelete)}} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteScenarioMutation.isPending}>
                            {deleteScenarioMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : t('deleteDialog.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DigitalConflictSimulationTab;
