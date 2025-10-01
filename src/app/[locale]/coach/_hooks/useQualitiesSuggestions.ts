
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useScopedI18n } from "@/locales/client";
import { QualitiesSuggestionDTO } from "@/modules/qualities-suggestion/application/dtos/qualities-suggestion.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

export function useQualitiesSuggestions(selectedStudent: StudentDTO | null, locale: string) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const tToast = useScopedI18n('toasts');
    
    const [qualitiesSuggestions, setQualitiesSuggestions] = useState<string[]>([]);
    const [isQualitiesDialogOpen, setIsQualitiesDialogOpen] = useState(false);
    const [qualitiesUpdateAction, setQualitiesUpdateAction] = useState<'add' | 'replace' | null>(null);

    const { data: qualitiesSuggestionHistory = [], isLoading: isLoadingQualitiesSuggestionHistory } = useQuery<QualitiesSuggestionDTO[]>({
        queryKey: ['qualitiesSuggestions', selectedStudent?.id],
        queryFn: () => fetch(`/api/suggestions/qualities/${selectedStudent?.id}`).then(res => res.json()),
        enabled: !!selectedStudent,
    });

    const generateQualitiesSuggestion = useMutation({
        mutationFn: (student: StudentDTO) =>
            fetch('/api/suggestions/qualities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student, language: locale }),
            }).then(res => res.json()),
        onSuccess: (data: QualitiesSuggestionDTO) => {
            if (data.suggestions) {
                setQualitiesSuggestions(data.suggestions);
                setIsQualitiesDialogOpen(true);
                queryClient.invalidateQueries({ queryKey: ['qualitiesSuggestions', selectedStudent?.id] });
            }
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
    });

    const updateStudentQualitiesMutation = useMutation({
        mutationFn: (updatedQualities: string[]) => {
            if (!selectedStudent) return Promise.reject('No student selected');
            return fetch(`/api/students/${selectedStudent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ qualities: updatedQualities }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            toast({ title: tToast('qualitiesUpdated') });
            resetQualitiesDialog();
        },
        onError: () => toast({ title: tToast('qualitiesUpdateFailed'), variant: 'destructive' }),
    });
    
    const resetQualitiesDialog = () => {
        setIsQualitiesDialogOpen(false);
        setQualitiesSuggestions([]);
        setQualitiesUpdateAction(null);
    };

    const handleAcceptQualities = () => {
        if (!selectedStudent) return;
        let newQualities: string[] = [];
        if (qualitiesUpdateAction === 'add') {
            newQualities = [...new Set([...selectedStudent.qualities, ...qualitiesSuggestions])];
        } else if (qualitiesUpdateAction === 'replace') {
            newQualities = qualitiesSuggestions;
        }
        if (newQualities.length > 0) {
            updateStudentQualitiesMutation.mutate(newQualities);
        } else {
            resetQualitiesDialog();
        }
    };


    return {
        qualitiesSuggestionHistory,
        isLoadingQualitiesSuggestionHistory,
        generateQualitiesSuggestion,
        qualitiesSuggestions,
        isQualitiesDialogOpen,
        setIsQualitiesDialogOpen,
        qualitiesUpdateAction,
        setQualitiesUpdateAction,
        handleAcceptQualities,
        resetQualitiesDialog
    };
}
