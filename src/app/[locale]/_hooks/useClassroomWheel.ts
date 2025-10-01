
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useConfetti } from '@/hooks/use-confetti';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { useToast } from '@/hooks/use-toast';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { SelectionMode } from '@/modules/student/domain/student.entity';
import { GenerateChallengeForStudentInput, GenerateChallengeForStudentOutput } from '@/modules/challenge/application/dtos/generate-challenge-for-student.dto';
import { AcceptChallengeDTO } from '@/modules/student/application/dtos/accept-challenge.dto';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';

const MAX_ATTEMPTS = 3;

type SelectionData = {
  students: StudentDTO[];
  challenge: string;
  tip: string;
  attemptsLeft: number;
} | null;

const getRandomItem = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

export function useClassroomWheel(students: StudentDTO[]) {
  const queryClient = useQueryClient();
  const { launch } = useConfetti();
  const locale = useCurrentLocale();
  const tToast = useScopedI18n('toasts');
  const tHome = useScopedI18n('home');
  const { toast } = useToast();

  const [mode, setMode] = useState<SelectionMode>('random');
  const [isSpinning, setIsSpinning] = useState(false);
  const [isStudentSelectionOpen, setIsStudentSelectionOpen] = useState(false);
  const [selection, setSelection] = useState<SelectionData>(null);
  const [challengeRequest, setChallengeRequest] = useState<GenerateChallengeForStudentInput | null>(null);
  const [challengeHistory, setChallengeHistory] = useState<{challenge: string; tip: string}[]>([]);

  const { data: savedConfig } = useQuery<AIConfigurationDTO>({
    queryKey: ['aiConfiguration'],
    queryFn: () => fetch('/api/ai/configuration').then(res => res.ok ? res.json() : null),
  });

  const generateChallengeMutation = useMutation<
    GenerateChallengeForStudentOutput,
    Error,
    GenerateChallengeForStudentInput
  >({
    mutationFn: async request => {
      const res = await fetch('/api/challenges/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request),
      });

      if (res.status === 503) {
          throw new Error('503 Service Unavailable');
      }

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to generate challenge');
      }
      return res.json();
    }
  });

  const acceptChallengeMutation = useMutation<void, Error, AcceptChallengeDTO>({
    mutationFn: request =>
      fetch('/api/challenges/accept', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to accept challenge');
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['students']});
      setSelection(null);
      setChallengeRequest(null);
      launch();
    },
  });

  const rejectChallengeMutation = useMutation<void, Error, AcceptChallengeDTO>({
    mutationFn: request =>
      fetch('/api/challenges/reject', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to reject challenge');
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['students']});
      setSelection(null);
      setChallengeRequest(null);
      toast({ title: tToast('challengeRejected') })
    },
  });

  const availableStudents = students.filter(s => !s.isAbsent);

  const selectStudents = async (): Promise<StudentDTO[] | null> => {
    const requiredStudents = mode === 'pair' ? 2 : 1;
    if (availableStudents.length < requiredStudents) {
      toast({
        title: tToast('noStudents'),
        variant: 'destructive',
      });
      return null;
    }

    if (mode === 'pair') {
      const shuffled = [...availableStudents].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 2);
    }

    let selectedStudent: StudentDTO;

    if (mode === 'weighted') {
      try {
        const res = await fetch('/api/ai/weighted-random-student', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            studentNames: availableStudents.map(s => s.name),
            participationCounts: availableStudents.map(s => s.participation),
          }),
        });
        if (!res.ok) throw new Error('AI selection failed');
        const result = await res.json();

        const foundStudent = availableStudents.find(
          s => s.name === result.selectedStudent
        );
        if (!foundStudent) {
          toast({
            title: tToast('aiError'),
            variant: 'destructive',
          });
          return null;
        }
        selectedStudent = foundStudent;
      } catch (error) {
        console.error(error);
        toast({
          title: tToast('aiSelectionFailed'),
          variant: 'destructive',
        });
        selectedStudent = getRandomItem(availableStudents);
      }
    } else {
      selectedStudent = getRandomItem(availableStudents);
    }
    return [selectedStudent];
  };

  const startChallengeFlow = async (
    selectedStudents: StudentDTO[],
    selectionMode: SelectionMode
  ) => {
    const request: GenerateChallengeForStudentInput = {
      students: selectedStudents.map(s => ({
        name: s.name,
        qualities: s.qualities,
        age: s.age,
        notes: s.notes,
        disability: s.disability,
        neurodiversity: s.neurodiversity,
        fears: s.fears,
        gender: s.gender,
        goodRelations: s.goodRelations
          ?.map(id => students.find(s => s.id === id)?.name)
          .filter(Boolean) as string[],
        badRelations: s.badRelations
          ?.map(id => students.find(s => s.id === id)?.name)
          .filter(Boolean) as string[],
      })),
      language: locale,
      selectionMode: selectionMode,
      subject: savedConfig?.subject || 'general',
      ageOrGrade: savedConfig?.ageOrGrade,
      country: savedConfig?.country,
      challengeLocation: savedConfig?.challengeLocation,
      customPrompt: savedConfig?.customPrompt,
      negativePrompt: savedConfig?.negativePrompt,
      challengeHistory: challengeHistory,
      classInterests: savedConfig?.classInterests,
    };

    setChallengeRequest(request);
    await handleChallenge(request, MAX_ATTEMPTS);
  };

  const handleSpin = async () => {
    setIsSpinning(true);
    const selectedStudents = await selectStudents();

    setTimeout(async () => {
      if (selectedStudents && selectedStudents.length > 0) {
        await startChallengeFlow(selectedStudents, mode);
      }
      setIsSpinning(false);
    }, 2000); // Simulate spinning duration
  };

  const handleChallenge = async (request: GenerateChallengeForStudentInput, attempts: number) => {
    try {
      const {challenge, tip} =
        await generateChallengeMutation.mutateAsync(request);
      
      const studentDTOs = students.filter(s =>
        request.students.some(rs => rs.name === s.name)
      );

      setSelection({
        students: studentDTOs,
        challenge,
        tip,
        attemptsLeft: attempts,
      });

      setChallengeHistory(prev => [...prev, {challenge, tip}].slice(-5));
    } catch (error: any) {
        if (error.message.includes('503')) {
            toast({ title: tToast('aiModelOverloaded'), variant: 'destructive' });
        } else {
            toast({title: tToast('aiChallengeFailed'), variant: 'destructive'});
        }
    }
  };

  const handleRetryChallenge = async () => {
    if (challengeRequest && selection && selection.attemptsLeft > 0) {
      const updatedRequest = {...challengeRequest, challengeHistory: challengeHistory};
      // Decrement attempts *before* making the call
      const newAttemptsLeft = selection.attemptsLeft - 1;
      setSelection(prev => prev ? { ...prev, attemptsLeft: newAttemptsLeft } : null);
      await handleChallenge(updatedRequest, newAttemptsLeft);
    }
  };

  const handleAcceptChallenge = async () => {
    if (selection && challengeRequest) {
      const attemptsUsed = MAX_ATTEMPTS - selection.attemptsLeft;
      await acceptChallengeMutation.mutateAsync({
        studentIds: selection.students.map(s => s.id),
        challenge: selection.challenge,
        tip: selection.tip,
        attempts: attemptsUsed,
        selectionMode: challengeRequest.selectionMode as SelectionMode,
        aiConfiguration: {
          subject: challengeRequest.subject,
          ageOrGrade: challengeRequest.ageOrGrade,
          country: challengeRequest.country,
          challengeLocation: challengeRequest.challengeLocation,
          customPrompt: challengeRequest.customPrompt,
          negativePrompt: challengeRequest.negativePrompt,
          className: challengeRequest.className,
          classInterests: challengeRequest.classInterests,
        },
      });
    }
  };
  
  const handleRejectChallenge = async () => {
    if (selection && challengeRequest) {
      const attemptsUsed = MAX_ATTEMPTS - selection.attemptsLeft;
      await rejectChallengeMutation.mutateAsync({
        studentIds: selection.students.map(s => s.id),
        challenge: selection.challenge,
        tip: selection.tip,
        attempts: attemptsUsed,
        selectionMode: challengeRequest.selectionMode as SelectionMode,
        aiConfiguration: {
          subject: challengeRequest.subject,
          ageOrGrade: challengeRequest.ageOrGrade,
          country: challengeRequest.country,
          challengeLocation: challengeRequest.challengeLocation,
          customPrompt: challengeRequest.customPrompt,
          negativePrompt: challengeRequest.negativePrompt,
          className: challengeRequest.className,
          classInterests: challengeRequest.classInterests,
        },
      });
    }
  };

  const handleOpenSelect = () => {
    setIsStudentSelectionOpen(true);
  };

  const handleManualSelection = async (selectedIds: string[]) => {
    setIsStudentSelectionOpen(false);
    const selectedStudents = students.filter(s => selectedIds.includes(s.id));

    if (selectedStudents.length > 0) {
      setIsSpinning(true);
      const selectionMode =
        selectedStudents.length > 1
          ? 'personalized-multiple'
          : 'personalized-individual';

      setTimeout(async () => {
        await startChallengeFlow(selectedStudents, selectionMode);
        setIsSpinning(false);
      }, 2000); // Simulate spinning duration
    }
  };

  const handleDialogClose = () => {
    setSelection(null);
    setChallengeRequest(null);
    if(isStudentSelectionOpen) setIsStudentSelectionOpen(false);
  };

  return {
    mode,
    setMode,
    isSpinning,
    isStudentSelectionOpen,
    selection,
    generateChallengeMutation,
    acceptChallengeMutation,
    rejectChallengeMutation,
    handleSpin,
    handleOpenSelect,
    handleManualSelection,
    handleDialogClose,
    handleRetryChallenge,
    handleAcceptChallenge,
    handleRejectChallenge,
  };
}
