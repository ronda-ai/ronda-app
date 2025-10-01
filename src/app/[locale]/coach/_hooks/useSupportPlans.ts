
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useScopedI18n } from "@/locales/client";
import { SupportPlanDTO, SupportPlanStepDTO } from "@/modules/support-plan/application/dtos/support-plan.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { ChallengeHistoryDTO } from "@/modules/challenge/application/dtos/challenge-history.dto";

export function useSupportPlans(
    selectedStudent: StudentDTO | null,
    locale: string,
    allStudents: StudentDTO[],
    observations: ObservationDTO[],
    challengeHistory: ChallengeHistoryDTO[]
) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const tToast = useScopedI18n('toasts');
    const tCoach = useScopedI18n('coach');
    const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);

    const { data: supportPlans = [], isLoading: isLoadingSupportPlans } = useQuery<SupportPlanDTO[]>({
        queryKey: ['supportPlans', selectedStudent?.id],
        queryFn: () => fetch(`/api/support-plans/${selectedStudent?.id}`).then(res => res.json()),
        enabled: !!selectedStudent,
    });

    const generateSupportPlan = useMutation({
        mutationFn: (student: StudentDTO) =>
            fetch('/api/suggestions/support-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student,
                    allStudents: allStudents,
                    previousPlans: supportPlans,
                    observations,
                    challengeHistory,
                    language: locale,
                }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supportPlans', selectedStudent?.id] });
        },
        onError: () => {
            toast({
                title: tToast('aiSuggestionFailed'),
                variant: 'destructive',
            });
        },
    });

    const addFeedbackToPlan = useMutation({
        mutationFn: ({ planId, feedback }: { planId: string; feedback: string }) =>
            fetch(`/api/support-plans/${planId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teacherFeedback: feedback }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supportPlans', selectedStudent?.id] });
            toast({ title: tToast('feedbackSaved') });
        },
        onError: () => {
            toast({ title: tToast('feedbackFailed'), variant: 'destructive' });
        },
    });

    const updateStepDetails = useMutation({
        mutationFn: ({ planId, stepIndex, details }: { planId: string; stepIndex: number; details: Partial<SupportPlanStepDTO> }) =>
            fetch(`/api/support-plans/${planId}/steps/${stepIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supportPlans', selectedStudent?.id] });
            toast({ title: tToast('feedbackSaved') });
        },
        onError: () => toast({ title: tToast('feedbackFailed'), variant: 'destructive' }),
    });

    const deleteSupportPlan = useMutation({
        mutationFn: (planId: string) =>
            fetch(`/api/support-plans/${planId}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supportPlans', selectedStudent?.id] });
            setDeletingPlanId(null);
            toast({ title: tCoach('supportPlan.toastDeleted') });
        },
        onError: () => {
            toast({
                title: tCoach('supportPlan.toastDeleteFailed'),
                variant: 'destructive',
            });
            setDeletingPlanId(null);
        },
    });

    return {
        supportPlans,
        isLoadingSupportPlans,
        generateSupportPlan,
        addFeedbackToPlan,
        updateStepDetails,
        deleteSupportPlan,
        deletingPlanId,
        setDeletingPlanId,
    };
}
