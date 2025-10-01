
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  BookCopy,
  Trash2,
  Sparkles,
  PlusCircle,
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
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ReactMarkdown from 'react-markdown';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePbl } from '../_hooks/usePbl';
import { PblProjectDTO } from '@/modules/pbl/application/dtos/pbl.dto';
import AddSkillDialog from '@/components/AddSkillDialog';
import { cn } from '@/lib/utils';
import EditSkillDialog from '@/components/EditSkillDialog';

interface ProjectPlannerProps {
    hooks: ReturnType<typeof usePbl>;
}

const ProjectPlanner: React.FC<ProjectPlannerProps> = ({ hooks }) => {
    const tPbl = useScopedI18n('pbl');
    const tRelations = useScopedI18n('relations');
    const locale = useCurrentLocale();
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

    const {
        topic, setTopic,
        selectedSkills, handleSkillChange,
        duration, setDuration,
        generateProjectMutation,
        handlePhase1Submit,
        availableSkills, isLoadingSkills,
        projectHistory, isLoadingHistory,
        deleteProjectMutation,
        isAddSkillDialogOpen,
        setIsAddSkillDialogOpen,
        isEditMode,
        handleToggleEditMode,
        editingSkill,
        setEditingSkill,
    } = hooks;

    const isGenerating = generateProjectMutation.isPending;
    const isDeleting = deleteProjectMutation.isPending;

    const handleDeleteProject = () => {
        if (projectToDelete) {
          deleteProjectMutation.mutate(projectToDelete);
          setProjectToDelete(null);
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{tPbl('phase1.form.title')}</CardTitle>
                    <CardDescription>{tPbl('phase1.form.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePhase1Submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="topic">{tPbl('phase1.form.topicLabel')}</Label>
                            <Input
                                id="topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder={tPbl('phase1.form.topicPlaceholder')}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label>{tPbl('phase1.form.skillsLabel')}</Label>
                                <div className='flex items-center'>
                                  <Button type='button' variant='ghost' size='icon' className='h-6 w-6' onClick={() => setIsAddSkillDialogOpen(true)}>
                                      <PlusCircle className='h-5 w-5 text-primary' />
                                  </Button>
                                   <Button type='button' variant='ghost' size='icon' className='h-6 w-6' onClick={handleToggleEditMode} data-active={isEditMode}>
                                      <Trash2 className={cn('h-5 w-5', isEditMode ? 'text-destructive' : 'text-primary')} />
                                  </Button>
                                </div>
                            </div>
                            <ScrollArea className="h-40 border rounded-md p-4">
                                {isLoadingSkills ? (
                                    <div className="space-y-2 pr-4"><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-full" /></div>
                                ) : availableSkills.length > 0 ? (
                                    <div className="flex flex-col gap-2 pr-4">
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
                                                        id={`pbl-${skill.id}`}
                                                        checked={selectedSkills.has(skill.name)}
                                                        onCheckedChange={() => handleSkillChange(skill.name)}
                                                    />
                                                    <label
                                                        htmlFor={`pbl-${skill.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                    {skill.name}
                                                    </label>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">{tPbl('phase1.form.noSkills')}</p>
                                )}
                            </ScrollArea>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">{tPbl('phase1.form.durationLabel')}</Label>
                            <Select value={duration} onValueChange={setDuration}>
                                <SelectTrigger id="duration">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1-week">{tPbl('phase1.form.durations.oneWeek')}</SelectItem>
                                    <SelectItem value="2-weeks">{tPbl('phase1.form.durations.twoWeeks')}</SelectItem>
                                    <SelectItem value="1-month">{tPbl('phase1.form.durations.oneMonth')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="w-full" disabled={isGenerating || !topic.trim() || selectedSkills.size === 0}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {tPbl('phase1.form.generateButton')}
                        </Button>
                    </form>
                  </CardContent>
                </Card>
                {isGenerating && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{tPbl('phase1.generating.title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </CardContent>
                    </Card>
                )}
            </div>
              
            <div className="overflow-y-auto">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{tPbl('history.title')}</CardTitle>
                    <CardDescription>{tPbl('history.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-220px)] pr-4">
                      {isLoadingHistory ? (
                        <div className="space-y-4"><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /></div>
                      ) : projectHistory.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full space-y-4">
                          {projectHistory.map((project: PblProjectDTO) => (
                            <AccordionItem value={project.id} key={project.id} className="border rounded-lg bg-muted/30">
                              <div className="flex justify-between items-center p-4">
                                <AccordionTrigger className="flex-1 text-left hover:no-underline p-0">
                                  <div>
                                    <h4 className="font-semibold text-lg">{project.topic}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                    </p>
                                  </div>
                                </AccordionTrigger>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive shrink-0" onClick={() => setProjectToDelete(project.id)}>
                                    {isDeleting && projectToDelete === project.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                                </Button>
                              </div>
                              <AccordionContent className="px-4 pb-4 pt-0">
                                <div className="pt-4 space-y-4 border-t">
                                    <blockquote className="border-l-4 pl-4 italic">"{project.essentialQuestion}"</blockquote>
                                    <div>
                                        <h5 className="font-semibold mb-2">{tPbl('history.phases')}</h5>
                                        <ReactMarkdown className="prose prose-sm max-w-none">{project.phases}</ReactMarkdown>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h5 className="font-semibold mb-2">{tPbl('history.milestones')}</h5>
                                        <ReactMarkdown className="prose prose-sm max-w-none">{project.milestones}</ReactMarkdown>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h5 className="font-semibold mb-2">{tPbl('history.finalProduct')}</h5>
                                        <ReactMarkdown className="prose prose-sm max-w-none">{project.finalProductSuggestion}</ReactMarkdown>
                                    </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                          <BookCopy className="mx-auto h-12 w-12 text-gray-400" />
                          <h4 className="mt-4 text-lg font-semibold">{tPbl('history.noResults.title')}</h4>
                          <p className="mt-2 text-sm">{tPbl('history.noResults.description')}</p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
                 <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{tPbl('history.deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{tPbl('history.deleteDialog.description')}</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setProjectToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteProject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={isDeleting}>
                          {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          {tRelations('save')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
            </div>
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
        </div>
    );
}

export default ProjectPlanner;
