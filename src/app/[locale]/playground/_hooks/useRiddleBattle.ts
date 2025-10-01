'use client';

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { RiddleBattleDTO } from '@/modules/riddle-battle/application/dtos/riddle-battle.dto';

export function useRiddleBattle() {
    const tToast = useScopedI18n('toasts');
    const tPlayground = useScopedI18n('playground');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [topic, setTopic] = useState('');
    const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
    const [evaluationState, setEvaluationState] = useState<Record<string, { winner: string; feedback: string; mood: string }>>({});
    const [battleToDelete, setBattleToDelete] = useState<string | null>(null);

    const { data: battles = [], isLoading: isLoadingBattles } = useQuery<RiddleBattleDTO[]>({
        queryKey: ['riddleBattles'],
        queryFn: () => fetch('/api/games/riddle-battle').then(res => res.json()),
    });

    const generateBattleMutation = useMutation({
        mutationFn: (topic: string) =>
        fetch('/api/games/riddle-battle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, language: locale }),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        }),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['riddleBattles'] });
        setTopic('');
        setRevealedAnswers({});
        },
        onError: () => {
        toast({
            title: tToast('aiSuggestionFailed'),
            variant: 'destructive',
        });
        },
    });

    const deleteBattleMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/games/riddle-battle/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['riddleBattles'] });
            toast({ title: tPlayground('riddleBattle.toastDeleted') });
            setBattleToDelete(null);
        },
        onError: () => {
            toast({ title: tPlayground('riddleBattle.toastDeleteFailed'), variant: 'destructive' });
            setBattleToDelete(null);
        }
    });

    const evaluateBattleMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: { winner?: string; feedback?: string; mood?: string }}) =>
            fetch(`/api/games/riddle-battle/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['riddleBattles'] });
            toast({ title: tPlayground('riddleBattle.toastEvaluationSaved') });
        },
        onError: () => toast({ title: tPlayground('riddleBattle.toastEvaluationFailed'), variant: 'destructive' })
    })

    const handleGenerateBattle = (e: React.FormEvent) => {
        e.preventDefault();
        generateBattleMutation.mutate(topic);
    };
    
    const toggleAnswer = (battleId: string, team: 'teamBlue' | 'teamRed') => {
        const key = `${battleId}-${team}`;
        setRevealedAnswers(prev => ({ ...prev, [key]: !prev[key] }));
    }

    const handleEvaluationChange = (id: string, field: 'winner' | 'feedback' | 'mood', value: string) => {
        setEvaluationState(prev => ({
            ...prev,
            [id]: {
                ...(prev[id] || { winner: '', feedback: '', mood: '' }),
                [field]: value
            }
        }))
    }
    
    const handleSaveEvaluation = (id: string) => {
        const data = evaluationState[id];
        if (data) {
            evaluateBattleMutation.mutate({ id, data });
        }
    }

    return {
        topic, setTopic,
        revealedAnswers,
        evaluationState,
        battleToDelete, setBattleToDelete,
        battles, isLoadingBattles,
        generateBattleMutation,
        deleteBattleMutation,
        evaluateBattleMutation,
        handleGenerateBattle,
        toggleAnswer,
        handleEvaluationChange,
        handleSaveEvaluation,
    };
}
