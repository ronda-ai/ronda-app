
'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useScopedI18n } from "@/locales/client";
import { ConcernAnalysisDTO } from "@/modules/concern-analysis/application/dtos/concern-analysis.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { ChallengeHistoryDTO } from "@/modules/challenge/application/dtos/challenge-history.dto";

export function useConcernAnalysis(
    selectedStudentId: string | null,
    locale: string,
    students: StudentDTO[],
    observations: ObservationDTO[],
    challengeHistory: ChallengeHistoryDTO[]
) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const tToast = useScopedI18n('toasts');

    const { data: concernAnalyses = [], isLoading: isLoadingConcernAnalyses } = useQuery<ConcernAnalysisDTO[]>({
        queryKey: ['concernAnalyses', selectedStudentId],
        queryFn: () => fetch(`/api/suggestions/concern-analysis/${selectedStudentId}`).then(res => res.json()),
        enabled: !!selectedStudentId,
    });

    const generateConcernAnalysis = useMutation({
        mutationFn: (student: StudentDTO) =>
            fetch('/api/suggestions/concern-analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student,
                    allStudents: students,
                    observations,
                    challengeHistory,
                    language: locale,
                }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['concernAnalyses', selectedStudentId] });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
    });

    return { concernAnalyses, isLoadingConcernAnalyses, generateConcernAnalysis };
}
