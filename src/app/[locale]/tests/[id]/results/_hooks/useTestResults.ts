
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TestSubmissionDTO } from '@/modules/test-submission/application/dtos/test-submission.dto';
import { TestDTO } from '@/modules/test/application/dtos/test.dto';
import { TestAnalysisDTO } from '@/modules/test-analysis/application/dtos/test-analysis.dto';
import { useCurrentLocale } from '@/locales/client';

export function useTestResults(testId: string) {
  const queryClient = useQueryClient();
  const locale = useCurrentLocale();
  const [analyzingSubmission, setAnalyzingSubmission] = useState<TestSubmissionDTO | null>(null);

  const { data: submissions = [], isLoading } = useQuery<TestSubmissionDTO[]>({
    queryKey: ['testResults', testId],
    queryFn: () => fetch(`/api/tests/${testId}/results`).then(res => res.json()),
  });
    
  const { data: test } = useQuery<TestDTO>({
      queryKey: ['testDetails', testId],
      queryFn: () => fetch(`/api/tests/${testId}`).then(res => res.json()),
  });
  
   const { data: analysisResult, isLoading: isAnalysisLoading } = useQuery<TestAnalysisDTO>({
      queryKey: ['testAnalysis', analyzingSubmission?.id],
      queryFn: async () => {
          if (!analyzingSubmission || !test) return null;

          const res = await fetch('/api/tests/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  test,
                  submission: analyzingSubmission,
                  language: locale
              }),
          });
          if (!res.ok) throw new Error('Failed to analyze submission');
          return res.json();
      },
      enabled: !!analyzingSubmission && !!test,
      staleTime: Infinity, // Analysis results are stable
      gcTime: 300000, // 5 minutes
  });

  const handleAnalyzeClick = (submission: TestSubmissionDTO) => {
      setAnalyzingSubmission(submission);
  };

  const closeAnalysisDialog = () => {
      setAnalyzingSubmission(null);
  }

  return {
    submissions,
    isLoading,
    test,
    analyzingSubmission,
    analysisResult,
    isAnalysisLoading,
    handleAnalyzeClick,
    closeAnalysisDialog,
  };
}
