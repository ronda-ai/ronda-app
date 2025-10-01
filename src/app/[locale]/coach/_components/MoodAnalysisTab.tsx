
'use client';

import React from 'react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Users, Lightbulb, Tags, Telescope, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useMoodAnalysis } from '../_hooks/useMoodAnalysis';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Insight } from '@/modules/mood-trend-analysis/application/dtos/mood-trend-analysis.dto';

interface MoodAnalysisTabProps {
  selectedStudent: StudentDTO | null;
  onAnalysisDeleted: () => void;
}

const MoodAnalysisTab: React.FC<MoodAnalysisTabProps> = ({ selectedStudent, onAnalysisDeleted }) => {
  const tCoach = useScopedI18n('coach');
  const locale = useCurrentLocale();

  const {
    studentMoodAnalyses,
    isLoadingStudentMoodAnalyses,
    classroomMoodAnalyses,
    isLoadingClassroomMoodAnalyses,
    generateStudentMoodAnalysis,
    generateClassroomMoodAnalysis,
    deleteMoodAnalysisMutation
  } = useMoodAnalysis(selectedStudent?.id || null, locale);
  
  const analyses = selectedStudent ? studentMoodAnalyses : classroomMoodAnalyses;
  const isLoading = selectedStudent ? isLoadingStudentMoodAnalyses : isLoadingClassroomMoodAnalyses;
  const generateMutation = selectedStudent ? generateStudentMoodAnalysis : generateClassroomMoodAnalysis;

  const handleGenerate = () => {
    if (selectedStudent) {
      generateStudentMoodAnalysis.mutate(selectedStudent);
    } else {
      generateClassroomMoodAnalysis.mutate();
    }
  };

  const handleDeleteAnalysis = (id: string) => {
    deleteMoodAnalysisMutation.mutate(id, {
        onSuccess: () => onAnalysisDeleted()
    });
  };

  const createAnalysisTitle = (analysis: Insight[]) => {
    if (!analysis || analysis.length === 0) {
      return tCoach('moodAnalysis.analysisTitle');
    }
    const insightTitles = analysis.map(insight => insight.title);
    if (insightTitles.length <= 2) {
        return `${tCoach('moodAnalysis.analysisTitle')}: ${insightTitles.join(' & ')}`;
    }
    return `${tCoach('moodAnalysis.analysisTitle')}: ${insightTitles.slice(0, 2).join(', ')}...`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{tCoach('moodAnalysis.title')}</CardTitle>
            <CardDescription className="mt-2">
              {selectedStudent ? tCoach('moodAnalysis.descriptionStudent') : tCoach('moodAnalysis.descriptionClassroom')}
            </CardDescription>
          </div>
          <Button onClick={handleGenerate} disabled={generateMutation.isPending} className="ml-4 shrink-0">
            {generateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Users className="mr-2 h-4 w-4" />}
            {selectedStudent ? tCoach('moodAnalysis.button') : tCoach('moodAnalysis.buttonClassroom')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading || generateMutation.isPending ? (
          <div className="space-y-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : analyses.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {analyses.map(analysis => (
              <AccordionItem value={analysis.id} key={analysis.id} className="border rounded-lg bg-muted/30">
                <div className="flex justify-between items-center p-4">
                  <AccordionTrigger className="flex-1 hover:no-underline p-0">
                    <div className='text-left'>
                      <h4 className="font-semibold text-primary">{createAnalysisTitle(analysis.analysis)}</h4>
                      <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                        {formatDistanceToNow(new Date(analysis.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive ml-2" onClick={() => handleDeleteAnalysis(analysis.id)}>
                    {deleteMoodAnalysisMutation.isPending && deleteMoodAnalysisMutation.variables === analysis.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
                <AccordionContent className="p-4 pt-0">
                  {(analysis.analysis || []).map((insight, index) => (
                    <div key={index} className="mt-4 pt-4 border-t first:mt-0 first:pt-0 first:border-none">
                      <CardTitle className="text-lg text-foreground">{insight.title}</CardTitle>
                      <div className="space-y-3 mt-2">
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                        {insight.studentsInvolved && insight.studentsInvolved.length > 0 && (
                          <div className="flex flex-wrap gap-2 items-center">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {insight.studentsInvolved.map(name => <Badge key={name} variant="secondary">{name}</Badge>)}
                          </div>
                        )}
                        {insight.suggestion && (
                          <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>{tCoach('coachSuggestion.title')}</AlertTitle>
                            <AlertDescription>{insight.suggestion}</AlertDescription>
                          </Alert>
                        )}
                        {insight.tags && insight.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 items-center pt-2 border-t mt-4">
                            <Tags className="h-4 w-4 text-muted-foreground" />
                            {insight.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8 mt-6">
            <Telescope className="mx-auto h-12 w-12 text-gray-400" />
            <h4 className="mt-4 text-lg font-semibold">{tCoach('moodAnalysis.noAnalyses.title')}</h4>
            <p className="mt-2 text-sm">
              {selectedStudent ? tCoach('moodAnalysis.noAnalyses.descriptionStudent') : tCoach('moodAnalysis.noAnalyses.descriptionClassroom')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodAnalysisTab;
