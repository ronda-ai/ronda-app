

'use client';

import React, { useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { GroupActivitySuggestionDTO } from '@/modules/group-activity-suggestion/application/dtos/group-activity-suggestion.dto';
import { ManualGroupActivityDTO } from '@/modules/manual-group-activity/application/dtos/manual-group-activity.dto';
import { CurriculumActivityDTO } from '@/modules/curriculum-activity/application/dtos/curriculum-activity.dto';

export function useGroupActivities() {
  const tGroupActivity = useScopedI18n('groupActivities');
  const tToast = useScopedI18n('toasts');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedStudents, setSelectedStudents] = useState<StudentDTO[]>([]);
  const [analysisForGroup, setAnalysisForGroup] = useState<string | null>(null);
  const [suggestionToDelete, setSuggestionToDelete] = useState<string | null>(
    null
  );
  const [adaptingGroup, setAdaptingGroup] =
    useState<ManualGroupActivityDTO | null>(null);
  const [viewingGroup, setViewingGroup] = useState<ManualGroupActivityDTO | null>(null);

  const { data: allStudents = [], isLoading: isLoadingStudents } = useQuery<
    StudentDTO[]
  >({
    queryKey: ['students'],
    queryFn: () => fetch('/api/students').then(res => res.json()),
  });

  const { data: suggestions = [], isLoading: isLoadingSuggestions } = useQuery<
    GroupActivitySuggestionDTO[]
  >({
    queryKey: ['groupActivitySuggestions'],
    queryFn: () =>
      fetch('/api/suggestions/group-activities').then(res => res.json()),
  });

  const { data: manualGroups = [], isLoading: isLoadingManualGroups } =
    useQuery<ManualGroupActivityDTO[]>({
      queryKey: ['manualGroupActivities'],
      queryFn: () =>
        fetch('/api/manual-group-activities').then(res => res.json()),
    });

  const conflictWarning = useMemo(() => {
    if (selectedStudents.length < 2) return null;

    for (let i = 0; i < selectedStudents.length; i++) {
      for (let j = i + 1; j < selectedStudents.length; j++) {
        const studentA = selectedStudents[i];
        const studentB = selectedStudents[j];

        if (studentA.badRelations?.includes(studentB.id) || studentB.badRelations?.includes(studentA.id)) {
          return tGroupActivity('manualMode.conflictWarning', { nameA: studentA.name, nameB: studentB.name });
        }
      }
    }
    return null;
  }, [selectedStudents, tGroupActivity]);

  const generateSuggestionMutation = useMutation({
    mutationFn: () =>
      fetch('/api/suggestions/group-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: locale }),
      }).then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupActivitySuggestions'] });
    },
    onError: () => {
      toast({
        title: tToast('aiSuggestionFailed'),
        description: tToast('aiSuggestionFailedDescription'),
        variant: 'destructive',
      });
    },
  });

  const analyzeGroupDynamicsMutation = useMutation({
    mutationFn: (group: ManualGroupActivityDTO) =>
      fetch('/api/suggestions/group-activity-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          students: group.members,
          language: locale,
        }),
      }).then(res => res.json()),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ['manualGroupActivities'],
        (oldData: ManualGroupActivityDTO[] | undefined) =>
          oldData?.map(g =>
            g.id === variables.id ? { ...g, dynamicAnalysis: data.teacherTip } : g
          )
      );
      setAnalysisForGroup(null);
    },
    onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
    onMutate: group => setAnalysisForGroup(group.id),
  });

  const generateGroupActivityMutation = useMutation({
    mutationFn: (group: ManualGroupActivityDTO) => {
      return fetch('/api/manual-group-activities/generate-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group,
          language: locale,
        }),
      }).then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      });
    },
    onSuccess: (data: ManualGroupActivityDTO) => {
      queryClient.invalidateQueries({ queryKey: ['manualGroupActivities']});
      toast({ title: tGroupActivity('manualMode.activityGeneratedToast') });
    },
    onError: () => {
      toast({
        title: tToast('aiSuggestionFailed'),
        variant: 'destructive',
      });
    },
  });

  const createManualGroupMutation = useMutation({
    mutationFn: (
      newGroup: Partial<
        Omit<
          ManualGroupActivityDTO,
          'id' | 'createdAt' | 'updatedAt' | 'members'
        >
      > & { memberIds: string[] }
    ) =>
      fetch('/api/manual-group-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manualGroupActivities'] });
      setSelectedStudents([]);
    },
  });

  const updateManualGroupMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ManualGroupActivityDTO>;
    }) =>
      fetch(`/api/manual-group-activities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manualGroupActivities'] });
      setViewingGroup(null);
    },
  });

  const deleteManualGroupMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/manual-group-activities/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manualGroupActivities'] });
    },
  });

  const deleteSuggestionMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/suggestions/group-activities/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupActivitySuggestions'] });
      toast({ title: tGroupActivity('history.toastDeleted') });
      setSuggestionToDelete(null);
    },
    onError: () => {
      toast({
        title: tGroupActivity('history.toastDeleteFailed'),
        variant: 'destructive',
      });
      setSuggestionToDelete(null);
    },
  });

  const studentOptions = allStudents.map(s => ({ value: s, label: s.name }));
  const selectedStudentOptions = selectedStudents.map(s => ({
    value: s,
    label: s.name,
  }));

  const handleCreateGroup = () => {
    if (selectedStudents.length < 2) return;
    createManualGroupMutation.mutate({
      memberIds: selectedStudents.map(s => s.id),
    });
  };

  const handleUseSuggestion = (suggestion: GroupActivitySuggestionDTO) => {
    suggestion.suggestedGroups.forEach(groupNames => {
      const memberIds = allStudents
        .filter(student => groupNames.includes(student.name))
        .map(student => student.id);

      if (memberIds.length > 0) {
        createManualGroupMutation.mutate({
          memberIds,
          skills: suggestion.suggestedSkills,
          themes: suggestion.suggestedThemes,
        });
      }
    });
    toast({ title: tGroupActivity('history.suggestionUsedToast') });
  };

  const handleRemoveGroup = (groupId: string) => {
    deleteManualGroupMutation.mutate(groupId);
  };

  const handleGroupInputChange = (
    groupId: string,
    field: 'skills' | 'themes',
    value: string
  ) => {
    updateManualGroupMutation.mutate({
      id: groupId,
      data: { [field]: value.split(',').map(s => s.trim()).filter(Boolean) },
    });
  };

  const handleGenerateActivity = (group: ManualGroupActivityDTO) => {
    generateGroupActivityMutation.mutate(group);
  };
  
  const handleDeleteActivities = (groupId: string) => {
    updateManualGroupMutation.mutate({
        id: groupId,
        data: { activities: [] }
    });
  }

  return {
    allStudents,
    isLoadingStudents,
    suggestions,
    isLoadingSuggestions,
    manualGroups,
    isLoadingManualGroups,
    selectedStudents,
    setSelectedStudents,
    analysisForGroup,
    setAnalysisForGroup,
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
  };
}
