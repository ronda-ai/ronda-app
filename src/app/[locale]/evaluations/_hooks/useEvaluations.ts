
'use client';

import { useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { ChallengeHistoryDTO } from '@/modules/challenge/application/dtos/challenge-history.dto';
import { EvaluateChallengeDTO } from '@/modules/evaluation/application/dtos/evaluate-challenge.dto';

export type EvaluatingChallenge = {
  challenge: ChallengeHistoryDTO;
  studentName: string;
} | null;

const EVALUATIONS_PER_PAGE = 4;

export function useEvaluations() {
  const queryClient = useQueryClient();
  const [evaluatingChallenge, setEvaluatingChallenge] = useState<EvaluatingChallenge>(null);
  const [currentPageByStudent, setCurrentPageByStudent] = useState<Record<string, number>>({});


  const { data: students = [], isLoading: isLoadingStudents } = useQuery<StudentDTO[]>({
    queryKey: ['students'],
    queryFn: () => fetch('/api/students').then(res => res.json()),
  });

  const { data: challenges = [], isLoading: isLoadingChallenges } = useQuery<ChallengeHistoryDTO[]>({
    queryKey: ['challenges'],
    queryFn: () => fetch('/api/challenges/history').then(res => res.json()),
  });

  const evaluateChallengeMutation = useMutation({
    mutationFn: (data: EvaluateChallengeDTO) =>
      fetch('/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      setEvaluatingChallenge(null);
    },
  });

  const handleOpenDialog = (challenge: ChallengeHistoryDTO) => {
    const student = students.find(s => s.id === challenge.studentId);
    if (student) {
      setEvaluatingChallenge({
        challenge,
        studentName: student.name,
      });
    }
  };

  const handleSaveEvaluation = async (
    rating: NonNullable<ChallengeHistoryDTO['rating']>,
    feedback: string,
    mood: string
  ) => {
    if (!evaluatingChallenge) return;

    evaluateChallengeMutation.mutate({
      challengeId: evaluatingChallenge.challenge.id,
      rating,
      feedback,
      mood,
    });
  };

  const studentChallengeMap = useMemo(() => {
      return challenges.reduce((acc, challenge) => {
        if (!acc[challenge.studentId]) {
            acc[challenge.studentId] = [];
        }
        acc[challenge.studentId].push(challenge);
        return acc;
    }, {} as Record<string, ChallengeHistoryDTO[]>);
  }, [challenges]);


  const studentsWithChallenges = useMemo(() => {
      return students.filter(student => studentChallengeMap[student.id]?.length > 0);
  }, [students, studentChallengeMap]);

  const handlePageChange = (studentId: string, newPage: number) => {
    setCurrentPageByStudent(prev => ({
        ...prev,
        [studentId]: newPage,
    }));
  };

  return {
    students,
    isLoadingStudents,
    challenges,
    isLoadingChallenges,
    evaluatingChallenge,
    setEvaluatingChallenge,
    evaluateChallengeMutation,
    handleOpenDialog,
    handleSaveEvaluation,
    studentChallengeMap,
    studentsWithChallenges,
    currentPageByStudent,
    handlePageChange,
    EVALUATIONS_PER_PAGE,
  };
}
