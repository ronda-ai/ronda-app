

'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';
import { CurriculumActivityDTO } from '@/modules/curriculum-activity/application/dtos/curriculum-activity.dto';
import { SkillDTO } from '@/modules/skill/application/dtos/skill.dto';
import { ActivityTopicSuggestionDTO } from '@/modules/curriculum-activity/application/dtos/activity-topic-suggestion.dto';

export type Complexity = 'beginner' | 'intermediate' | 'advanced';
export type Duration = 'short' | 'medium' | 'long';
export type LearningModality = 'kinesthetic' | 'visual' | 'auditory' | 'logical';
export type SocialDynamic = 'cooperative' | 'competitive';
export type BloomLevel = 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating' | 'Creating';
export type ResourceConstraint = 'digital-tools' | 'outdoor-space' | 'basic-supplies';

export function useActivityGenerator() {
  const tToast = useScopedI18n('toasts');
  const tActivity = useScopedI18n('activityGenerator');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [topic, setTopic] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [complexity, setComplexity] = useState<Complexity>('intermediate');
  const [duration, setDuration] = useState<Duration>('medium');
  const [learningModality, setLearningModality] = useState<LearningModality | 'any'>('any');
  const [socialDynamic, setSocialDynamic] = useState<SocialDynamic | 'any'>('any');
  const [bloomLevel, setBloomLevel] = useState<BloomLevel | 'any'>('any');
  const [resourceConstraints, setResourceConstraints] = useState<Set<ResourceConstraint>>(new Set());
  const [feedbackValues, setFeedbackValues] = useState<Record<string, string>>({});
  const [adaptingPlan, setAdaptingPlan] = useState<CurriculumActivityDTO | null>(null);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillDTO | null>(null);

  const { data: aiConfig, isLoading: isLoadingConfig } = useQuery<AIConfigurationDTO>({
    queryKey: ['aiConfiguration'],
    queryFn: () => fetch('/api/ai/configuration').then(res => res.ok ? res.json() : null),
  });

  const { data: activityHistory = [], isLoading: isLoadingHistory } = useQuery<CurriculumActivityDTO[]>({
    queryKey: ['curriculumActivities'],
    queryFn: () => fetch('/api/suggestions/curriculum').then(res => res.json()),
  });

  const { data: availableSkills = [], isLoading: isLoadingSkills } = useQuery<SkillDTO[]>({
    queryKey: ['skills'],
    queryFn: () => fetch('/api/skills').then(res => res.json()),
  });

  const handleSkillChange = (skillName: string) => {
    if (isEditMode) {
        const skillToEdit = availableSkills.find(s => s.name === skillName);
        if(skillToEdit) setEditingSkill(skillToEdit);
        return;
    }
    setSelectedSkills(prev => {
      const newSkills = new Set(prev);
      if (newSkills.has(skillName)) {
        newSkills.delete(skillName);
      } else {
        newSkills.add(skillName);
      }
      return newSkills;
    });
  };
  
    const handleResourceConstraintChange = (constraint: ResourceConstraint) => {
    setResourceConstraints(prev => {
      const newConstraints = new Set(prev);
      if (newConstraints.has(constraint)) {
        newConstraints.delete(constraint);
      } else {
        newConstraints.add(constraint);
      }
      return newConstraints;
    });
  };

  const handleOpenAddSkillDialog = () => {
    setIsAddSkillDialogOpen(true);
  }

  const generateActivitiesMutation = useMutation({
    mutationFn: () =>
      fetch('/api/suggestions/curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          skills: Array.from(selectedSkills),
          language: locale,
          ageOrGrade: aiConfig?.ageOrGrade,
          country: aiConfig?.country,
          subject: aiConfig?.subject,
          classInterests: aiConfig?.classInterests,
          complexity,
          duration,
          learningModality: learningModality === 'any' ? undefined : learningModality,
          socialDynamic: socialDynamic === 'any' ? undefined : socialDynamic,
          bloomLevel: bloomLevel === 'any' ? undefined : bloomLevel,
          resourceConstraints: Array.from(resourceConstraints),
        }),
      }).then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      }),
    onSuccess: (data: CurriculumActivityDTO) => {
        queryClient.invalidateQueries({ queryKey: ['curriculumActivities'] });
        setTopic('');
        setSelectedSkills(new Set());
    },
    onError: () => {
      toast({
        title: tToast('aiSuggestionFailed'),
        variant: 'destructive',
      });
    },
  });

  const generateTopicSuggestionMutation = useMutation<ActivityTopicSuggestionDTO, Error, void>({
    mutationFn: () => fetch('/api/suggestions/activity-topic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: locale,
        existingSkills: availableSkills.map(s => s.name),
        classContext: aiConfig?.subject,
      })
    }).then(res => {
      if (!res.ok) throw new Error('API Error');
      return res.json();
    }),
    onSuccess: (data) => {
      setTopic(data.topic);
      setSelectedSkills(new Set(data.skills));
      toast({ title: tActivity('form.suggestButton') });
    },
    onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' })
  });

  const addFeedbackMutation = useMutation({
      mutationFn: ({ id, feedback }: { id: string, feedback: string }) =>
          fetch(`/api/suggestions/curriculum/${id}/feedback`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ feedback }),
          }),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['curriculumActivities'] });
          toast({ title: tToast('feedbackSaved') });
      },
      onError: () => {
          toast({ title: tToast('feedbackFailed'), variant: 'destructive' });
      }
  });

  const deleteActivityMutation = useMutation({
    mutationFn: (id: string) => fetch(`/api/suggestions/curriculum/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculumActivities'] });
      setDeletingPlanId(null);
      toast({ title: tActivity('history.toastDeleted') });
    },
    onError: () => {
      toast({ title: tActivity('history.toastDeleteFailed'), variant: 'destructive' });
      setDeletingPlanId(null);
    }
  });
  
  const handleAddFeedback = (id: string) => {
    const feedback = feedbackValues[id];
    if (feedback && feedback.trim()) {
      addFeedbackMutation.mutate({ id, feedback });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && selectedSkills.size > 0) {
      generateActivitiesMutation.mutate();
    }
  };
  
  const handleGenerateTopicSuggestion = () => {
      generateTopicSuggestionMutation.mutate();
  }

  const handleToggleEditMode = () => {
    setIsEditMode(prev => !prev);
  }

  return {
    topic,
    setTopic,
    selectedSkills,
    handleSkillChange,
    complexity,
    setComplexity,
    duration,
    setDuration,
    learningModality,
    setLearningModality,
    socialDynamic,
    setSocialDynamic,
    bloomLevel,
    setBloomLevel,
    resourceConstraints,
    handleResourceConstraintChange,
    feedbackValues,
    setFeedbackValues,
    adaptingPlan,
    setAdaptingPlan,
    deletingPlanId,
    setDeletingPlanId,
    aiConfig,
    isLoadingConfig,
    activityHistory,
    isLoadingHistory,
    availableSkills,
    isLoadingSkills,
    generateActivitiesMutation,
    addFeedbackMutation,
    deleteActivityMutation,
    handleAddFeedback,
    handleSubmit,
    isAddSkillDialogOpen,
    setIsAddSkillDialogOpen,
    handleOpenAddSkillDialog,
    isEditMode,
    handleToggleEditMode,
    editingSkill,
    setEditingSkill,
    generateTopicSuggestionMutation,
    handleGenerateTopicSuggestion,
  };
}
