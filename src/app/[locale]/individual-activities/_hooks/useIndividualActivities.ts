

'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { PersonalizedActivityDTO, PersonalizedActivityStepDTO, PersonalizedActivityStepStatus } from '@/modules/personalized-activity/application/dtos/personalized-activity.dto';
import { ActivitySuggestionDTO } from '@/modules/activity-suggestion/application/dtos/activity-suggestion.dto';
import { CurriculumActivityDTO } from '@/modules/curriculum-activity/application/dtos/curriculum-activity.dto';
import { SkillDTO } from '@/modules/skill/application/dtos/skill.dto';

export type EvaluatingStep = {
  plan: PersonalizedActivityDTO;
  step: PersonalizedActivityStepDTO;
  stepIndex: number;
} | null;


export function useIndividualActivities() {
    const tIndividualActivity = useScopedI18n('individualActivities');
    const tToast = useScopedI18n('toasts');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [topic, setTopic] = useState('');
    const [skills, setSkills] = useState<Set<string>>(new Set());
    const [themes, setThemes] = useState('');
    const [customPrompt, setCustomPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [feedbackValues, setFeedbackValues] = useState<Record<string, string>>({});
    const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
    const [evaluatingStep, setEvaluatingStep] = useState<EvaluatingStep>(null);
    const [adaptingPlan, setAdaptingPlan] = useState<PersonalizedActivityDTO | null>(null);
    const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingSkill, setEditingSkill] = useState<SkillDTO | null>(null);

    const { data: students = [], isLoading: isLoadingStudents } = useQuery<StudentDTO[]>({
        queryKey: ['students'],
        queryFn: () => fetch('/api/students').then(res => res.json()),
        initialData: [],
    });

    const { data: history = [], isLoading: isLoadingHistory } = useQuery<PersonalizedActivityDTO[]>({
        queryKey: ['personalizedActivities', selectedStudentId],
        queryFn: () => fetch(`/api/personalized-activities/${selectedStudentId}`).then(res => res.json()),
        enabled: !!selectedStudentId,
    });
    
    const { data: availableSkills = [], isLoading: isLoadingSkills } = useQuery<SkillDTO[]>({
        queryKey: ['skills'],
        queryFn: () => fetch('/api/skills').then(res => res.json()),
    });

    const selectedStudent = students.find(s => s.id === selectedStudentId);

    const generateSuggestionsMutation = useMutation({
        mutationFn: (student: StudentDTO) =>
            fetch('/api/suggestions/activity-ideas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student, language: locale }),
            }).then(res => {
                if (!res.ok) throw new Error('API Error');
                return res.json();
            }),
        onSuccess: (data: ActivitySuggestionDTO & { customPromptSuggestion?: string, negativePromptSuggestion?: string }) => {
            setTopic(data.topics.join(', '));
            setThemes(data.themes.join(', '));
            if (data.customPromptSuggestion) {
                setCustomPrompt(data.customPromptSuggestion);
            }
            if (data.negativePromptSuggestion) {
                setNegativePrompt(data.negativePromptSuggestion);
            }
            toast({ title: tIndividualActivity('suggestions.toastSuccess') })
        },
        onError: () => {
          toast({
            title: tToast('aiSuggestionFailed'),
            variant: 'destructive',
          });
        },
    });

    const generateActivitiesMutation = useMutation({
        mutationFn: () => {
            if (!selectedStudent || !topic) return Promise.reject("Missing data");
            return fetch('/api/suggestions/curriculum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic,
                    skills: Array.from(skills),
                    language: locale,
                    student: selectedStudent,
                    classInterests: themes.split(',').map(s => s.trim()).filter(Boolean),
                    customPrompt,
                    negativePrompt
                }),
            }).then(res => {
                if (!res.ok) throw new Error('API Error');
                return res.json();
            });
        },
        onSuccess: (data: CurriculumActivityDTO) => {
            queryClient.invalidateQueries({ queryKey: ['personalizedActivities', selectedStudentId]});
            resetForm();
            toast({ title: tIndividualActivity('generator.toastSuccess') })
        },
        onError: () => {
          toast({
            title: tToast('aiSuggestionFailed'),
            variant: 'destructive',
          });
        },
    });

    const addFeedbackMutation = useMutation({
        mutationFn: ({ planId, feedback }: { planId: string, feedback: string }) =>
            fetch(`/api/personalized-activities/${planId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedback }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personalizedActivities', selectedStudentId] });
            toast({ title: tToast('feedbackSaved') });
        },
        onError: () => {
            toast({ title: tToast('feedbackFailed'), variant: 'destructive' });
        }
    });

    const deleteActivityMutation = useMutation({
        mutationFn: (planId: string) => fetch(`/api/personalized-activities/${planId}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personalizedActivities', selectedStudentId] });
            setDeletingPlanId(null);
            toast({ title: tIndividualActivity('history.toastDeleted') });
        },
        onError: () => {
          toast({ title: tIndividualActivity('history.toastDeleteFailed'), variant: 'destructive' });
          setDeletingPlanId(null);
        }
    });

    const updateStepDetailsMutation = useMutation({
        mutationFn: ({ planId, stepIndex, details }: { planId: string; stepIndex: number; details: Partial<PersonalizedActivityStepDTO> }) =>
          fetch(`/api/personalized-activities/${planId}/steps/${stepIndex}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(details),
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['personalizedActivities', selectedStudentId] });
          setEvaluatingStep(null);
          toast({ title: tToast('feedbackSaved') });
        },
        onError: () => toast({ title: tToast('feedbackFailed'), variant: 'destructive' }),
    });
    
    const handleSkillChange = (skillName: string) => {
        if (isEditMode) {
            const skillToEdit = availableSkills.find(s => s.name === skillName);
            if(skillToEdit) setEditingSkill(skillToEdit);
            return;
        }
        setSkills(prev => {
          const newSkills = new Set(prev);
          if (newSkills.has(skillName)) {
            newSkills.delete(skillName);
          } else {
            newSkills.add(skillName);
          }
          return newSkills;
        });
    };

    const handleSelectStudent = (studentId: string) => {
        setSelectedStudentId(studentId);
        resetForm();
    };
  
    const resetForm = () => {
        setTopic('');
        setSkills(new Set());
        setThemes('');
        setCustomPrompt('');
        setNegativePrompt('');
    };

    const handleGenerateSuggestions = () => {
        if (selectedStudent) {
            generateSuggestionsMutation.mutate(selectedStudent);
        }
    };
  
    const handleGenerateActivities = () => {
        generateActivitiesMutation.mutate();
    };
  
    const handleAddFeedback = (planId: string) => {
        const feedback = feedbackValues[planId];
        if (feedback && feedback.trim()) {
            addFeedbackMutation.mutate({ planId, feedback });
        }
    };
  
    const handleSaveStepEvaluation = (status: PersonalizedActivityStepStatus, feedback?: string) => {
        if (!evaluatingStep) return;
        updateStepDetailsMutation.mutate({
            planId: evaluatingStep.plan.id,
            stepIndex: evaluatingStep.stepIndex,
            details: { status, feedback },
        });
    };
    
     const handleOpenAddSkillDialog = () => {
        setIsAddSkillDialogOpen(true);
    }
    
    const handleToggleEditMode = () => {
        setIsEditMode(prev => !prev);
    }

    return {
        selectedStudentId,
        setSelectedStudentId,
        topic,
        setTopic,
        skills,
        setSkills,
        themes,
        setThemes,
        customPrompt,
        setCustomPrompt,
        negativePrompt,
        setNegativePrompt,
        feedbackValues,
        setFeedbackValues,
        deletingPlanId,
        setDeletingPlanId,
        evaluatingStep,
        setEvaluatingStep,
        adaptingPlan,
        setAdaptingPlan,
        students,
        isLoadingStudents,
        history,
        isLoadingHistory,
        selectedStudent,
        generateSuggestionsMutation,
        generateActivitiesMutation,
        addFeedbackMutation,
        deleteActivityMutation,
        updateStepDetailsMutation,
        handleSelectStudent,
        handleGenerateSuggestions,
        handleGenerateActivities,
        handleAddFeedback,
        handleSaveStepEvaluation,
        availableSkills,
        isLoadingSkills,
        handleSkillChange,
        isAddSkillDialogOpen,
        setIsAddSkillDialogOpen,
        handleOpenAddSkillDialog,
        isEditMode,
        handleToggleEditMode,
        editingSkill,
        setEditingSkill,
    };
}
