
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Send,
  Trash2,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { useLightningRound, ChallengeCategory } from '../_hooks/useLightningRound';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';


function GameScreen({ student, challenge }: { student: string, challenge: string }) {
    const t = useScopedI18n('playground.lightningRound.gameScreen');
    return (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
                {student}
            </h2>
            <p className="mt-8 text-4xl font-semibold text-foreground">
                {t('yourTurn')}
            </p>
            <p className="mt-4 text-5xl font-bold text-primary animate-bounce">
                {challenge}
            </p>
        </div>
    )
}

const LightningRoundTab: React.FC = () => {
    const t = useScopedI18n('playground');
    const tRelations = useScopedI18n('relations');
    const locale = useCurrentLocale();

     const {
      gameDuration, setGameDuration,
      challengeInterval, setChallengeInterval,
      challengeCategory, setChallengeCategory,
      customPrompt: lightningCustomPrompt, setCustomPrompt: setLightningCustomPrompt,
      negativePrompt: lightningNegativePrompt, setNegativePrompt: setLightningNegativePrompt,
      isGameRunning,
      isPaused,
      timeLeft,
      gamePlan,
      history: lightningHistory,
      isLoadingHistory: isLoadingLightningHistory,
      roundToDelete, setRoundToDelete,
      lightningRoundMutation,
      updateRoundMutation,
      deleteRoundMutation,
      handleStartGame,
      handleStopGame,
      handlePauseGame,
      canStartLightningRound,
      feedbackValues,
      setFeedbackValues,
  } = useLightningRound();

  const challengeCategoryOptions: { value: ChallengeCategory, label: string }[] = [
      { value: 'sound', label: t('lightningRound.categories.sound') },
      { value: 'face', label: t('lightningRound.categories.face') },
      { value: 'gesture', label: t('lightningRound.categories.gesture') },
      { value: 'imitation', label: t('lightningRound.categories.imitation') },
  ];

  const currentChallenge = isGameRunning && gamePlan.length > 0 && timeLeft < gameDuration ? gamePlan[Math.floor((gameDuration - timeLeft) / challengeInterval)] : null;


    return (
        <>
        {currentChallenge && <GameScreen student={currentChallenge.studentName} challenge={currentChallenge.challenge} />}
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('lightningRound.title')}</CardTitle>
                        <CardDescription>{t('lightningRound.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    {isGameRunning ? (
                            <div className="space-y-4 text-center">
                                <p className="text-6xl font-bold font-mono text-primary">{timeLeft}</p>
                                <div className="flex justify-center gap-4">
                                    <Button onClick={handlePauseGame} variant="outline" size="lg">
                                        {isPaused ? <Play className="mr-2"/> : <Pause className="mr-2"/>}
                                        {isPaused ? t('lightningRound.resume') : t('lightningRound.pause')}
                                    </Button>
                                    <Button onClick={handleStopGame} variant="destructive" size="lg">
                                        <RotateCcw className="mr-2"/>
                                        {t('lightningRound.reset')}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label htmlFor="duration">{t('lightningRound.durationLabel')}</Label>
                                        <Input id="duration" type="number" value={gameDuration} onChange={e => setGameDuration(Number(e.target.value))} min="10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="interval">{t('lightningRound.intervalLabel')}</Label>
                                        <Input id="interval" type="number" value={challengeInterval} onChange={e => setChallengeInterval(Number(e.target.value))} min="2" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">{t('lightningRound.categoryLabel')}</Label>
                                        <Select value={challengeCategory} onValueChange={v => setChallengeCategory(v as ChallengeCategory)}>
                                            <SelectTrigger id="category">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {challengeCategoryOptions.map(opt => (
                                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="lightningCustomPrompt">{t('collaborativeStory.setup.customPromptLabel')}</Label>
                                    <Textarea id="lightningCustomPrompt" value={lightningCustomPrompt} onChange={e => setLightningCustomPrompt(e.target.value)} placeholder={t('collaborativeStory.setup.customPromptPlaceholder')} rows={2}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lightningNegativePrompt">{t('collaborativeStory.setup.negativePromptLabel')}</Label>
                                    <Textarea id="lightningNegativePrompt" value={lightningNegativePrompt} onChange={e => setLightningNegativePrompt(e.target.value)} placeholder={t('collaborativeStory.setup.negativePromptPlaceholder')} rows={2}/>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        {!isGameRunning && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span tabIndex={canStartLightningRound ? undefined : 0}>
                                            <Button onClick={handleStartGame} size="lg" className="w-full" disabled={lightningRoundMutation.isPending || !canStartLightningRound}>
                                                {lightningRoundMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2" />}
                                                {t('lightningRound.start')}
                                            </Button>
                                        </span>
                                    </TooltipTrigger>
                                    {!canStartLightningRound && (
                                        <TooltipContent>
                                            <p>{t('lightningRound.noStudentsError')}</p>
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </CardFooter>
                </Card>
            </div>
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('lightningRound.history.title')}</CardTitle>
                        <CardDescription>{t('lightningRound.history.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         {isLoadingLightningHistory ? (
                            <Skeleton className="h-40 w-full" />
                        ) : lightningHistory.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full space-y-2">
                                {lightningHistory.map(round => (
                                    <AccordionItem value={round.id} key={round.id} className="border rounded-md px-3">
                                         <div className="flex items-center">
                                            <AccordionTrigger>
                                                {t('lightningRound.history.roundFor', { date: formatDistanceToNow(new Date(round.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS }) })}
                                            </AccordionTrigger>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive shrink-0" onClick={() => setRoundToDelete(round.id)}>
                                                {deleteRoundMutation.isPending && roundToDelete === round.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4"/>}
                                            </Button>
                                         </div>
                                        <AccordionContent>
                                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                                {round.plan.map((p, i) => <li key={i}><strong>{p.studentName}:</strong> {p.challenge}</li>)}
                                            </ul>
                                             <div className="mt-4 border-t pt-3">
                                                <Label htmlFor={`feedback-${round.id}`}>{t('riddleBattle.evaluation.feedbackLabel')}</Label>
                                                {round.feedback ? (
                                                    <p className="text-sm italic text-muted-foreground mt-1">"{round.feedback}"</p>
                                                ) : (
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Textarea
                                                            id={`feedback-${round.id}`}
                                                            value={feedbackValues[round.id] || ''}
                                                            onChange={e => setFeedbackValues(prev => ({...prev, [round.id]: e.target.value}))}
                                                            placeholder={t('riddleBattle.evaluation.feedbackPlaceholder')}
                                                            rows={2}
                                                        />
                                                        <Button size="icon" onClick={() => updateRoundMutation.mutate({id: round.id, feedback: feedbackValues[round.id] || ''})} disabled={updateRoundMutation.isPending}>
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
                             <p className="text-sm text-muted-foreground text-center py-4">{t('lightningRound.history.noRounds')}</p>
                        )}
                    </CardContent>
                 </Card>
            </div>
        </div>
        <AlertDialog open={!!roundToDelete} onOpenChange={() => setRoundToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('lightningRound.deleteDialog.title')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('lightningRound.deleteDialog.description')}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setRoundToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => roundToDelete && deleteRoundMutation.mutate(roundToDelete)} disabled={deleteRoundMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        {deleteRoundMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : tRelations('save')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
}

export default LightningRoundTab;

    