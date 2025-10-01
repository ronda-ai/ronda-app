
'use client';

import React from 'react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useConcernAnalysis } from '../_hooks/useConcernAnalysis';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { ObservationDTO } from '@/modules/observation/application/dtos/observation.dto';
import { ChallengeHistoryDTO } from '@/modules/challenge/application/dtos/challenge-history.dto';

interface ConcernAnalysisTabProps {
  selectedStudent: StudentDTO;
  allStudents: StudentDTO[];
  observations: ObservationDTO[];
  challengeHistory: ChallengeHistoryDTO[];
}

const ConcernAnalysisTab: React.FC<ConcernAnalysisTabProps> = ({ selectedStudent, allStudents, observations, challengeHistory }) => {
  const tCoach = useScopedI18n('coach');
  const locale = useCurrentLocale();
  const { concernAnalyses, isLoadingConcernAnalyses, generateConcernAnalysis } = useConcernAnalysis(
    selectedStudent.id,
    locale,
    allStudents,
    observations,
    challengeHistory
  );

  const isAnalyzingConcern = generateConcernAnalysis.isPending;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className='flex-1'>
            <CardTitle className="text-lg">{tCoach('concernAnalysis.title')}</CardTitle>
            <CardDescription className="mt-1">{tCoach('concernAnalysis.description')}</CardDescription>
          </div>
          <Button onClick={() => generateConcernAnalysis.mutate(selectedStudent)} disabled={isAnalyzingConcern} className="ml-4">
            {isAnalyzingConcern ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {tCoach('concernAnalysis.button')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingConcernAnalyses ? <Skeleton className="h-20 w-full" /> : concernAnalyses.length > 0 ? (
          <div className="space-y-3">
            {concernAnalyses.map(analysis => (
              <Alert key={analysis.id} variant="destructive" className='bg-red-50'>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{tCoach('concernAnalysis.title')} ({formatDistanceToNow(new Date(analysis.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })})</AlertTitle>
                <AlertDescription className="prose prose-sm max-w-none">
                  <ReactMarkdown>{analysis.analysis}</ReactMarkdown>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h4 className="mt-4 text-lg font-semibold">{tCoach('concernAnalysis.noAnalyses.title')}</h4>
            <p className="mt-2 text-sm">{tCoach('concernAnalysis.description')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConcernAnalysisTab;
