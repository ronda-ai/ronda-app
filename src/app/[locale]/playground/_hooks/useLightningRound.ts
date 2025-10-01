
'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { LightningRoundDTO } from '@/modules/lightning-round/application/dtos/lightning-round.dto';


export type ChallengeCategory = 'sound' | 'face' | 'gesture' | 'imitation';

export interface LightningChallenge {
    studentName: string;
    challenge: string;
}

export function useLightningRound() {
    const tToast = useScopedI18n('toasts');
    const tPlayground = useScopedI18n('playground');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [gameDuration, setGameDuration] = useState(30);
    const [challengeInterval, setChallengeInterval] = useState(4);
    const [challengeCategory, setChallengeCategory] = useState<ChallengeCategory>('sound');
    const [customPrompt, setCustomPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(gameDuration);
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [gamePlan, setGamePlan] = useState<LightningChallenge[]>([]);
    const [roundToDelete, setRoundToDelete] = useState<string | null>(null);
    const [feedbackValues, setFeedbackValues] = useState<Record<string, string>>({});

    const { data: students = [] } = useQuery<StudentDTO[]>({
        queryKey: ['students'],
        queryFn: () => fetch('/api/students').then(res => res.json()),
    });

    const { data: history = [], isLoading: isLoadingHistory } = useQuery<LightningRoundDTO[]>({
        queryKey: ['lightningRounds'],
        queryFn: () => fetch('/api/games/lightning-round').then(res => res.json()),
    });

    const lightningRoundMutation = useMutation({
        mutationFn: (presentStudents: StudentDTO[]) =>
            fetch('/api/games/lightning-round', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    students: presentStudents.map(s => s.name),
                    duration: gameDuration,
                    interval: challengeInterval,
                    category: challengeCategory,
                    language: locale,
                    customPrompt: customPrompt,
                    negativePrompt: negativePrompt,
                    roundHistory: history,
                }),
            }).then(res => {
                if (!res.ok) throw new Error('Failed to generate game plan');
                return res.json();
            }),
        onSuccess: (data: LightningRoundDTO) => {
            if (data.plan && data.plan.length > 0) {
                setGamePlan(data.plan);
                setTimeLeft(gameDuration);
                setCurrentChallengeIndex(0);
                setIsGameRunning(true);
                setIsPaused(false);
                queryClient.invalidateQueries({ queryKey: ['lightningRounds'] });
            } else {
                toast({ title: tToast('aiError'), description: "The AI couldn't generate a game plan.", variant: 'destructive' });
            }
        },
        onError: (error) => {
            console.error(error);
            toast({ title: tToast('aiError'), description: (error as Error).message, variant: 'destructive' });
        }
    });
    
    const updateRoundMutation = useMutation({
        mutationFn: ({ id, feedback }: { id: string; feedback: string }) =>
            fetch(`/api/games/lightning-round/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedback }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lightningRounds'] });
            toast({ title: tToast('feedbackSaved') });
        },
        onError: () => toast({ title: tToast('feedbackFailed'), variant: 'destructive' }),
    });
    
    const deleteRoundMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/games/lightning-round/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lightningRounds'] });
            toast({ title: tPlayground('lightningRound.toastDeleted') });
            setRoundToDelete(null);
        },
        onError: () => {
            toast({ title: tPlayground('lightningRound.toastDeleteFailed'), variant: 'destructive' });
            setRoundToDelete(null);
        }
    });

    useEffect(() => {
        let gameTimer: NodeJS.Timeout;

        if (isGameRunning && !isPaused) {
        gameTimer = setInterval(() => {
            setTimeLeft(prev => {
            if (prev <= 1) {
                setIsGameRunning(false);
                return 0;
            }
            if ((gameDuration - prev + 1) % challengeInterval === 0) {
                setCurrentChallengeIndex(i => i + 1);
            }
            return prev - 1;
            });
        }, 1000);
        }

        return () => clearInterval(gameTimer);
    }, [isGameRunning, isPaused, gameDuration, challengeInterval]);
    
    const presentStudents = students.filter(s => !s.isAbsent);
    const canStartLightningRound = presentStudents.length >= 2;

    const handleStartGame = () => {
        if(!canStartLightningRound) {
            toast({title: tPlayground('lightningRound.noStudentsError'), variant: "destructive"});
            return;
        }
        lightningRoundMutation.mutate(presentStudents);
    };

    const handleStopGame = () => {
        setIsGameRunning(false);
        setIsPaused(false);
        setGamePlan([]);
        setCurrentChallengeIndex(0);
    };
    
    const handlePauseGame = () => {
        setIsPaused(prev => !prev);
    }
    
    return {
        gameDuration, setGameDuration,
        challengeInterval, setChallengeInterval,
        challengeCategory, setChallengeCategory,
        customPrompt, setCustomPrompt,
        negativePrompt, setNegativePrompt,
        isGameRunning,
        isPaused,
        timeLeft,
        currentChallengeIndex,
        gamePlan,
        history,
        isLoadingHistory,
        roundToDelete,
        setRoundToDelete,
        lightningRoundMutation,
        updateRoundMutation,
        deleteRoundMutation,
        handleStartGame,
        handleStopGame,
        handlePauseGame,
        canStartLightningRound,
        feedbackValues,
        setFeedbackValues
    };
}
