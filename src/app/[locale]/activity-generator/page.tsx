
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Lightbulb,
  Loader2,
  BookCopy,
  Send,
  Wand,
  Trash2,
  PlusCircle,
  FileDown,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import withAuth from '@/components/withAuth';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CurriculumActivityDTO } from '@/modules/curriculum-activity/application/dtos/curriculum-activity.dto';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DashboardLayout from '@/components/DashboardLayout';
import ResourceDemocratizerDialog from '@/components/ResourceDemocratizerDialog';
import { useActivityGenerator, Complexity, Duration, LearningModality, SocialDynamic, BloomLevel, ResourceConstraint } from './_hooks/useActivityGenerator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AddSkillDialog from '@/components/AddSkillDialog';
import { cn } from '@/lib/utils';
import EditSkillDialog from '@/components/EditSkillDialog';
import { encode } from 'html-entities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


function ActivityGeneratorPage() {
  const tActivity = useScopedI18n('activityGenerator');
  const tSkills = useScopedI18n('activityGenerator.skills');
  const tModalities = useScopedI18n('activityGenerator.modalities');
  const tRelations = useScopedI18n('relations');
  const tCoach = useScopedI18n('coach');
  const locale = useCurrentLocale();

  const {
    topic,
    setTopic,
    selectedSkills,
    handleSkillChange,
    complexity,
    setComplexity,
    duration,
    setDuration,
    learningModality,
    setLearningModality,
    socialDynamic,
    setSocialDynamic,
    bloomLevel,
    setBloomLevel,
    resourceConstraints,
    handleResourceConstraintChange,
    feedbackValues,
    setFeedbackValues,
    adaptingPlan,
    setAdaptingPlan,
    deletingPlanId,
    setDeletingPlanId,
    aiConfig,
    isLoadingConfig,
    activityHistory,
    isLoadingHistory,
    availableSkills,
    isLoadingSkills,
    generateActivitiesMutation,
    addFeedbackMutation,
    deleteActivityMutation,
    handleAddFeedback,
    handleSubmit,
    isAddSkillDialogOpen,
    setIsAddSkillDialogOpen,
    handleOpenAddSkillDialog,
    isEditMode,
    handleToggleEditMode,
    editingSkill,
    setEditingSkill,
    generateTopicSuggestionMutation,
    handleGenerateTopicSuggestion,
  } = useActivityGenerator();
  
  const complexityOptions: { value: Complexity, label: string }[] = [
      { value: 'beginner', label: tActivity('form.complexities.beginner') },
      { value: 'intermediate', label: tActivity('form.complexities.intermediate') },
      { value: 'advanced', label: tActivity('form.complexities.advanced') },
  ];
  
  const durationOptions: { value: Duration, label: string }[] = [
      { value: 'short', label: tActivity('form.durations.short') },
      { value: 'medium', label: tActivity('form.durations.medium') },
      { value: 'long', label: tActivity('form.durations.long') },
  ];
  
  const learningModalityOptions: { value: LearningModality, label: string }[] = [
      { value: 'kinesthetic', label: tActivity('form.learningModalities.kinesthetic') },
      { value: 'visual', label: tActivity('form.learningModalities.visual') },
      { value: 'auditory', label: tActivity('form.learningModalities.auditory') },
      { value: 'logical', label: tActivity('form.learningModalities.logical') },
  ];

  const socialDynamicOptions: { value: SocialDynamic, label: string }[] = [
      { value: 'cooperative', label: tActivity('form.socialDynamics.cooperative') },
      { value: 'competitive', label: tActivity('form.socialDynamics.competitive') },
  ];

  const bloomLevelOptions: { value: BloomLevel, label: string }[] = [
      { value: 'Remembering', label: tActivity('form.bloomLevels.Remembering') },
      { value: 'Understanding', label: tActivity('form.bloomLevels.Understanding') },
      { value: 'Applying', label: tActivity('form.bloomLevels.Applying') },
      { value: 'Analyzing', label: tActivity('form.bloomLevels.Analyzing') },
      { value: 'Evaluating', label: tActivity('form.bloomLevels.Evaluating') },
      { value: 'Creating', label: tActivity('form.bloomLevels.Creating') },
  ];

  const resourceConstraintOptions: { id: ResourceConstraint, label: string }[] = [
    { id: 'digital-tools', label: tActivity('form.resourceConstraints.digital-tools') },
    { id: 'outdoor-space', label: tActivity('form.resourceConstraints.outdoor-space') },
    { id: 'basic-supplies', label: tActivity('form.resourceConstraints.basic-supplies') },
  ];

  const handleDownloadActivityPlan = (plan: CurriculumActivityDTO) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${encode(tActivity('history.header', { topic: `"${plan.topic}"`}))}</title>
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
          .skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; list-style-type: none; }
          .skills-list li { background-color: #eee; padding: 0.2rem 0.7rem; border-radius: 1rem; font-size: 0.9rem; }
        </style>
      </head>
      <body>
        <h1>${encode(tActivity('history.header', { topic: `"${plan.topic}"`}))}</h1>
        <div class="meta-info">
          <p><strong>${tActivity('form.topicLabel')}:</strong> ${encode(plan.topic)}</p>
          <p><strong>${tActivity('form.skillsLabel')}:</strong></p>
          <ul class="skills-list">
            ${plan.skills.map(skill => `<li>${encode(skill)}</li>`).join('')}
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
    const safeFilename = plan.topic.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.setAttribute('href', url);
    link.setAttribute('download', `actividades_${safeFilename}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <DashboardLayout>
      <div className="flex-1 overflow-hidden grid md:grid-cols-3">
        <div className="md:col-span-1 p-8 border-r overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>{tActivity('form.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingConfig ? (
                <Skeleton className="h-64 w-full" />
              ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="topic">{tActivity('form.topicLabel')}</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateTopicSuggestion}
                            disabled={generateTopicSuggestionMutation.isPending}
                        >
                            {generateTopicSuggestionMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                            {tActivity('form.suggestButton')}
                        </Button>
                    </div>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={tActivity('form.topicPlaceholder')}
                    required
                  />
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
                  <ScrollArea className="h-48">
                    {isLoadingSkills ? (
                      <div className="space-y-2 pr-4"><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-full" /></div>
                    ): availableSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2 pr-4">
                        {availableSkills.map((skill) => (
                            isEditMode ? (
                                <Button
                                    key={skill.id}
                                    type="button"
                                    variant="ghost"
                                    className={cn("h-auto p-1.5 justify-start text-left text-sm font-medium animate-jiggle bg-accent/50 hover:bg-accent")}
                                    onClick={() => setEditingSkill(skill)}
                                >
                                    {skill.name}
                                </Button>
                            ) : (
                                <div key={skill.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={skill.id}
                                        checked={selectedSkills.has(skill.name)}
                                        onCheckedChange={() => handleSkillChange(skill.name)}
                                    />
                                    <label
                                        htmlFor={skill.id}
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
                            <p className="text-sm">{tActivity('form.noSkills')}</p>
                            <Button variant="link" size="sm" onClick={handleOpenAddSkillDialog}>{tActivity('form.addSkills')}</Button>
                        </div>
                    )}
                  </ScrollArea>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="complexity">{tActivity('form.complexityLabel')}</Label>
                        <Select value={complexity} onValueChange={v => setComplexity(v as Complexity)}>
                            <SelectTrigger id="complexity">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {complexityOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="duration">{tActivity('form.durationLabel')}</Label>
                        <Select value={duration} onValueChange={v => setDuration(v as Duration)}>
                            <SelectTrigger id="duration">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {durationOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                 </div>
                <div className="space-y-2">
                    <Label htmlFor="learningModality">{tActivity('form.learningModality')}</Label>
                    <Select value={learningModality} onValueChange={v => setLearningModality(v as LearningModality | 'any')}>
                        <SelectTrigger id="learningModality"><SelectValue placeholder={tActivity('form.selectPlaceholder')} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">{tActivity('form.any')}</SelectItem>
                            {learningModalityOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="bloomLevel">{tActivity('form.bloomLevel')}</Label>
                    <Select value={bloomLevel} onValueChange={v => setBloomLevel(v as BloomLevel | 'any')}>
                        <SelectTrigger id="bloomLevel"><SelectValue placeholder={tActivity('form.selectPlaceholder')} /></SelectTrigger>
                        <SelectContent>
                             <SelectItem value="any">{tActivity('form.any')}</SelectItem>
                             {bloomLevelOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="socialDynamic">{tActivity('form.socialDynamic')}</Label>
                    <Select value={socialDynamic} onValueChange={v => setSocialDynamic(v as SocialDynamic | 'any')}>
                        <SelectTrigger id="socialDynamic"><SelectValue placeholder={tActivity('form.selectPlaceholder')} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">{tActivity('form.any')}</SelectItem>
                            {socialDynamicOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>{tActivity('form.resourceConstraints.title')}</Label>
                    <div className="flex flex-col gap-2 pt-2">
                        {resourceConstraintOptions.map(opt => (
                            <div key={opt.id} className="flex items-center space-x-2">
                                <Checkbox id={opt.id} checked={resourceConstraints.has(opt.id)} onCheckedChange={() => handleResourceConstraintChange(opt.id)} />
                                <Label htmlFor={opt.id} className="font-normal">{opt.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={generateActivitiesMutation.isPending || !topic.trim() || selectedSkills.size === 0}
                >
                  {generateActivitiesMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Lightbulb className="mr-2 h-4 w-4" />
                  )}
                  {tActivity('form.generateButton')}
                </Button>
              </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 p-8 overflow-y-auto">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{tActivity('history.title')}</CardTitle>
              <CardDescription>{tActivity('history.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(96vh-220px)] pr-4">
              {isLoadingHistory ? (
                  <div className="space-y-4">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                  </div>
              ) : activityHistory.length > 0 ? (
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {activityHistory.map((historyItem: CurriculumActivityDTO) => (
                    <AccordionItem value={historyItem.id} key={historyItem.id} className="border rounded-lg bg-muted/30">
                        <div className="flex justify-between items-center p-4">
                          <AccordionTrigger className="flex-1 hover:no-underline p-0">
                              <div className='text-left'>
                                  <h4 className="font-semibold text-lg">
                                      {tActivity('history.header', { topic: `"${historyItem.topic}"`})}
                                  </h4>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                      {historyItem.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                  </div>
                              </div>
                          </AccordionTrigger>
                           <div className="flex items-center ml-2">
                              <Button variant="ghost" size="icon" className="text-primary hover:text-destructive" onClick={() => handleDownloadActivityPlan(historyItem)}>
                                  <FileDown className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-primary hover:text-destructive" onClick={() => setAdaptingPlan(historyItem)}>
                                  <Wand className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeletingPlanId(historyItem.id)} disabled={deleteActivityMutation.isPending && deleteActivityMutation.variables === historyItem.id}>
                                  {deleteActivityMutation.isPending && deleteActivityMutation.variables === historyItem.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                              </Button>
                              <p className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                                  {formatDistanceToNow(new Date(historyItem.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                              </p>
                          </div>
                      </div>
                      <AccordionContent className="px-4 pb-4 pt-0">
                        <div className="pt-4 space-y-4">
                              {historyItem.activities.map((activity, index) => (
                                <Card key={index} className="overflow-hidden bg-background">
                                  <CardHeader className="flex-row items-center justify-between p-4 bg-muted/50 border-b">
                                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                                      <Badge variant="outline">{tModalities(activity.modality as any)}</Badge>
                                  </CardHeader>
                                  <CardContent className="p-4">
                                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                                  </CardContent>
                                </Card>
                              ))}
                              <Separator />
                              <div>
                                <h4 className="font-semibold text-sm mb-2">
                                  {tActivity('history.feedbackTitle')}
                                </h4>
                                {historyItem.feedback ? (
                                  <p className="text-sm italic text-muted-foreground">
                                    {`"${historyItem.feedback}"`}
                                  </p>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Textarea
                                      placeholder={tActivity('history.feedbackPlaceholder')}
                                      value={feedbackValues[historyItem.id] || ''}
                                      onChange={e =>
                                        setFeedbackValues(prev => ({
                                          ...prev,
                                          [historyItem.id]: e.target.value,
                                        }))
                                      }
                                      rows={2}
                                    />
                                    <Button
                                      size="icon"
                                      onClick={() => handleAddFeedback(historyItem.id)}
                                      disabled={addFeedbackMutation.isPending}
                                    >
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
                  <h4 className="mt-4 text-lg font-semibold">{tActivity('results.noResults.title')}</h4>
                  <p className="mt-2 text-sm">{tActivity('results.noResults.description')}</p>
                </div>
              )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      <ResourceDemocratizerDialog
        isOpen={!!adaptingPlan}
        onClose={() => setAdaptingPlan(null)}
        curriculumActivity={adaptingPlan}
      />
      <AlertDialog
        open={!!deletingPlanId}
        onOpenChange={(open) => !open && setDeletingPlanId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tActivity('history.deleteDialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>{tActivity('history.deleteDialog.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingPlanId(null)}>
              {tRelations('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingPlanId) {
                  deleteActivityMutation.mutate(deletingPlanId);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteActivityMutation.isPending}
            >
              {deleteActivityMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {tCoach('supportPlan.deleteDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AddSkillDialog 
        isOpen={isAddSkillDialogOpen}
        onClose={() => setIsAddSkillDialogOpen(false)}
        existingSkills={availableSkills.map(s => s.name)}
      />
      <EditSkillDialog
        isOpen={!!editingSkill}
        onClose={() => setEditingSkill(null)}
        skill={editingSkill}
      />
    </DashboardLayout>
  );
}

export default withAuth(ActivityGeneratorPage, ['teacher']);
