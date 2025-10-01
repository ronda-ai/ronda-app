
'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useScopedI18n } from "@/locales/client";
import { MoodTrendAnalysisDTO } from "@/modules/mood-trend-analysis/application/dtos/mood-trend-analysis.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

export function useMoodAnalysis(selectedStudentId: string | null, locale: string) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const tToast = useScopedI18n('toasts');
    const tCoach = useScopedI18n('coach.moodAnalysis');

    const { data: studentMoodAnalyses = [], isLoading: isLoadingStudentMoodAnalyses } = useQuery<MoodTrendAnalysisDTO[]>({
        queryKey: ['moodAnalyses', selectedStudentId],
        queryFn: () => fetch(`/api/suggestions/mood-analysis/student/${selectedStudentId}`).then(res => res.json()),
        enabled: !!selectedStudentId,
    });

    const { data: classroomMoodAnalyses = [], isLoading: isLoadingClassroomMoodAnalyses } = useQuery<MoodTrendAnalysisDTO[]>({
        queryKey: ['moodAnalyses', 'classroom'],
        queryFn: () => fetch('/api/suggestions/mood-analysis/classroom').then(res => res.json()),
        enabled: !selectedStudentId,
    });

    const generateStudentMoodAnalysis = useMutation({
        mutationFn: (student: StudentDTO) =>
            fetch('/api/suggestions/mood-analysis/student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student, language: locale }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['moodAnalyses', selectedStudentId] });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
    });

    const generateClassroomMoodAnalysis = useMutation({
        mutationFn: () =>
            fetch('/api/suggestions/mood-analysis/classroom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language: locale }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['moodAnalyses', 'classroom'] });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
    });

    const deleteMoodAnalysisMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/suggestions/mood-analysis/${id}`, { method: 'DELETE' }),
        onSuccess: (_, deletedId) => {
            queryClient.invalidateQueries({ queryKey: ['moodAnalyses', selectedStudentId] });
            queryClient.invalidateQueries({ queryKey: ['moodAnalyses', 'classroom'] });
            toast({ title: tCoach('toastDeleted') });
        },
        onError: () => toast({ title: tCoach('toastDeleteFailed'), variant: 'destructive' }),
    });


    return {
        studentMoodAnalyses,
        isLoadingStudentMoodAnalyses,
        classroomMoodAnalyses,
        isLoadingClassroomMoodAnalyses,
        generateStudentMoodAnalysis,
        generateClassroomMoodAnalysis,
        deleteMoodAnalysisMutation,
    };
}
