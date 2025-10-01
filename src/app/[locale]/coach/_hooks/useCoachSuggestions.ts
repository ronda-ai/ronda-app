
'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useScopedI18n } from "@/locales/client";
import { CoachSuggestionDTO } from "@/modules/coach-suggestion/application/dtos/coach-suggestion.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";

export function useCoachSuggestions(
    selectedStudent: StudentDTO | null,
    locale: string,
    allStudents: StudentDTO[],
    observations: ObservationDTO[],
) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const tToast = useScopedI18n('toasts');
    const tCoach = useScopedI18n('coach.coachSuggestion');

    const { data: coachSuggestions = [], isLoading: isLoadingCoachSuggestions } = useQuery<CoachSuggestionDTO[]>({
        queryKey: ['coachSuggestions', selectedStudent?.id],
        queryFn: () => fetch(`/api/suggestions/coach/${selectedStudent?.id}`).then(res => res.json()),
        enabled: !!selectedStudent,
    });

    const generateCoachSuggestion = useMutation({
        mutationFn: (student: StudentDTO) =>
            fetch('/api/suggestions/coach', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student,
                    allStudents: allStudents,
                    observations,
                    language: locale,
                }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coachSuggestions', selectedStudent?.id] });
        },
        onError: () => {
            toast({
                title: tToast('aiSuggestionFailed'),
                variant: 'destructive',
            });
        },
    });
    
    const deleteCoachSuggestion = useMutation({
        mutationFn: (suggestionId: string) => 
            fetch(`/api/suggestions/coach/suggestion/${suggestionId}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coachSuggestions', selectedStudent?.id] });
            toast({ title: tCoach('toastDeleted') });
        },
        onError: () => {
            toast({ title: tCoach('toastDeleteFailed'), variant: 'destructive' });
        }
    })

    return { coachSuggestions, isLoadingCoachSuggestions, generateCoachSuggestion, deleteCoachSuggestion };
}
