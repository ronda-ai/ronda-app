
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/locales/client';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { RelationshipRemediationDTO, RemediationStatus, RemediationStep, RemediationStepStatus } from '@/modules/relationship-remediation/application/dtos/relationship-remediation.dto';
import { IndividualRelationshipStrategyDTO, StrategyStepDTO, StrategyStatus } from '@/modules/individual-relationship-strategy/application/dtos/individual-relationship-strategy.dto';

type EvaluatingStep = {
  remediation?: RelationshipRemediationDTO;
  individualStrategy?: IndividualRelationshipStrategyDTO;
  step: RemediationStep | StrategyStepDTO;
  stepIndex: number;
} | null;

export function useRelationshipRemediation(allStudents: StudentDTO[], selectedStudents: StudentDTO[], locale: string) {
  const t = useScopedI18n('coach.relationshipLab');
  const tToast = useScopedI18n('toasts');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [focus, setFocus] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [evaluationState, setEvaluationState] = useState<Record<string, { status?: RemediationStatus | StrategyStatus; feedback?: string }>>({});
  const [selectedRemediation, setSelectedRemediation] = useState<RelationshipRemediationDTO | null>(null);
  const [selectedIndividualStrategy, setSelectedIndividualStrategy] = useState<IndividualRelationshipStrategyDTO | null>(null);
  const [evaluatingStep, setEvaluatingStep] = useState<EvaluatingStep>(null);
  const [adjustPrompt, setAdjustPrompt] = useState('');
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [strategyToDelete, setStrategyToDelete] = useState<string | null>(null);
  const [deletingStrategyId, setDeletingStrategyId] = useState<string | null>(null);
  const [remediationToDelete, setRemediationToDelete] = useState<string | null>(null);
  const [deletingRemediationId, setDeletingRemediationId] = useState<string | null>(null);


  const selectedStudentIds = useMemo(() => selectedStudents.map(s => s.id).sort().join(','), [selectedStudents]);
  const isIndividualMode = selectedStudents.length === 1;

  const { data: history, isLoading: isLoadingHistory } = useQuery<RelationshipRemediationDTO[]>({
    queryKey: ['relationshipRemediations', selectedStudentIds],
    queryFn: () => fetch(`/api/suggestions/relationship-remediation?studentIds=${selectedStudentIds}`).then(res => res.json()),
    enabled: selectedStudents.length >= 2,
  });

  const { data: individualHistory, isLoading: isLoadingIndividualHistory } = useQuery<IndividualRelationshipStrategyDTO[]>({
      queryKey: ['individualRelationshipStrategies', selectedStudentIds],
      queryFn: () => fetch(`/api/suggestions/individual-relationship-strategy?studentId=${selectedStudentIds}`).then(res => res.json()),
      enabled: isIndividualMode,
  });
  
  useEffect(() => {
    if (selectedRemediation) {
      const currentRemediationInHistory = history?.find(h => h.id === selectedRemediation.id);
      setSelectedRemediation(currentRemediationInHistory || null);
    }
  }, [history, selectedRemediation]);

   useEffect(() => {
    if (selectedIndividualStrategy) {
      const currentStrategyInHistory = individualHistory?.find(h => h.id === selectedIndividualStrategy.id);
      setSelectedIndividualStrategy(currentStrategyInHistory || null);
    }
  }, [individualHistory, selectedIndividualStrategy]);


  const generateRemediationMutation = useMutation({
    mutationFn: ({ students, focus, customPrompt, language, existingStrategy }: { students: StudentDTO[], focus: string, customPrompt?: string, language: string, existingStrategy?: RelationshipRemediationDTO | null }) =>
      fetch('/api/suggestions/relationship-remediation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          students,
          focus,
          customPrompt,
          language,
          existingStrategy,
        }),
      }).then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['relationshipRemediations', selectedStudentIds] });
      toast({ title: t('toastSuccess') });
      setAdjustPrompt('');
      setIsAdjusting(false);
      setSelectedRemediation(data);
    },
    onError: () => {
      toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
      setIsAdjusting(false);
    },
  });
  
  const generateIndividualStrategyMutation = useMutation({
    mutationFn: ({ student, focus, customPrompt, language }: { student: StudentDTO, focus: string, customPrompt?: string, language: string }) =>
      fetch('/api/suggestions/individual-relationship-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student, allStudents, focus, customPrompt, language }),
      }).then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['individualRelationshipStrategies', selectedStudentIds] });
        toast({ title: t('individual.toastSuccess') });
    },
    onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
  });

  const adjustIndividualStrategyMutation = useMutation({
      mutationFn: ({ existingStrategy, customPrompt }: { existingStrategy: IndividualRelationshipStrategyDTO, customPrompt: string }) => {
          const student = allStudents.find(s => s.id === existingStrategy.studentId);
          if(!student) return Promise.reject("Student not found");
          return fetch('/api/suggestions/individual-relationship-strategy/adjust', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ student, allStudents, language: locale, existingStrategy, customPrompt }),
          }).then(res => {
              if (!res.ok) throw new Error('API Error');
              return res.json();
          });
      },
      onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['individualRelationshipStrategies', selectedStudentIds] });
          toast({ title: t('toastSuccess') });
          setAdjustPrompt('');
          setSelectedIndividualStrategy(data);
      },
      onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
      onSettled: () => setIsAdjusting(false)
  });

  const updateRemediationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: { status?: RemediationStatus, feedback?: string }}) =>
      fetch(`/api/suggestions/relationship-remediation/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationshipRemediations', selectedStudentIds] });
      toast({ title: t('history.toastUpdateSuccess') });
    },
    onError: () => {
      toast({ title: t('history.toastUpdateFailed'), variant: 'destructive' });
    }
  });
  
  const updateIndividualStrategyMutation = useMutation({
      mutationFn: ({ id, data }: { id: string, data: { feedback?: string, status?: StrategyStatus } }) =>
          fetch(`/api/suggestions/individual-relationship-strategy/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          }),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['individualRelationshipStrategies', selectedStudentIds] });
          toast({ title: tToast('feedbackSaved') });
      },
      onError: () => {
          toast({ title: tToast('feedbackFailed'), variant: 'destructive' });
      }
  });

  const updateStepDetailsMutation = useMutation({
    mutationFn: ({ remediationId, stepIndex, details }: { remediationId: string; stepIndex: number; details: Partial<RemediationStep> }) =>
      fetch(`/api/suggestions/relationship-remediation/${remediationId}/steps/${stepIndex}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationshipRemediations', selectedStudentIds] });
      setEvaluatingStep(null);
      toast({ title: tToast('feedbackSaved') });
    },
    onError: () => toast({ title: tToast('feedbackFailed'), variant: 'destructive' }),
  });

  const updateIndividualStepDetailsMutation = useMutation({
      mutationFn: ({ strategyId, stepIndex, details }: { strategyId: string; stepIndex: number; details: Partial<StrategyStepDTO> }) =>
          fetch(`/api/suggestions/individual-relationship-strategy/${strategyId}/steps/${stepIndex}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(details),
          }).then(res => {
            if(!res.ok) throw new Error("Failed to update step");
            return res.json();
          }),
      onSuccess: (data: IndividualRelationshipStrategyDTO) => {
          queryClient.invalidateQueries({ queryKey: ['individualRelationshipStrategies', selectedStudentIds] });
          setEvaluatingStep(null);
          toast({ title: tToast('feedbackSaved') });
          // We need to update the selected strategy in the dialog if it's open
          if (selectedIndividualStrategy && selectedIndividualStrategy.id === data.id) {
              setSelectedIndividualStrategy(data);
          }
      },
      onError: () => toast({ title: tToast('feedbackFailed'), variant: 'destructive' }),
  });


  const deleteIndividualStrategyMutation = useMutation({
    mutationFn: (id: string): Promise<void> => 
        fetch(`/api/suggestions/individual-relationship-strategy/${id}`, { method: 'DELETE' }).then(res => {
            if (!res.ok) throw new Error("Failed to delete strategy");
        }),
    onMutate: (id: string) => {
        setDeletingStrategyId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['individualRelationshipStrategies', selectedStudentIds] });
      toast({ title: t('individual.toastDeleteSuccess') });
      setStrategyToDelete(null);
    },
    onError: () => {
      toast({ title: t('individual.toastDeleteFailed'), variant: 'destructive' });
      setStrategyToDelete(null);
    },
    onSettled: () => {
        setDeletingStrategyId(null);
    }
  });

  const deleteRemediationMutation = useMutation({
    mutationFn: (id: string): Promise<Response> => 
        fetch(`/api/suggestions/relationship-remediation/${id}`, { method: 'DELETE' }).then(res => {
            if (!res.ok) throw new Error("Failed to delete remediation");
            return res;
        }),
    onMutate: (id: string) => {
        setDeletingRemediationId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationshipRemediations', selectedStudentIds] });
      toast({ title: t('individual.toastDeleteSuccess') });
      setRemediationToDelete(null);
    },
    onError: () => {
      toast({ title: t('individual.toastDeleteFailed'), variant: 'destructive' });
      setRemediationToDelete(null);
    },
    onSettled: () => {
        setDeletingRemediationId(null);
    }
  });
  
  const handleUpdateRemediation = (id: string) => {
    const dataToUpdate = evaluationState[id];
    if (dataToUpdate) {
      if (isIndividualMode) {
          updateIndividualStrategyMutation.mutate({ id, data: dataToUpdate as any });
      } else {
          updateRemediationMutation.mutate({ id, data: dataToUpdate as any });
      }
    }
  };

  const handleEvaluationChange = (id: string, field: 'status' | 'feedback', value: string) => {
    setEvaluationState(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value
      }
    }));
  };
  
  const handleSaveStepEvaluation = (status: RemediationStepStatus, feedback?: string) => {
    if (!evaluatingStep) return;

    if (evaluatingStep.individualStrategy) {
        updateIndividualStepDetailsMutation.mutate({
            strategyId: evaluatingStep.individualStrategy.id,
            stepIndex: evaluatingStep.stepIndex,
            details: { status, feedback },
        });
    } else if (evaluatingStep.remediation) {
         updateStepDetailsMutation.mutate({
            remediationId: evaluatingStep.remediation.id,
            stepIndex: evaluatingStep.stepIndex,
            details: { status, feedback },
        });
    }
  };

  const handleAdjustStrategy = () => {
    if (!selectedRemediation && !selectedIndividualStrategy) return;
    setIsAdjusting(true);
    if(selectedRemediation) {
        generateRemediationMutation.mutate({
          students: selectedStudents,
          focus: selectedRemediation.focus,
          customPrompt: adjustPrompt,
          language: locale,
          existingStrategy: selectedRemediation,
        });
    } else if (selectedIndividualStrategy) {
         adjustIndividualStrategyMutation.mutate({
            existingStrategy: selectedIndividualStrategy,
            customPrompt: adjustPrompt,
        });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudents.length >= 2 && focus.trim()) {
      generateRemediationMutation.mutate({ students: selectedStudents, focus, customPrompt, language: locale });
    } else if (isIndividualMode && selectedStudents[0] && focus.trim()) {
        generateIndividualStrategyMutation.mutate({ student: selectedStudents[0], focus, customPrompt, language: locale });
    }
  };

  return {
    history,
    isLoadingHistory,
    individualHistory,
    isLoadingIndividualHistory,
    focus,
    setFocus,
    customPrompt,
    setCustomPrompt,
    evaluationState,
    handleEvaluationChange,
    handleUpdateRemediation,
    updateRemediationMutation,
    updateIndividualStrategyMutation,
    generateRemediationMutation,
    generateIndividualStrategyMutation,
    handleSubmit,
    selectedRemediation,
    setSelectedRemediation,
    selectedIndividualStrategy,
    setSelectedIndividualStrategy,
    evaluatingStep,
    setEvaluatingStep,
    handleSaveStepEvaluation,
    updateStepDetailsMutation,
    updateIndividualStepDetailsMutation,
    adjustPrompt,
    setAdjustPrompt,
    isAdjusting,
    setIsAdjusting,
    handleAdjustStrategy,
    adjustIndividualStrategyMutation,
    strategyToDelete,
    setStrategyToDelete,
    deleteIndividualStrategyMutation,
    deletingStrategyId,
    remediationToDelete,
    setRemediationToDelete,
    deleteRemediationMutation,
    deletingRemediationId,
    isIndividualMode,
  }
}
