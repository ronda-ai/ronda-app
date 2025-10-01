
'use client';

import { useQuery } from "@tanstack/react-query";
import { ChallengeHistoryDTO } from "@/modules/challenge/application/dtos/challenge-history.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";

export function useStudentDetails(selectedStudentId: string | null) {
    const { data: challengeHistory = [] } = useQuery<ChallengeHistoryDTO[]>({
        queryKey: ['challengeHistory', selectedStudentId],
        queryFn: () => fetch(`/api/challenges/history/${selectedStudentId}`).then(res => res.json()),
        enabled: !!selectedStudentId,
    });

    const { data: observations = [] } = useQuery<ObservationDTO[]>({
        queryKey: ['observations', selectedStudentId],
        queryFn: () => fetch(`/api/students/${selectedStudentId}/observations`).then(res => res.json()),
        enabled: !!selectedStudentId,
    });

    return { observations, challengeHistory };
}
