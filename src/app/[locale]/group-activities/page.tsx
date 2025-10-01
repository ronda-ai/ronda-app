

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Sparkles,
  BookCopy,
  Lightbulb,
  Users,
  AlertTriangle,
  Trash2,
  Plus,
  Wand,
  FileDown,
  Eye,
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
import withAuth from '@/components/withAuth';
import { Skeleton } from '@/components/ui/skeleton';
import Select from 'react-select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DashboardLayout from '@/components/DashboardLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
import ResourceDemocratizerDialog from '@/components/ResourceDemocratizerDialog';
import { useGroupActivities } from './_hooks/useGroupActivities';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import GroupActivityDetailsDialog from './_components/GroupActivityDetailsDialog';
import { ManualGroupActivityDTO } from '@/modules/manual-group-activity/application/dtos/manual-group-activity.dto';
import { encode } from 'html-entities';

function GroupActivitiesPage() {
  const tGroupActivity = useScopedI18n('groupActivities');
  const tRelations = useScopedI18n('relations');
  const locale = useCurrentLocale();
  const tTools = useScopedI18n('tools');

  const {
    allStudents,
    isLoadingStudents,
    suggestions,
    isLoadingSuggestions,
    manualGroups,
    isLoadingManualGroups,
    selectedStudents,
    setSelectedStudents,
    analysisForGroup,
    suggestionToDelete,
    setSuggestionToDelete,
    adaptingGroup,
    setAdaptingGroup,
    viewingGroup,
    setViewingGroup,
    generateSuggestionMutation,
    analyzeGroupDynamicsMutation,
    generateGroupActivityMutation,
    createManualGroupMutation,
    updateManualGroupMutation,
    deleteManualGroupMutation,
    deleteSuggestionMutation,
    studentOptions,
    selectedStudentOptions,
    conflictWarning,
    handleCreateGroup,
    handleUseSuggestion,
    handleRemoveGroup,
    handleGroupInputChange,
    handleGenerateActivity,
    handleDeleteActivities,
  } = useGroupActivities();

  const isGenerating = generateSuggestionMutation.isPending;

  const handleDownloadGroupPlan = (group: ManualGroupActivityDTO) => {
    if (!group.activities) return;
    const members = group.members.map(m => m.name).join(', ');
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${encode(tGroupActivity('manualMode.groupTitle'))}: ${encode(members)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
          h1, h2, h3 { color: #222; }
          h1 { font-size: 1.8rem; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
          h2 { font-size: 1.4rem; color: #333; margin-top: 2rem; border-left: 4px solid #8A2BE2; padding-left: 0.8rem; }
          .meta-info { background-color: #f9f9f9; border: 1px solid #eee; border-radius: 8px; padding: 1rem; margin-bottom: 2rem; }
          .meta-info p { margin: 0 0 0.5rem 0; }
          .meta-info strong { color: #555; }
          .activity-card { border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1.5rem; overflow: hidden; }
          .activity-header { background-color: #f2f2f2; padding: 0.8rem 1rem; }
          .activity-header h3 { margin: 0; font-size: 1.2rem; }
          .activity-content { padding: 1rem; }
        </style>
      </head>
      <body>
        <h1>${encode(tGroupActivity('manualMode.groupTitle'))}: ${encode(members)}</h1>
        <div class="meta-info">
          <p><strong>${tGroupActivity('manualMode.skillsLabel')}:</strong> ${encode(group.skills?.join(', '))}</p>
          <p><strong>${tGroupActivity('manualMode.themesLabel')}:</strong> ${encode(group.themes?.join(', '))}</p>
        </div>
        ${group.activities.map(activity => `
          <div class="activity-card">
            <div class="activity-header">
              <h3>${encode(activity.title)}</h3>
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
    const safeFilename = `actividades_${members.substring(0, 20).replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
    link.setAttribute('href', url);
    link.setAttribute('download', safeFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{tGroupActivity('manualMode.title')}</CardTitle>
              <CardDescription>
                {tGroupActivity('manualMode.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingStudents ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="flex flex-col md:flex-row items-end gap-4">
                  <div className="w-full md:flex-grow space-y-2">
                    <label htmlFor="student-select">
                      {tGroupActivity('manualMode.selectLabel')}
                    </label>
                    <Select
                      isMulti
                      options={studentOptions}
                      value={selectedStudentOptions}
                      onChange={selected =>
                        setSelectedStudents(selected.map(s => s.value))
                      }
                      placeholder={tGroupActivity('manualMode.selectPlaceholder')}
                    />
                  </div>
                  <Button
                    onClick={handleCreateGroup}
                    disabled={
                      selectedStudents.length < 2 ||
                      createManualGroupMutation.isPending
                    }
                  >
                    {createManualGroupMutation.isPending ? (
                      <Loader2 className="mr-2 animate-spin" />
                    ) : (
                      <Plus className="mr-2" />
                    )}
                    {tGroupActivity('manualMode.createGroupButton')}
                  </Button>
                </div>
              )}
              {conflictWarning && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>
                    {tGroupActivity('manualMode.warningTitle')}
                  </AlertTitle>
                  <AlertDescription>{conflictWarning}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {(isLoadingManualGroups || manualGroups.length > 0) && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingManualGroups
                ? Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-96 w-full" />
                  ))
                : manualGroups.map(group => (
                    <Card key={group.id} className="flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {tGroupActivity('manualMode.groupTitle')}
                          </CardTitle>
                          <div className="flex items-center">
                            {group.activities && group.activities.length > 0 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-primary hover:text-primary"
                                onClick={() => setAdaptingGroup(group)}
                              >
                                <Wand className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => handleRemoveGroup(group.id)}
                              disabled={deleteManualGroupMutation.isPending}
                            >
                              {deleteManualGroupMutation.isPending &&
                              deleteManualGroupMutation.variables ===
                                group.id ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {group.members.map(member => (
                            <Badge key={member.id} variant="secondary">
                              {member.name}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-grow">
                        {analysisForGroup === group.id ? (
                          <Skeleton className="h-16 w-full" />
                        ) : group.dynamicAnalysis ? (
                          <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                            <Lightbulb className="h-4 w-4 !text-blue-600" />
                            <AlertDescription className="prose prose-sm max-w-none">
                              {group.dynamicAnalysis}
                            </AlertDescription>
                          </Alert>
                        ) : null}
                        <div className="space-y-2">
                          <Label htmlFor={`skills-${group.id}`}>
                            {tGroupActivity('manualMode.skillsLabel')}
                          </Label>
                          <Input
                            id={`skills-${group.id}`}
                            defaultValue={
                              Array.isArray(group.skills)
                                ? group.skills.join(', ')
                                : ''
                            }
                            onBlur={e =>
                              handleGroupInputChange(
                                group.id,
                                'skills',
                                e.target.value
                              )
                            }
                            placeholder={tGroupActivity(
                              'manualMode.skillsPlaceholder'
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`themes-${group.id}`}>
                            {tGroupActivity('manualMode.themesLabel')}
                          </Label>
                          <Input
                            id={`themes-${group.id}`}
                            defaultValue={
                              Array.isArray(group.themes)
                                ? group.themes.join(', ')
                                : ''
                            }
                            onBlur={e =>
                              handleGroupInputChange(
                                group.id,
                                'themes',
                                e.target.value
                              )
                            }
                            placeholder={tGroupActivity(
                              'manualMode.themesPlaceholder'
                            )}
                          />
                        </div>
                        {group.activities && group.activities.length > 0 && (
                            <div className="border-t pt-4">
                                <Button className='w-full' variant="outline" onClick={() => setViewingGroup(group)}>
                                    <Eye className="mr-2 h-4 w-4"/>
                                    {tGroupActivity('viewActivitiesButton')}
                                </Button>
                            </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex-col gap-2 items-stretch">
                        <Button
                          onClick={() =>
                            analyzeGroupDynamicsMutation.mutate(group)
                          }
                          variant="outline"
                          size="sm"
                          disabled={analyzeGroupDynamicsMutation.isPending}
                        >
                          {analysisForGroup === group.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                          )}
                          {tGroupActivity('manualMode.analyzeButton')}
                        </Button>
                        <Button
                          onClick={() => handleGenerateActivity(group)}
                          size="sm"
                          disabled={
                            !group.skills ||
                            group.skills.length === 0 ||
                            generateGroupActivityMutation.isPending
                          }
                        >
                          {generateGroupActivityMutation.isPending &&
                          generateGroupActivityMutation.variables?.id ===
                            group.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Users className="mr-2 h-4 w-4" />
                          )}
                          {tGroupActivity('manualMode.generateActivityButton')}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
            </div>
          )}

          <Accordion type="single" collapsible>
            <AccordionItem value="ai-suggestions">
              <AccordionTrigger>
                <h2 className="text-xl font-semibold">
                  {tGroupActivity('aiSuggestions.title')}
                </h2>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{tGroupActivity('generator.title')}</CardTitle>
                    <CardDescription>
                      {tGroupActivity('generator.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => generateSuggestionMutation.mutate()}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      {tGroupActivity('generator.button')}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>{tGroupActivity('history.title')}</CardTitle>
                    <CardDescription>
                      {tGroupActivity('history.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-400px)] pr-4">
                      {isLoadingSuggestions || isGenerating ? (
                        <div className="space-y-4">
                          <Skeleton className="h-48 w-full" />
                          <Skeleton className="h-48 w-full" />
                        </div>
                      ) : suggestions.length > 0 ? (
                        <div className="space-y-6">
                          {suggestions.map(suggestion => (
                            <Card key={suggestion.id} className="bg-muted/30">
                              <CardHeader>
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-xl">
                                    {tGroupActivity('history.suggestionFor', {
                                      date: formatDistanceToNow(
                                        new Date(suggestion.createdAt),
                                        {
                                          addSuffix: true,
                                          locale: locale === 'es' ? es : enUS,
                                        }
                                      ),
                                    })}
                                  </CardTitle>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-destructive hover:text-destructive"
                                    onClick={() =>
                                      setSuggestionToDelete(suggestion.id)
                                    }
                                    disabled={deleteSuggestionMutation.isPending}
                                  >
                                    {deleteSuggestionMutation.isPending && suggestionToDelete === suggestion.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                                  <Lightbulb className="h-4 w-4 !text-blue-600" />
                                  <AlertTitle className="text-blue-900">
                                    {tGroupActivity(
                                      'history.teacherTipTitle'
                                    )}
                                  </AlertTitle>
                                  <AlertDescription>
                                    <ReactMarkdown className="prose prose-sm max-w-none">
                                      {suggestion.teacherTip}
                                    </ReactMarkdown>
                                  </AlertDescription>
                                </Alert>

                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">
                                      {tGroupActivity(
                                        'history.suggestedGroups'
                                      )}
                                    </h4>
                                    <div className="space-y-3">
                                      {suggestion.suggestedGroups.map(
                                        (group, gIndex) => (
                                          <div
                                            key={gIndex}
                                            className="p-3 border rounded-md bg-background"
                                          >
                                            <p className="font-medium mb-2">
                                              {tGroupActivity('history.group')}{' '}
                                              {gIndex + 1}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                              {group.map(
                                                (studentName, sIndex) => (
                                                  <Badge
                                                    key={sIndex}
                                                    variant="secondary"
                                                  >
                                                    {studentName}
                                                  </Badge>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">
                                        {tGroupActivity(
                                          'history.suggestedSkills'
                                        )}
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {suggestion.suggestedSkills.map(
                                          (skill, sIndex) => (
                                            <Badge key={sIndex} variant="outline">
                                              {skill}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">
                                        {tGroupActivity(
                                          'history.suggestedThemes'
                                        )}
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {suggestion.suggestedThemes.map(
                                          (theme, tIndex) => (
                                            <Badge
                                              key={tIndex}
                                              variant="outline"
                                              className="bg-purple-100 text-purple-800 border-purple-200"
                                            >
                                              {theme}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button
                                  onClick={() => handleUseSuggestion(suggestion)}
                                  disabled={createManualGroupMutation.isPending}
                                >
                                  {createManualGroupMutation.isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  ) : (
                                    <Users className="mr-2 h-4 w-4" />
                                  )}
                                  {tGroupActivity(
                                    'history.useSuggestionButton'
                                  )}
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                          <BookCopy className="mx-auto h-12 w-12 text-gray-400" />
                          <h4 className="mt-4 text-lg font-semibold">
                            {tGroupActivity('history.noResults.title')}
                          </h4>
                          <p className="mt-2 text-sm">
                            {tGroupActivity('history.noResults.description')}
                          </p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <AlertDialog
        open={!!suggestionToDelete}
        onOpenChange={() => setSuggestionToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {tGroupActivity('history.deleteDialog.title')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {tGroupActivity('history.deleteDialog.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSuggestionToDelete(null)}>
              {tRelations('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                suggestionToDelete &&
                deleteSuggestionMutation.mutate(suggestionToDelete)
              }
              disabled={deleteSuggestionMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteSuggestionMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                tRelations('save')
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ResourceDemocratizerDialog
        isOpen={!!adaptingGroup}
        onClose={() => setAdaptingGroup(null)}
        groupActivity={adaptingGroup}
      />
      <GroupActivityDetailsDialog
        group={viewingGroup}
        onClose={() => setViewingGroup(null)}
        onDownload={handleDownloadGroupPlan}
        onDelete={handleDeleteActivities}
        isDeleting={updateManualGroupMutation.isPending}
      />
    </DashboardLayout>
  );
}

export default withAuth(GroupActivitiesPage, ['teacher']);
