
'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { ObservationDTO, ObservationType } from '@/modules/observation/application/dtos/observation.dto';
import { CreateObservationDTO } from '@/modules/observation/application/dtos/create-observation.dto';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';

export type AISuggestion = {
    suggestedType: ObservationType;
    suggestedTags: string[];
    deepeningQuestion?: string;
} | null;

export function useObservations(selectedStudentId: string | null, studentName?: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const tObservations = useScopedI18n('observations');
  const tToast = useScopedI18n('toasts');
  const locale = useCurrentLocale();

  const [newObservationText, setNewObservationText] = useState('');
  const [newObservationType, setNewObservationType] = useState<ObservationType>('neutral');
  const [observationToDelete, setObservationToDelete] = useState<ObservationDTO | null>(null);
  const [aiSuggestion, setAISuggestion] = useState<AISuggestion>(null);
  const [filterType, setFilterType] = useState<ObservationType | 'all'>('all');
  const [filterTag, setFilterTag] = useState<string | 'all'>('all');

  const { data: observations = [], isLoading: isLoadingObservations } = useQuery<ObservationDTO[]>({
    queryKey: ['observations', selectedStudentId],
    queryFn: () => fetch(`/api/students/${selectedStudentId}/observations`).then(res => res.json()),
    enabled: !!selectedStudentId,
  });
  
  const { data: aiConfig } = useQuery<AIConfigurationDTO>({
    queryKey: ['aiConfiguration'],
    queryFn: () => fetch('/api/ai/configuration').then(res => res.ok ? res.json() : null),
  });

  const uniqueTags = useMemo(() => {
    const allTags = observations.flatMap(obs => obs.tags);
    return ['all', ...Array.from(new Set(allTags))];
  }, [observations]);

  const filteredObservations = useMemo(() => {
    return observations.filter(obs => {
      const typeMatch = filterType === 'all' || obs.type === filterType;
      const tagMatch = filterTag === 'all' || (obs.tags && obs.tags.includes(filterTag));
      return typeMatch && tagMatch;
    });
  }, [observations, filterType, filterTag]);


  const analyzeObservationMutation = useMutation({
    mutationFn: (observationText: string) => fetch('/api/suggestions/observation-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            observationText, 
            studentName, 
            language: locale,
            ageOrGrade: aiConfig?.ageOrGrade,
            subject: aiConfig?.subject,
            country: aiConfig?.country,
        }),
    }).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    }),
    onSuccess: (data: AISuggestion) => {
        setAISuggestion(data);
        if (data?.suggestedType) {
            setNewObservationType(data.suggestedType);
        }
        toast({ title: tObservations('toastAnalysisSuccess') });
    },
    onError: () => {
        toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
    }
  });

  const improveObservationMutation = useMutation({
    mutationFn: (observationText: string) => fetch('/api/suggestions/improve-observation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            observationText, 
            studentName,
            language: locale,
            ageOrGrade: aiConfig?.ageOrGrade,
            subject: aiConfig?.subject,
            country: aiConfig?.country,
        }),
    }).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    }),
    onSuccess: (data: { improvedObservation: string }) => {
        setNewObservationText(data.improvedObservation);
        toast({ title: tObservations('toastImproveSuccess') });
    },
    onError: () => {
        toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
    }
  });

  const createObservationMutation = useMutation({
    mutationFn: (data: CreateObservationDTO) =>
      fetch('/api/observations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observations', selectedStudentId] });
      setNewObservationText('');
      setNewObservationType('neutral');
      setAISuggestion(null);
      toast({ title: tObservations('toastSuccess') });
    },
    onError: () => {
      toast({ title: tObservations('toastError'), variant: 'destructive' });
    },
  });

  const deleteObservationMutation = useMutation({
    mutationFn: (observationId: string) =>
      fetch(`/api/observations/${observationId}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observations', selectedStudentId] });
      setObservationToDelete(null);
      toast({ title: tObservations('toastDeleteSuccess') });
    },
    onError: () => {
      toast({ title: tObservations('toastDeleteError'), variant: 'destructive' });
      setObservationToDelete(null);
    },
  });


  const handleAddObservation = () => {
    if (!selectedStudentId || !newObservationText.trim()) return;
    createObservationMutation.mutate({
      studentId: selectedStudentId,
      observation: newObservationText.trim(),
      type: newObservationType,
      tags: aiSuggestion?.suggestedTags || [],
      deepeningQuestion: aiSuggestion?.deepeningQuestion,
    });
  };

  const handleAnalyzeObservation = () => {
      if (!newObservationText.trim()) return;
      analyzeObservationMutation.mutate(newObservationText);
  };

  const handleImproveObservation = () => {
        if (!newObservationText.trim()) return;
        improveObservationMutation.mutate(newObservationText);
  };
  
  const handleClearObservation = () => {
      setNewObservationText('');
      setNewObservationType('neutral');
      setAISuggestion(null);
  };

  return {
    observations,
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
  };
}
