
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Send,
  Smile,
  Frown,
  Landmark,
  BookOpen,
  UserRoundCog,
  ListOrdered,
  Trash2,
  Sparkles,
  X,
  Bot,
  BrainCircuit,
  Tags,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ObservationType,
} from '@/modules/observation/application/dtos/observation.dto';
import { Label } from '@/components/ui/label';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { useStudentSelector } from './_hooks/useStudentSelector';
import { useObservations } from './_hooks/useObservations';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const observationTypeMap: {
  [key in ObservationType]: {
    icon: React.ElementType;
    color: string;
    labelKey: string;
  };
} = {
  positive: {
    icon: Smile,
    color: 'border-green-500 bg-green-50 text-green-800',
    labelKey: 'positive',
  },
  negative: {
    icon: Frown,
    color: 'border-red-500 bg-red-50 text-red-800',
    labelKey: 'negative',
  },
  neutral: {
    icon: Landmark,
    color: 'border-gray-500 bg-gray-50 text-gray-800',
    labelKey: 'neutral',
  },
  academic: {
    icon: BookOpen,
    color: 'border-blue-500 bg-blue-50 text-blue-800',
    labelKey: 'academic',
  },
  'social-emotional': {
    icon: UserRoundCog,
    color: 'border-purple-500 bg-purple-50 text-purple-800',
    labelKey: 'socialEmotional',
  },
};

