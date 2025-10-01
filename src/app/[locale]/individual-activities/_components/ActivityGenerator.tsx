
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Lightbulb, PlusCircle, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useIndividualActivities } from '../_hooks/useIndividualActivities';
import { useScopedI18n } from '@/locales/client';

interface ActivityGeneratorProps {
    hooks: ReturnType<typeof useIndividualActivities>;
}

const ActivityGenerator: React.FC<ActivityGeneratorProps> = ({ hooks }) => {
    const {
        selectedStudent,
        topic, setTopic,
        skills,
        themes, setThemes,
        customPrompt, setCustomPrompt,
        negativePrompt, setNegativePrompt,
        generateSuggestionsMutation,
        generateActivitiesMutation,
        handleGenerateSuggestions,
        handleGenerateActivities,
        availableSkills,
        isLoadingSkills,
        handleSkillChange,
        isEditMode,
        handleToggleEditMode,
        setEditingSkill,
        handleOpenAddSkillDialog
    } = hooks;

    const tIndividualActivity = useScopedI18n('individualActivities');
    const tActivity = useScopedI18n('activityGenerator');

    return (
        <Card>
            <CardHeader>
                <CardTitle>{tIndividualActivity('generator.title', { name: selectedStudent?.name })}</CardTitle>
                <CardDescription>{tIndividualActivity('generator.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="topic">{tIndividualActivity('generator.topicLabel')}</Label>
                        <Button variant="outline" size="sm" onClick={handleGenerateSuggestions} disabled={generateSuggestionsMutation.isPending}>
                            {generateSuggestionsMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                            {tIndividualActivity('suggestions.button')}
                        </Button>
                    </div>
                    <Input id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder={tIndividualActivity('generator.topicPlaceholder')} />
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label>{tActivity('form.skillsLabel')}</Label>
                        <div className='flex items-center'>
                          <Button type='button' variant='ghost' size='icon' className='h-6 w-6' onClick={handleOpenAddSkillDialog}>
                              <PlusCircle className='h-5 w-5 text-primary' />
                          </Button>
                           <Button type='button' variant='ghost' size='icon' className='h-6 w-6' onClick={handleToggleEditMode} data-active={isEditMode}>
                              <Trash2 className={cn('h-5 w-5', isEditMode ? 'text-destructive' : 'text-primary')} />
                          </Button>
                        </div>
                    </div>
                    <ScrollArea className="h-48 border rounded-md p-4">
                        {isLoadingSkills ? (
                            <div className="space-y-2 pr-4"><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-full" /></div>
                        ): availableSkills.length > 0 ? (
                        <div className="flex flex-col gap-2 pr-4">
                            {availableSkills.map((skill) => (
                                isEditMode ? (
                                    <Button
                                        key={skill.id}
                                        type="button"
                                        variant="ghost"
                                        className="h-auto p-1.5 justify-start text-left text-sm font-medium animate-jiggle bg-accent/50 hover:bg-accent"
                                        onClick={() => setEditingSkill(skill)}
                                    >
                                        {skill.name}
                                    </Button>
                                ) : (
                                    <div key={skill.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`individual-${skill.id}`}
                                            checked={skills.has(skill.name)}
                                            onCheckedChange={() => handleSkillChange(skill.name)}
                                        />
                                        <label
                                            htmlFor={`individual-${skill.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        {skill.name}
                                        </label>
                                    </div>
                                )
                            ))}
                        </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                              <p className="text-sm">{tIndividualActivity('generator.noSkills')}</p>
                              <Button variant="link" size="sm" onClick={handleOpenAddSkillDialog}>{tIndividualActivity('generator.addSkills')}</Button>
                          </div>
                        )}
                    </ScrollArea>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="themes">{tIndividualActivity('generator.themesLabel')}</Label>
                    <Input id="themes" value={themes} onChange={e => setThemes(e.target.value)} placeholder={tIndividualActivity('generator.themesPlaceholder')} />
                </div>
                <Separator />
                <div className="space-y-2">
                    <Label htmlFor="customPrompt">{tIndividualActivity('generator.customPromptLabel')}</Label>
                    <Textarea id="customPrompt" value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} placeholder={tIndividualActivity('generator.customPromptPlaceholder')} rows={2}/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="negativePrompt">{tIndividualActivity('generator.negativePromptLabel')}</Label>
                    <Textarea id="negativePrompt" value={negativePrompt} onChange={e => setNegativePrompt(e.target.value)} placeholder={tIndividualActivity('generator.negativePromptPlaceholder')} rows={2}/>
                </div>

                <Button 
                    onClick={handleGenerateActivities} 
                    disabled={!topic || generateActivitiesMutation.isPending}
                    className="w-full"
                    size="lg"
                >
                    {generateActivitiesMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {tIndividualActivity('generator.generateButton')}
                </Button>
            </CardContent>
        </Card>
    );
}

export default ActivityGenerator;
