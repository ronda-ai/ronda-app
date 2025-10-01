
'use client';

import React, { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { ActivityAdaptationDTO } from '@/modules/activity-adaptation/application/dtos/activity-adaptation.dto';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { CurriculumActivityDTO } from '@/modules/curriculum-activity/application/dtos/curriculum-activity.dto';
import { PersonalizedActivityDTO } from '@/modules/personalized-activity/application/dtos/personalized-activity.dto';

export function useActivityAdapter() {
  const tToast = useScopedI18n('toasts');
  const tTools = useScopedI18n('tools');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [activityText, setActivityText] = React.useState('');
  const [selectedStudents, setSelectedStudents] = React.useState<StudentDTO[]>([]);
  const [customPrompt, setCustomPrompt] = React.useState('');
  const [adaptationToDelete, setAdaptationToDelete] = React.useState<string | null>(null);

  const { data: students = [], isLoading: isLoadingStudents } = useQuery<StudentDTO[]>({
    queryKey: ['students'],
    queryFn: () => fetch('/api/students').then(res => res.json()),
  });

  const { data: adaptationHistory = [], isLoading: isLoadingAdaptationHistory } = useQuery<ActivityAdaptationDTO[]>({
    queryKey: ['activityAdaptations'],
    queryFn: () => fetch('/api/suggestions/adapt-activity').then(res => res.json()),
  });

  const { data: curriculumActivities = [] } = useQuery<CurriculumActivityDTO[]>({
    queryKey: ['curriculumActivities'],
    queryFn: () => fetch('/api/suggestions/curriculum').then(res => res.json()),
  });

  const { data: personalizedActivities = [] } = useQuery<PersonalizedActivityDTO[]>({
    queryKey: ['allPersonalizedActivities'], // A unique key to fetch all
    queryFn: () => fetch('/api/personalized-activities').then(res => res.json()),
  });

  const activityOptions = useMemo(() => {
    const curriculumOptions = curriculumActivities.flatMap(plan =>
      plan.activities.map(activity => ({
        value: activity.description,
        label: `[Class] ${activity.title}`,
      }))
    );

    const personalizedOptions = personalizedActivities.flatMap(plan => {
       const student = students.find(s => s.id === plan.studentId);
       return plan.activities.map(activity => ({
           value: activity.description,
           label: `[${student?.name || 'Student'}] ${activity.title}`,
       }));
    });
    
    return [...curriculumOptions, ...personalizedOptions];
  }, [curriculumActivities, personalizedActivities, students]);

  const adaptActivityMutation = useMutation({
    mutationFn: () =>
      fetch('/api/suggestions/adapt-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalActivity: activityText,
          language: locale,
          students: selectedStudents,
          customPrompt: customPrompt,
        }),
      }).then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activityAdaptations'] });
      setActivityText('');
      setSelectedStudents([]);
      setCustomPrompt('');
    },
    onError: () => {
      toast({
        title: tToast('aiSuggestionFailed'),
        variant: 'destructive',
      });
    },
  });

  const deleteAdaptationMutation = useMutation({
      mutationFn: (id: string) => fetch(`/api/suggestions/adapt-activity/${id}`, { method: 'DELETE' }),
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['activityAdaptations']});
          setAdaptationToDelete(null);
          toast({ title: tTools('history.toastDeleteSuccess') });
      },
      onError: () => {
          toast({ title: tTools('history.toastDeleteFailed'), variant: 'destructive'});
          setAdaptationToDelete(null);
      }
  })

  const summarizeActivityMutation = useMutation({
    mutationFn: (activityText: string) => 
        fetch('/api/suggestions/summarize-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ activityText, language: locale }),
        }).then(res => {
            if (!res.ok) throw new Error('Failed to summarize');
            return res.json();
        }),
    onSuccess: (data: { summary: string }) => {
        setActivityText(data.summary);
        toast({ title: "Activity summary loaded!" });
    },
    onError: () => {
        toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
    }
  });

  const handleAdapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activityText.trim()) {
      adaptActivityMutation.mutate();
    }
  };

  const studentOptions = students.map(s => ({ value: s, label: s.name }));
  const selectedStudentOptions = selectedStudents.map(s => ({ value: s, label: s.name }));

  return {
    activityText,
    setActivityText,
    selectedStudents,
    setSelectedStudents,
    customPrompt,
    setCustomPrompt,
    isLoadingStudents,
    studentOptions,
    selectedStudentOptions,
    adaptationHistory,
    isLoadingAdaptationHistory,
    adaptActivityMutation,
    handleAdapterSubmit,
    activityOptions,
    summarizeActivityMutation,
    adaptationToDelete,
    setAdaptationToDelete,
    deleteAdaptationMutation,
  };
}
