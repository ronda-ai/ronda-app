
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  BookCopy,
  Sparkles,
  Swords,
  Eye,
  EyeOff,
  Trash2,
  Send,
  Crown,
  Zap,
  Play,
  Pause,
  RotateCcw,
  BookHeart,
  PlusCircle,
  MessageSquarePlus,
  Lightbulb,
  FileText,
  CheckCircle,
  Image as ImageIcon,
  Volume2,
  Theater,
  Scale,
  TowerControl
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
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import TestPreviewModal from './TestPreviewModal';
import { useCollaborativeStory, TestType } from '../_hooks/useCollaborativeStory';
import { CollaborativeStoryDTO } from '@/modules/collaborative-story/application/dtos/collaborative-story.dto';
import { TestDTO } from '@/modules/test/application/dtos/test.dto';

const CollaborativeStoryTab: React.FC = () => {
    const t = useScopedI18n('playground');
    const tRelations = useScopedI18n('relations');
    const locale = useCurrentLocale();

     const {
      activeStory, setActiveStory,
      characters, setCharacters,
      setting, setSetting,
      chapterLength, setChapterLength,
      allowDialogues, setAllowDialogues,
      studentContribution, setStudentContribution,
      currentContributions,
      storyToDelete, setStoryToDelete,
      isGeneratingTest,
      generatedTest,
      isTestModalOpen, setIsTestModalOpen,
      testType, setTestType,
      stories, isLoadingStories,
      storyMutation,
      storyStartersMutation,
      contributionSuggestionMutation,
      deleteStoryMutation,
      generateTestMutation,
      illustrationMutation,
      narrateFullStoryMutation,
      handleStartStory,
      handleContinueStory,
      handleAddContribution,
      handleRemoveContribution,
      handleNewStory,
      handleFinishStory,
      handleGenerateTest,
      handleGenerateIllustration,
      illustratingChapter,
      handlePlayChapter,
      playingChapterIndex,
      narratorVoice,
      setNarratorVoice,
      customPrompt,
      setCustomPrompt,
      negativePrompt,
      setNegativePrompt,
  } = useCollaborativeStory();

  const narratorVoices = ['Algenib', 'Achernar', 'Achird', 'Algieba', 'Alnilam', 'Aoede', 'Autonoe', 'Callirrhoe', 'Charon', 'Despina', 'Enceladus', 'Erinome', 'Fenrir', 'Gacrux', 'Iapetus', 'Kore', 'Laomedeia', 'Leda', 'Orus', 'Puck', 'Pulcherrima', 'Rasalgethi', 'Sadachbia', 'Sadaltager', 'Schedar', 'Sulafat', 'Umbriel', 'Vindemiatrix', 'Zephyr', 'Zubenelgenubi'];

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>{t('collaborativeStory.setup.title')}</CardTitle>
                                <CardDescription>{t('collaborativeStory.setup.description')}</CardDescription>
                            </div>
                            <Button variant="outline" size="icon" onClick={() => storyStartersMutation.mutate()} disabled={storyStartersMutation.isPending || !!activeStory}>
                                <Lightbulb className={cn(storyStartersMutation.isPending && 'animate-pulse')} />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="characters">{t('collaborativeStory.setup.charactersLabel')}</Label>
                            <Input id="characters" value={characters} onChange={e => setCharacters(e.target.value)} placeholder={t('collaborativeStory.setup.charactersPlaceholder')} disabled={!!activeStory} />
                        </div>
                        <div>
                            <Label htmlFor="setting">{t('collaborativeStory.setup.settingLabel')}</Label>
                            <Input id="setting" value={setting} onChange={e => setSetting(e.target.value)} placeholder={t('collaborativeStory.setup.settingPlaceholder')} disabled={!!activeStory} />
                        </div>
                        <div>
                            <Label htmlFor="narratorVoice">{t('collaborativeStory.setup.narratorVoiceLabel')}</Label>
                            <Select value={narratorVoice} onValueChange={setNarratorVoice} disabled={!!activeStory}>
                                <SelectTrigger id="narratorVoice">
                                    <SelectValue placeholder={t('collaborativeStory.setup.narratorVoicePlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {narratorVoices.map(voice => (
                                        <SelectItem key={voice} value={voice}>{voice}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div>
                            <Label htmlFor="chapter-length">{t('collaborativeStory.setup.lengthLabel')}</Label>
                            <Select value={chapterLength} onValueChange={(v) => setChapterLength(v as any)} disabled={!!activeStory}>
                                <SelectTrigger id="chapter-length">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="short">{t('collaborativeStory.setup.lengths.short')}</SelectItem>
                                    <SelectItem value="medium">{t('collaborativeStory.setup.lengths.medium')}</SelectItem>
                                    <SelectItem value="long">{t('collaborativeStory.setup.lengths.long')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customPrompt">{t('collaborativeStory.setup.customPromptLabel')}</Label>
                            <Textarea id="customPrompt" value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} placeholder={t('collaborativeStory.setup.customPromptPlaceholder')} rows={2} disabled={!!activeStory}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="negativePrompt">{t('collaborativeStory.setup.negativePromptLabel')}</Label>
                            <Textarea id="negativePrompt" value={negativePrompt} onChange={e => setNegativePrompt(e.target.value)} placeholder={t('collaborativeStory.setup.negativePromptPlaceholder')} rows={2} disabled={!!activeStory}/>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="allow-dialogues" checked={allowDialogues} onCheckedChange={(checked) => setAllowDialogues(Boolean(checked))} disabled={!!activeStory} />
                            <Label htmlFor="allow-dialogues">{t('collaborativeStory.setup.allowDialogues')}</Label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleStartStory} disabled={!characters || !setting || !!activeStory || storyMutation.isPending}>
                            {storyMutation.isPending && !activeStory ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                            {t('collaborativeStory.setup.startButton')}
                        </Button>
                    </CardFooter>
                </Card>
                {activeStory && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('collaborativeStory.contribute.title')}</CardTitle>
                            <CardDescription>{t('collaborativeStory.contribute.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {currentContributions.map((contrib, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded-md">
                                        <span>{contrib}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => handleRemoveContribution(i)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Input value={studentContribution} onChange={e => setStudentContribution(e.target.value)} placeholder={t('collaborativeStory.contribute.placeholder')} disabled={activeStory.isFinished} />
                                 <Button variant="ghost" size="icon" onClick={() => contributionSuggestionMutation.mutate()} disabled={activeStory.isFinished || contributionSuggestionMutation.isPending}>
                                    <Lightbulb className={cn(contributionSuggestionMutation.isPending && 'animate-pulse')} />
                                 </Button>
                                <Button size="icon" onClick={handleAddContribution} disabled={activeStory.isFinished}><PlusCircle /></Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 items-stretch">
                            <Button onClick={handleContinueStory} disabled={currentContributions.length === 0 || storyMutation.isPending || activeStory.isFinished}>
                                {storyMutation.isPending && !!activeStory ? <Loader2 className="mr-2 animate-spin" /> : <MessageSquarePlus className="mr-2" />}
                                {t('collaborativeStory.contribute.continueButton')}
                            </Button>
                            {!activeStory.isFinished ? (
                                <Button onClick={handleFinishStory} variant="secondary" disabled={storyMutation.isPending}>
                                    <CheckCircle className="mr-2" />
                                    {t('collaborativeStory.finishButton')}
                                </Button>
                            ) : (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="default" className='bg-green-600 hover:bg-green-700'>
                                            <FileText className="mr-2" />
                                            {t('collaborativeStory.test.createButton')}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{t('collaborativeStory.test.modalTitle')}</DialogTitle>
                                            <DialogDescription>{t('collaborativeStory.test.modalDescription')}</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <Label htmlFor="test-type">{t('collaborativeStory.test.typeLabel')}</Label>
                                            <Select value={testType} onValueChange={(v) => setTestType(v as any)}>
                                                <SelectTrigger id="test-type">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="multiple-choice">{t('collaborativeStory.test.types.multiple-choice')}</SelectItem>
                                                    <SelectItem value="true-false">{t('collaborativeStory.test.types.true-false')}</SelectItem>
                                                    <SelectItem value="open-ended">{t('collaborativeStory.test.types.open-ended')}</SelectItem>
                                                    <SelectItem value="mixed">{t('collaborativeStory.test.types.mixed')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button onClick={handleGenerateTest} disabled={isGeneratingTest} className='w-full'>
                                                {isGeneratingTest ? <Loader2 className="mr-2 animate-spin"/> : <Sparkles className="mr-2"/>}
                                                {t('collaborativeStory.test.generateButton')}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                             <Button onClick={handleNewStory} variant="outline">
                                {t('collaborativeStory.newStoryButton')}
                            </Button>
                        </CardFooter>
                    </Card>
                )}
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('collaborativeStory.history.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoadingStories ? (
                            <Skeleton className="h-20 w-full" />
                        ) : stories.length > 0 ? (
                            <div className="space-y-2">
                                {stories.map(story => (
                                    <div key={story.id} className="flex justify-between items-center p-2 rounded-md hover:bg-accent">
                                        <button className="text-left flex-1" onClick={() => setActiveStory(story)}>
                                            <p className="font-medium">{story.title}</p>
                                            <p className="text-xs text-muted-foreground">{t('collaborativeStory.history.createdAt')} {formatDistanceToNow(new Date(story.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}</p>
                                        </button>
                                         <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive" onClick={() => setStoryToDelete(story.id)} disabled={deleteStoryMutation.isPending && deleteStoryMutation.variables === story.id}>
                                            {deleteStoryMutation.isPending && deleteStoryMutation.variables === story.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">{t('collaborativeStory.history.noStories')}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="min-h-[300px]">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{activeStory ? activeStory.title : t('collaborativeStory.story.titlePlaceholder')}</CardTitle>
                           {activeStory?.isFinished && (
                                activeStory.fullStoryAudioUrl ? (
                                    <audio controls src={`/api/audio/${activeStory.fullStoryAudioUrl}`} className="h-8 max-w-xs" />
                                ) : (
                                    <Button size="sm" onClick={() => narrateFullStoryMutation.mutate(activeStory.id)} disabled={narrateFullStoryMutation.isPending}>
                                        {narrateFullStoryMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Theater className="mr-2 h-4 w-4" />}
                                        {t('collaborativeStory.narrateFullStoryButton')}
                                    </Button>
                                )
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                        {storyMutation.isPending && !activeStory ? <Loader2 className="animate-spin" /> : (
                            activeStory ? (
                                 activeStory.chapters.map((chapter, index) => (
                                     <div key={index} className="space-y-2">
                                         <h4 className='font-bold text-lg text-foreground'>Chapter {chapter.number}: {chapter.title}</h4>
                                         <ReactMarkdown>{chapter.text}</ReactMarkdown>
                                         {chapter.illustration ? (
                                             <div className="relative aspect-video rounded-lg overflow-hidden border my-4">
                                                 <Image src={chapter.illustration} alt={`Illustration for chapter ${index + 1}`} fill className="object-cover" />
                                             </div>
                                         ) : (
                                            <Button 
                                                variant="outline" size="sm" 
                                                onClick={() => handleGenerateIllustration(index)}
                                                disabled={illustrationMutation.isPending}
                                            >
                                                {illustrationMutation.isPending && illustratingChapter === index ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <ImageIcon className="mr-2 h-4 w-4" />
                                                )}
                                                {t('collaborativeStory.illustrateButton')}
                                            </Button>
                                         )}
                                         <div className="flex items-center gap-2">
                                            <Button 
                                                variant="outline" size="sm" 
                                                onClick={() => handlePlayChapter(index)}
                                                disabled={!chapter.audioUrl}
                                            >
                                                {!chapter.audioUrl ? (
                                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('collaborativeStory.narrateButton--loading')}</>
                                                ) : (
                                                    <><Volume2 className="mr-2 h-4 w-4" />{t('collaborativeStory.narrateButton')}</>
                                                )}
                                            </Button>
                                         </div>
                                         {playingChapterIndex === index && chapter.audioUrl && (
                                            <audio controls autoPlay src={`/api/audio/${chapter.audioUrl}`} onEnded={() => handlePlayChapter(index)} className="w-full mt-2">
                                                Your browser does not support the audio element.
                                            </audio>
                                         )}
                                     </div>
                                 ))
                            ) : <p>{t('collaborativeStory.story.storyPlaceholder')}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
             <AlertDialog open={!!storyToDelete} onOpenChange={() => setStoryToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('collaborativeStory.deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('collaborativeStory.deleteDialog.description')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setStoryToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => storyToDelete && deleteStoryMutation.mutate(storyToDelete)} disabled={deleteStoryMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {deleteStoryMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : tRelations('save')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
               <TestPreviewModal
                isOpen={isTestModalOpen}
                onClose={() => setIsTestModalOpen(false)}
                test={generatedTest}
              />
        </div>
    );
};

export default CollaborativeStoryTab;

    