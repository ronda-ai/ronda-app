
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useScopedI18n } from "@/locales/client";
import { FearManagementSuggestionDTO, FearManagementStepDTO } from "@/modules/fear-management-suggestion/application/dtos/fear-management-suggestion.dto";
import { FearUpdateSuggestionDTO } from "@/modules/fear-update-suggestion/application/dtos/fear-update-suggestion.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

type FearUpdateProposal = {
    fearToUpdate: string;
    updateProposal: string;
} | null;

export function useFearManagement(selectedStudent: StudentDTO | null, locale: string) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const tToast = useScopedI18n('toasts');
    const tCoach = useScopedI18n('coach');
    
    const [deletingFearSuggestionId, setDeletingFearSuggestionId] = useState<string | null>(null);
    const [fearUpdateProposal, setFearUpdateProposal] = useState<FearUpdateProposal>(null);

    const { data: fearManagementSuggestions = [], isLoading: isLoadingFearManagementSuggestions } = useQuery<FearManagementSuggestionDTO[]>({
        queryKey: ['fearManagementSuggestions', selectedStudent?.id],
        queryFn: () => fetch(`/api/students/${selectedStudent?.id}/fear-management`).then(res => res.json()),
        enabled: !!selectedStudent,
    });

    const generateFearManagementSuggestion = useMutation({
        mutationFn: (student: StudentDTO) =>
            fetch('/api/suggestions/fear-management', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student, language: locale }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fearManagementSuggestions', selectedStudent?.id] });
        },
        onError: () => {
            toast({
                title: tToast('aiSuggestionFailed'),
                variant: 'destructive',
            });
        },
    });

    const generateTargetedFearSuggestion = useMutation({
        mutationFn: ({ student, fear }: { student: StudentDTO, fear: string }) =>
            fetch('/api/suggestions/fear-management', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student, targetedFear: fear, language: locale }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fearManagementSuggestions', selectedStudent?.id] });
        },
        onError: () => {
            toast({
                title: tToast('aiSuggestionFailed'),
                variant: 'destructive',
            });
        },
    });

    const addFearFeedback = useMutation({
        mutationFn: ({ suggestion, feedback }: { suggestion: FearManagementSuggestionDTO; feedback: string }) => {
            if (!selectedStudent) return Promise.reject('No student selected');
            return fetch('/api/suggestions/fear-management-feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student: { name: selectedStudent.name, fears: selectedStudent.fears },
                    originalSuggestion: suggestion.rationale, // Use rationale as a proxy for the original suggestion text
                    originalSuggestionId: suggestion.id,
                    teacherFeedback: feedback,
                    language: locale,
                }),
            }).then(res => res.json());
        },
        onSuccess: (data: FearUpdateSuggestionDTO) => {
            queryClient.invalidateQueries({ queryKey: ['fearManagementSuggestions', selectedStudent?.id] });
            toast({ title: tToast('feedbackSaved') });
            if (data.hasUpdate) {
                setFearUpdateProposal({
                    fearToUpdate: data.fearToUpdate,
                    updateProposal: data.updateProposal,
                });
            }
        },
        onError: () => toast({ title: tToast('feedbackFailed'), variant: 'destructive' }),
    });

    const updateStudentFearsMutation = useMutation({
        mutationFn: (fearToRemove: string) => {
            if (!selectedStudent) return Promise.reject('No student selected');
            const updatedFears = selectedStudent.fears?.filter(f => f !== fearToRemove) || [];
            return fetch(`/api/students/${selectedStudent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fears: updatedFears }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            toast({ title: tCoach('fearManagement.toastFearUpdated') });
            setFearUpdateProposal(null);
        },
        onError: () => toast({ title: tCoach('fearManagement.toastFearUpdateFailed'), variant: 'destructive' }),
    });

    const deleteFearSuggestion = useMutation({
        mutationFn: (suggestionId: string) =>
            fetch(`/api/suggestions/fear-management/${suggestionId}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fearManagementSuggestions', selectedStudent?.id] });
            setDeletingFearSuggestionId(null);
            toast({ title: tCoach('fearManagement.toastDeleted') });
        },
        onError: () => {
            toast({
                title: tCoach('fearManagement.toastDeleteFailed'),
                variant: 'destructive',
            });
            setDeletingFearSuggestionId(null);
        },
    });

    const updateStepDetails = useMutation({
        mutationFn: ({ suggestionId, stepIndex, details }: { suggestionId: string; stepIndex: number; details: Partial<FearManagementStepDTO> }) =>
            fetch(`/api/suggestions/fear-management/${suggestionId}/steps/${stepIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fearManagementSuggestions', selectedStudent?.id] });
            toast({ title: tToast('feedbackSaved') });
        },
        onError: () => toast({ title: tToast('feedbackFailed'), variant: 'destructive' }),
    });
    
    const handleAcceptFearUpdate = () => {
        if (fearUpdateProposal?.fearToUpdate) {
            updateStudentFearsMutation.mutate(fearUpdateProposal.fearToUpdate);
        }
    };

    return {
        fearManagementSuggestions,
        isLoadingFearManagementSuggestions,
        generateFearManagementSuggestion,
        generateTargetedFearSuggestion,
        addFearFeedback,
        deleteFearSuggestion,
        fearUpdateProposal,
        setFearUpdateProposal,
        handleAcceptFearUpdate,
        deletingFearSuggestionId,
        setDeletingFearSuggestionId,
        updateStepDetails,
    };
}
