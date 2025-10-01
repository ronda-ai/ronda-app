
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Sparkles,
  MessageCircleHeart,
  Trash2,
  BookOpen,
  Target,
  ListOrdered,
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
import { useDigitalConviviality, ActivityType } from '../_hooks/useDigitalConviviality';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const DigitalCitizenshipActivitiesTab: React.FC = () => {
    const t = useScopedI18n('playground.digitalConviviality');
    const tRelations = useScopedI18n('relations');
    const tActivityTypes = useScopedI18n('playground.digitalConviviality.types');
    const locale = useCurrentLocale();

    const {
        activityType,
        setActivityType,
        customPrompt,
        setCustomPrompt,
        activityToDelete,
        setActivityToDelete,
        activities,
        isLoadingActivities,
        generateActivityMutation,
        deleteActivityMutation,
        handleGenerateActivity,
    } = useDigitalConviviality();

  const activityTypeOptions: { value: ActivityType, label: string }[] = [
      { value: 'netiquette-challenge', label: t('types.netiquette-challenge') },
      { value: 'digital-collaboration', label: t('types.digital-collaboration') },
      { value: 'positive-messaging', label: t('types.positive-messaging') },
  ];
  
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageCircleHeart /> {t('activities.title')}
                </CardTitle>
                <CardDescription>{t('activities.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleGenerateActivity} className="flex flex-col md:flex-row items-end gap-4">
                    <div className="flex-grow space-y-2">
                        <Label htmlFor="activity-type">{t('typeLabel')}</Label>
                        <Select value={activityType} onValueChange={v => setActivityType(v as ActivityType)}>
                            <SelectTrigger id="activity-type">
                                <SelectValue placeholder={t('typePlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                {activityTypeOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-grow space-y-2">
                        <Label htmlFor="custom-prompt">{t('customPromptLabel')}</Label>
                        <Input 
                            id="custom-prompt"
                            value={customPrompt}
                            onChange={e => setCustomPrompt(e.target.value)}
                            placeholder={t('customPromptPlaceholder')}
                        />
                    </div>
                    <Button type="submit" disabled={generateActivityMutation.isPending || !activityType}>
                        {generateActivityMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        {t('button')}
                    </Button>
                </form>
                </CardContent>
            </Card>
            <div className="mt-8 space-y-6">
                <h3 className="text-2xl font-semibold tracking-tight">{t('history.title')}</h3>
                {isLoadingActivities ? (
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : activities.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {activities.map(activity => (
                            <AccordionItem value={activity.id} key={activity.id} className="border rounded-lg bg-muted/30">
                                <div className="flex justify-between items-center p-4">
                                    <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                                        <div>
                                            <h3 className="font-semibold text-lg text-primary">{activity.title}</h3>
                                            <div className="flex items-center flex-wrap gap-2 mt-2">
                                                <Badge variant="secondary">{tActivityTypes(activity.activityType as any)}</Badge>
                                                {activity.customPrompt && <Badge variant="outline">{activity.customPrompt}</Badge>}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="text-destructive/70 hover:text-destructive" 
                                        onClick={(e) => {e.stopPropagation(); setActivityToDelete(activity.id)}}
                                        disabled={deleteActivityMutation.isPending && deleteActivityMutation.variables === activity.id}
                                    >
                                        {deleteActivityMutation.isPending && deleteActivityMutation.variables === activity.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <AccordionContent className="px-4 pb-4 pt-0">
                                    <div className="space-y-4 border-t pt-4">
                                        <p className="text-sm text-muted-foreground italic">{activity.introduction}</p>
                                        <Separator />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" />{t('history.pedagogicalObjectives')}</h4>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {activity.pedagogicalObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2"><Target className="h-4 w-4 text-primary" />{t('history.materials')}</h4>
                                                {activity.materials && activity.materials.length > 0 ? (
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {activity.materials.map((mat, i) => <li key={i}>{mat}</li>)}
                                                    </ul>
                                                ) : <p className="text-muted-foreground text-xs">{t('history.noMaterials')}</p>}
                                            </div>
                                        </div>
                                        <Separator />
                                         <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><ListOrdered className="h-4 w-4 text-primary" />{t('history.steps')}</h4>
                                            <ol className="list-decimal pl-5 space-y-2">
                                                {activity.steps.map((step, i) => <li key={i}>{step}</li>)}
                                            </ol>
                                         </div>

                                        <Separator />
                                        <div className="p-4 rounded-lg bg-background border">
                                            <h4 className="font-semibold text-foreground">{t('history.studentInstructions')}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">{activity.studentInstructions}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                        <MessageCircleHeart className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold">{t('noActivities.title')}</h4>
                        <p className="mt-2 text-sm">{t('noActivities.description')}</p>
                    </div>
                )}
            </div>
            <AlertDialog open={!!activityToDelete} onOpenChange={(open) => !open && setActivityToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('deleteDialog.description')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setActivityToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => activityToDelete && deleteActivityMutation.mutate(activityToDelete)} disabled={deleteActivityMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {deleteActivityMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {t('deleteDialog.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DigitalCitizenshipActivitiesTab;
