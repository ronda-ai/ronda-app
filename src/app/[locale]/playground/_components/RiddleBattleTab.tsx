
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Sparkles,
  Swords,
  Eye,
  EyeOff,
  Trash2,
  Send,
  Crown,
  BookCopy
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
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
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
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useRiddleBattle } from '../_hooks/useRiddleBattle';

const RiddleBattleTab: React.FC = () => {
    const t = useScopedI18n('playground');
    const tRelations = useScopedI18n('relations');
    const locale = useCurrentLocale();

    const {
      topic, setTopic,
      revealedAnswers,
      evaluationState,
      battleToDelete, setBattleToDelete,
      battles, isLoadingBattles,
      generateBattleMutation,
      deleteBattleMutation,
      evaluateBattleMutation,
      handleGenerateBattle,
      toggleAnswer,
      handleEvaluationChange,
      handleSaveEvaluation,
  } = useRiddleBattle();

  const moodOptions = ['competitive', 'fun', 'collaborative', 'tense', 'relaxed'];

    return (
        <>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Swords /> {t('riddleBattle.title')}
                </CardTitle>
                <CardDescription>{t('riddleBattle.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleGenerateBattle} className="flex items-end gap-4">
                    <div className="flex-grow space-y-2">
                        <Label htmlFor="topic">{t('riddleBattle.topicLabel')}</Label>
                        <Input 
                            id="topic"
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                            placeholder={t('riddleBattle.topicPlaceholder')}
                        />
                    </div>
                    <Button type="submit" disabled={generateBattleMutation.isPending}>
                    {generateBattleMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {t('riddleBattle.button')}
                    </Button>
                </form>
                </CardContent>
            </Card>
            <div className="mt-8 space-y-6">
                {isLoadingBattles || generateBattleMutation.isPending ? (
                    <div className="grid md:grid-cols-1 gap-8">
                        <Skeleton className="h-64 w-full" />
                    </div>
                ) : battles.length > 0 ? (
                     <Accordion type="single" collapsible className="w-full space-y-4">
                        {battles.map(battle => (
                            <AccordionItem value={battle.id} key={battle.id} className="border rounded-lg bg-muted/30">
                                <div className="flex justify-between items-center p-4">
                                    <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                                        <div>
                                            <h3 className="font-semibold text-lg text-primary">{t('riddleBattle.battleTitle')}</h3>
                                            {battle.topic && <p className="text-sm text-muted-foreground">{t('riddleBattle.topic')}: <span className="font-medium">{battle.topic}</span></p>}
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {formatDistanceToNow(new Date(battle.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive ml-4" onClick={(e) => {e.stopPropagation(); setBattleToDelete(battle.id)}}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <AccordionContent className="px-4 pb-4 pt-0">
                                    <div className="space-y-4 border-t pt-4">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Card className="border-blue-500 border-2 shadow-blue-100 shadow-lg">
                                                <CardHeader>
                                                    <CardTitle className="text-blue-600">{t('riddleBattle.teamBlue')}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="italic text-lg">"{battle.teamBlueRiddle}"</p>
                                                </CardContent>
                                                <CardFooter className="flex-col items-start gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => toggleAnswer(battle.id, 'teamBlue')}>
                                                        {revealedAnswers[`${battle.id}-teamBlue`] ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
                                                        {revealedAnswers[`${battle.id}-teamBlue`] ? t('riddleBattle.hideAnswer') : t('riddleBattle.showAnswer')}
                                                    </Button>
                                                    <p className={cn("text-blue-800 font-semibold transition-opacity duration-300", revealedAnswers[`${battle.id}-teamBlue`] ? 'opacity-100' : 'opacity-0')}>
                                                        {battle.teamBlueAnswer}
                                                    </p>
                                                </CardFooter>
                                            </Card>
                                            <Card className="border-red-500 border-2 shadow-red-100 shadow-lg">
                                                <CardHeader>
                                                    <CardTitle className="text-red-600">{t('riddleBattle.teamRed')}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="italic text-lg">"{battle.teamRedRiddle}"</p>
                                                </CardContent>
                                                <CardFooter className="flex-col items-start gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => toggleAnswer(battle.id, 'teamRed')}>
                                                        {revealedAnswers[`${battle.id}-teamRed`] ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
                                                        {revealedAnswers[`${battle.id}-teamRed`] ? t('riddleBattle.hideAnswer') : t('riddleBattle.showAnswer')}
                                                    </Button>
                                                    <p className={cn("text-red-800 font-semibold transition-opacity duration-300", revealedAnswers[`${battle.id}-teamRed`] ? 'opacity-100' : 'opacity-0')}>
                                                        {battle.teamRedAnswer}
                                                    </p>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                        <div className="mt-6 border-t pt-4">
                                            <h4 className="font-semibold mb-2">{t('riddleBattle.evaluation.title')}</h4>
                                            {battle.winner ? (
                                                <div className='flex items-center gap-4'>
                                                    <Badge variant="secondary" className="text-base">
                                                        <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                                                        {t('riddleBattle.evaluation.winner')}: {battle.winner === 'teamBlue' ? t('riddleBattle.teamBlue') : battle.winner === 'teamRed' ? t('riddleBattle.teamRed') : t('riddleBattle.evaluation.tie')}
                                                    </Badge>
                                                    {battle.mood && <Badge variant="outline">{t(`riddleBattle.evaluation.moods.${battle.mood}` as any)}</Badge>}
                                                    {battle.feedback && <p className="text-sm italic text-muted-foreground">"{battle.feedback}"</p>}
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex flex-col md:flex-row gap-4">
                                                        <div className='flex-1 space-y-2'>
                                                            <Label>{t('riddleBattle.evaluation.winnerLabel')}</Label>
                                                            <Select value={evaluationState[battle.id]?.winner || ''} onValueChange={value => handleEvaluationChange(battle.id, 'winner', value)}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder={t('riddleBattle.evaluation.winnerPlaceholder')} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="teamBlue">{t('riddleBattle.teamBlue')}</SelectItem>
                                                                    <SelectItem value="teamRed">{t('riddleBattle.teamRed')}</SelectItem>
                                                                    <SelectItem value="tie">{t('riddleBattle.evaluation.tie')}</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className='flex-1 space-y-2'>
                                                            <Label>{t('riddleBattle.evaluation.moodLabel')}</Label>
                                                            <Select value={evaluationState[battle.id]?.mood || ''} onValueChange={value => handleEvaluationChange(battle.id, 'mood', value)}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder={t('riddleBattle.evaluation.moodPlaceholder')} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {moodOptions.map(mood => (
                                                                        <SelectItem key={mood} value={mood}>{t(`riddleBattle.evaluation.moods.${mood}` as any)}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <Label>{t('riddleBattle.evaluation.feedbackLabel')}</Label>
                                                        <div className="flex gap-2">
                                                            <Textarea 
                                                                value={evaluationState[battle.id]?.feedback || ''}
                                                                onChange={e => handleEvaluationChange(battle.id, 'feedback', e.target.value)}
                                                                placeholder={t('riddleBattle.evaluation.feedbackPlaceholder')} rows={2} />
                                                            <Button size="icon" onClick={() => handleSaveEvaluation(battle.id)} disabled={evaluateBattleMutation.isPending}>
                                                                <Send />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                    </Accordion>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                    <BookCopy className="mx-auto h-12 w-12 text-gray-400" />
                    <h4 className="mt-4 text-lg font-semibold">{t('riddleBattle.noBattles.title')}</h4>
                    <p className="mt-2 text-sm">{t('riddleBattle.noBattles.description')}</p>
                    </div>
                )}
            </div>
             <AlertDialog open={!!battleToDelete} onOpenChange={() => setBattleToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('riddleBattle.deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('riddleBattle.deleteDialog.description')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setBattleToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => battleToDelete && deleteBattleMutation.mutate(battleToDelete)} disabled={deleteBattleMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {deleteBattleMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('riddleBattle.evaluation.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
        </>
    );
};

export default RiddleBattleTab;

    