function ObservationsPage() {
  const tObservations = useScopedI18n('observations');
  const tIndividualActivity = useScopedI18n('individualActivities');
  const tObservationTypes = useScopedI18n('observations.types');
  const locale = useCurrentLocale();
  const tRelations = useScopedI18n('relations');

  const { 
    students, 
    isLoadingStudents, 
    selectedStudentId, 
    setSelectedStudentId, 
    selectedStudent 
  } = useStudentSelector();
  
  const { 
    isLoadingObservations,
    newObservationText,
    setNewObservationText,
    newObservationType,
    setNewObservationType,
    aiSuggestion,
    analyzeObservationMutation,
    improveObservationMutation,
    createObservationMutation,
    handleAddObservation,
    handleAnalyzeObservation,
    handleImproveObservation,
    handleClearObservation,
    deleteObservationMutation,
    observationToDelete,
    setObservationToDelete,
    filteredObservations,
    uniqueTags,
    filterType,
    setFilterType,
    filterTag,
    setFilterTag,
  } = useObservations(selectedStudentId, selectedStudent?.name);


  const isCreatingObservation = createObservationMutation.isPending;
  const isAnalyzing = analyzeObservationMutation.isPending;
  const isImproving = improveObservationMutation.isPending;
  
  const allTagsLabel = tObservations('allTags');
  const allTypesLabel = tObservations('allTypes');

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{tObservations('noStudentSelected.title')}</CardTitle>
              <CardDescription>
                {tObservations('noStudentSelected.selectDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingStudents ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="student-select">
                    {tIndividualActivity('step1.selectLabel')}
                  </Label>
                  <Select
                    onValueChange={setSelectedStudentId}
                    value={selectedStudentId || ''}
                  >
                    <SelectTrigger id="student-select">
                      <SelectValue
                        placeholder={tIndividualActivity(
                          'step1.selectPlaceholder'
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
          {selectedStudent && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{tObservations('newObservationTitle')}</CardTitle>
                  <CardDescription>
                    {tObservations('newObservationDescription', {
                      name: selectedStudent.name,
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="observation-text">
                      {tObservations('observationLabel')}
                    </Label>
                    <Textarea
                      id="observation-text"
                      placeholder={tObservations('observationPlaceholder')}
                      value={newObservationText}
                      onChange={e => setNewObservationText(e.target.value)}
                      rows={4}
                    />
                     <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={handleImproveObservation} disabled={isImproving || !newObservationText}>
                              {isImproving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                              {tObservations('improveButton')}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleAnalyzeObservation} disabled={isAnalyzing || !newObservationText}>
                              {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                              {tObservations('analyzeButton')}
                          </Button>
                      </div>
                  </div>

                  {aiSuggestion && (
                      <Alert variant="default" className="border-blue-200 bg-blue-50 text-blue-800">
                        <Sparkles className="h-4 w-4 !text-blue-600" />
                        <AlertTitle>{tObservations('analysisTitle')}</AlertTitle>
                        <AlertDescription className="space-y-3">
                           <p>
                             <span className="font-semibold">{tObservations('suggestedType')}:</span> {tObservationTypes(aiSuggestion.suggestedType as any)}
                           </p>
                           <div className="flex flex-wrap items-center gap-2">
                               <span className="font-semibold">{tObservations('suggestedTags')}:</span>
                               {aiSuggestion.suggestedTags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                           </div>
                           {aiSuggestion.deepeningQuestion && (
                                <div className='pt-3 border-t border-blue-200/60'>
                                     <p className="flex items-start gap-2 text-sm">
                                        <BrainCircuit className='h-4 w-4 mt-0.5 shrink-0'/>
                                        <span>
                                            <span className='font-semibold'>{tObservations('deepeningQuestion')}: </span>
                                            <span className='italic'>"{aiSuggestion.deepeningQuestion}"</span>
                                        </span>
                                    </p>
                                </div>
                           )}
                        </AlertDescription>
                      </Alert>
                  )}

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="observation-type">
                      {tObservations('typeLabel')}
                    </Label>
                    <Select
                      value={newObservationType}
                      onValueChange={(value: ObservationType) =>
                        setNewObservationType(value)
                      }
                    >
                      <SelectTrigger id="observation-type">
                        <SelectValue
                          placeholder={tObservations('typePlaceholder')}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(observationTypeMap).map(key => {
                          const type = key as ObservationType;
                          const {icon: Icon, labelKey} =
                            observationTypeMap[type];
                          return (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {tObservationTypes(labelKey as any)}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddObservation}
                      disabled={
                        isCreatingObservation || !newObservationText.trim()
                      }
                    >
                      {isCreatingObservation ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {tObservations('saveButton')}
                    </Button>
                    <Button variant="outline" onClick={handleClearObservation}>
                        <X className="mr-2 h-4 w-4" />
                        {tObservations('clearButton')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  {tObservations('historyTitle')}
                </h3>
                 <div className="flex gap-4 mb-4 p-4 border rounded-lg bg-card">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="filter-type">{tObservations('filterByType')}</Label>
                        <Select value={filterType} onValueChange={(v) => setFilterType(v as any)}>
                            <SelectTrigger id="filter-type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{allTypesLabel}</SelectItem>
                                {Object.keys(observationTypeMap).map(key => {
                                  const type = key as ObservationType;
                                  return (
                                    <SelectItem key={type} value={type}>
                                        {tObservationTypes(observationTypeMap[type].labelKey as any)}
                                    </SelectItem>
                                  );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="filter-tag">{tObservations('filterByTag')}</Label>
                        <Select value={filterTag} onValueChange={(v) => setFilterTag(v as any)} disabled={uniqueTags.length <= 1}>
                             <SelectTrigger id="filter-tag">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {uniqueTags.map(tag => (
                                    <SelectItem key={tag} value={tag}>
                                        {tag === 'all' ? allTagsLabel : tag}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                 </div>

                {isLoadingObservations ? (
                  <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : filteredObservations.length > 0 ? (
                  <div className="space-y-4">
                    {filteredObservations.map(obs => {
                      const typeInfo = observationTypeMap[obs.type];
                      const Icon = typeInfo.icon;
                      return (
                        <Card key={obs.id} className={typeInfo.color}>
                          <CardContent className="p-4 flex gap-4 items-start">
                            <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="font-medium">{obs.observation}</p>
                              {(obs.tags && obs.tags.length > 0 || obs.deepeningQuestion) && (
                                <div className="space-y-3 mt-3 pt-3 border-t border-current/20">
                                  {obs.tags && obs.tags.length > 0 && (
                                      <div className="flex flex-wrap items-center gap-2">
                                          <Tags className="h-4 w-4"/>
                                          {obs.tags.map(tag => <Badge key={tag} variant="outline" className="bg-white/50">{tag}</Badge>)}
                                      </div>
                                  )}
                                  {obs.deepeningQuestion && (
                                      <p className="flex items-start gap-2 text-sm">
                                          <BrainCircuit className='h-4 w-4 mt-0.5 shrink-0'/>
                                          <span className='italic'>"{obs.deepeningQuestion}"</span>
                                      </p>
                                  )}
                                </div>
                               )}
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatDistanceToNow(new Date(obs.createdAt), {
                                  addSuffix: true,
                                  locale: locale === 'es' ? es : enUS,
                                })}
                              </p>
                            </div>
                             <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/60 hover:text-destructive" onClick={() => setObservationToDelete(obs)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
                    <ListOrdered className="mx-auto h-12 w-12 text-gray-400" />
                    <h4 className="mt-4 text-lg font-semibold">
                      {tObservations('noObservations.title')}
                    </h4>
                    <p className="mt-2 text-sm">
                      {tObservations('noObservations.description')}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <AlertDialog open={!!observationToDelete} onOpenChange={() => setObservationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tObservations('deleteDialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>{tObservations('deleteDialog.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setObservationToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (observationToDelete) {
                  deleteObservationMutation.mutate(observationToDelete.id);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteObservationMutation.isPending}
            >
              {deleteObservationMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : tObservations('deleteDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}

export default withAuth(ObservationsPage, ['teacher']);
