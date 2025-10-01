

'use client';

import React, { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { RubricSuggestionDTO } from '@/modules/rubric-suggestion/application/dtos/rubric-suggestion.dto';
import { CurriculumActivityDTO } from '@/modules/curriculum-activity/application/dtos/curriculum-activity.dto';
import { PersonalizedActivityDTO } from '@/modules/personalized-activity/application/dtos/personalized-activity.dto';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { TestDTO } from '@/modules/test/application/dtos/test.dto';


export function useRubricGenerator() {
  const tToast = useScopedI18n('toasts');
  const tTools = useScopedI18n('tools');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [rubricActivityText, setRubricActivityText] = React.useState('');
  const [rubricToDelete, setRubricToDelete] = React.useState<string | null>(null);
  const [selectedTestBlocks, setSelectedTestBlocks] = React.useState<any[] | undefined>(undefined);
  const [selectedRubricId, setSelectedRubricId] = React.useState<string | null | undefined>(undefined);
  const [selectedRubric, setSelectedRubric] = React.useState<RubricSuggestionDTO['criteria'] | undefined>(undefined);
  const [selectedScoring, setSelectedScoring] = React.useState<RubricSuggestionDTO['suggestedScoring'] | undefined>(undefined);

  const { data: students = [] } = useQuery<StudentDTO[]>({
    queryKey: ['students'],
    queryFn: () => fetch('/api/students').then(res => res.json()),
  });

  const { data: rubricHistory = [], isLoading: isLoadingRubricHistory } = useQuery<RubricSuggestionDTO[]>({
    queryKey: ['rubricSuggestions'],
    queryFn: () => fetch('/api/suggestions/generate-rubric').then(res => res.json()),
  });

  const { data: curriculumActivities = [] } = useQuery<CurriculumActivityDTO[]>({
    queryKey: ['curriculumActivities'],
    queryFn: () => fetch('/api/suggestions/curriculum').then(res => res.json()),
  });

  const { data: personalizedActivities = [] } = useQuery<PersonalizedActivityDTO[]>({
    queryKey: ['allPersonalizedActivities'], // A unique key to fetch all
    queryFn: () => fetch('/api/personalized-activities').then(res => res.json()),
  });

  const { data: tests = [], isLoading: isLoadingTests } = useQuery<TestDTO[]>({
    queryKey: ['tests'],
    queryFn: () => fetch('/api/tests').then(res => res.json()),
  });

  const activityOptions = useMemo(() => {
    const curriculumOptions = curriculumActivities.flatMap(plan =>
      plan.activities.map(activity => ({
        value: activity.description,
        label: `[${tTools('activityAdapter.activityType')}] ${activity.title}`,
      }))
    );

    const personalizedOptions = personalizedActivities.flatMap(plan => {
       const student = students.find(s => s.id === plan.studentId);
       return plan.activities.map(activity => ({
           value: activity.description,
           label: `[${student?.name || 'Student'}] ${activity.title}`,
       }));
    });
    
    const testOptions = Array.isArray(tests) ? tests.map(test => ({
        value: `${test.title}\n\n${test.blocks.flatMap(b => b.questions.map(q => q.text)).join('\n')}`,
        label: `[${tTools('rubricGenerator.testType')}] ${test.title}`,
        blocks: test.blocks,
        rubricId: test.rubricId,
        rubric: test.rubric,
    })) : [];

    return [...curriculumOptions, ...personalizedOptions, ...testOptions];
  }, [curriculumActivities, personalizedActivities, tests, students, tTools]);


  const generateRubricMutation = useMutation({
    mutationFn: ({ activityDescription, blocks, rubricId, criteria, suggestedScoring }: { activityDescription: string, blocks?: any[], rubricId?: string | null, criteria?: any, suggestedScoring?: any }) =>
      fetch('/api/suggestions/generate-rubric', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityDescription,
          language: locale,
          blocks,
          rubricId,
          criteria,
          suggestedScoring,
        }),
      }).then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rubricSuggestions'] });
      queryClient.invalidateQueries({ queryKey: ['tests'] });
      setRubricActivityText('');
      setSelectedTestBlocks(undefined);
      setSelectedRubricId(null);
      setSelectedRubric(undefined);
      setSelectedScoring(undefined);
    },
    onError: () => {
      toast({
        title: tToast('aiSuggestionFailed'),
        variant: 'destructive',
      });
    },
  });

  const deleteRubricMutation = useMutation({
    mutationFn: (id: string) => fetch(`/api/suggestions/generate-rubric/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['rubricSuggestions']});
        setRubricToDelete(null);
        toast({ title: tTools('history.toastDeleteSuccess') });
    },
    onError: () => {
        toast({ title: tTools('history.toastDeleteFailed'), variant: 'destructive'});
        setRubricToDelete(null);
    }
  });


  const handleRubricSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rubricActivityText.trim()) {
      generateRubricMutation.mutate({ 
          activityDescription: rubricActivityText, 
          blocks: selectedTestBlocks,
          rubricId: selectedRubricId,
          criteria: selectedRubric,
          suggestedScoring: selectedScoring,
      });
    }
  };
  
  const handleSelectActivityOrTest = (option: { value: string; label: string; blocks?: any[], rubricId?: string, rubric?: any } | null) => {
    if (option) {
      setRubricActivityText(option.value);
      setSelectedTestBlocks(option.blocks);
      setSelectedRubricId(option.rubricId);
      setSelectedRubric(option.rubric?.criteria);
      setSelectedScoring(option.rubric?.suggestedScoring);
    } else {
      setRubricActivityText('');
      setSelectedTestBlocks(undefined);
      setSelectedRubricId(null);
      setSelectedRubric(undefined);
      setSelectedScoring(undefined);
    }
  }

  return {
    rubricActivityText,
    setRubricActivityText,
    rubricHistory,
    isLoadingRubricHistory,
    generateRubricMutation,
    handleRubricSubmit,
    activityOptions: activityOptions,
    rubricToDelete,
    setRubricToDelete,
    deleteRubricMutation,
    handleSelectActivityOrTest,
  };
}
