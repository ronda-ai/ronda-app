
'use client';

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { DebateDTO } from '@/modules/debate/application/dtos/debate.dto';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

export type DebateComplexity = 'beginner' | 'intermediate' | 'advanced';

export function useDebateGenerator() {
    const tToast = useScopedI18n('toasts');
    const tPlayground = useScopedI18n('playground');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [topic, setTopic] = useState('');
    const [complexity, setComplexity] = useState<DebateComplexity>('beginner');
    const [debateToDelete, setDebateToDelete] = useState<string | null>(null);
    const [liveSessionData, setLiveSessionData] = useState<{ debateId: string; liveId: string } | null>(null);

    const { data: aiConfig } = useQuery<AIConfigurationDTO>({
        queryKey: ['aiConfiguration'],
        queryFn: () => fetch('/api/ai/configuration').then(res => res.ok ? res.json() : null),
    });
    
    const { data: students = [] } = useQuery<StudentDTO[]>({
        queryKey: ['students'],
        queryFn: () => fetch('/api/students').then(res => res.json()),
    });

    const { data: debates = [], isLoading: isLoadingDebates } = useQuery<DebateDTO[]>({
        queryKey: ['debates'],
        queryFn: () => fetch('/api/games/debate').then(res => res.json()),
    });

    const generateDebateMutation = useMutation({
        mutationFn: () =>
        fetch('/api/games/debate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                topic, 
                complexity, 
                language: locale,
                ageOrGrade: aiConfig?.ageOrGrade,
                country: aiConfig?.country,
             }),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debates'] });
            setTopic('');
        },
        onError: () => {
            toast({
                title: tToast('aiSuggestionFailed'),
                variant: 'destructive',
            });
        },
    });
    
    const generateTopicSuggestionMutation = useMutation({
        mutationFn: () =>
            fetch('/api/games/debate/suggest-topic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    language: locale,
                    ageOrGrade: aiConfig?.ageOrGrade,
                    country: aiConfig?.country,
                    classInterests: aiConfig?.classInterests || [],
                }),
            }).then(res => {
                if (!res.ok) throw new Error('API Error');
                return res.json();
            }),
        onSuccess: (data) => {
            setTopic(data.topic);
            toast({ title: tPlayground('suggestions.toastSuccess') });
        },
        onError: () => {
             toast({
                title: tToast('aiSuggestionFailed'),
                variant: 'destructive',
            });
        }
    });

    const deleteDebateMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/games/debate/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debates'] });
            toast({ title: tPlayground('debateGenerator.toastDeleted') });
            setDebateToDelete(null);
        },
        onError: () => {
            toast({ title: tPlayground('debateGenerator.toastDeleteFailed'), variant: 'destructive' });
            setDebateToDelete(null);
        }
    });

    const startSessionMutation = useMutation({
        mutationFn: (debateId: string) => fetch(`/api/games/debate/${debateId}/start`, { method: 'POST' }).then(res => {
            if(!res.ok) throw new Error("Failed to start session");
            return res.json();
        }),
        onSuccess: (data: DebateDTO) => {
            queryClient.invalidateQueries({ queryKey: ['debates'] });
            if (data.liveId) {
                setLiveSessionData({ debateId: data.id, liveId: data.liveId });
            }
        },
        onError: () => toast({ title: "Error", description: "Failed to start live session", variant: 'destructive'})
    });

    const stopSessionMutation = useMutation({
        mutationFn: (debateId: string) => fetch(`/api/games/debate/${debateId}/stop`, { method: 'POST' }).then(res => {
            if(!res.ok) throw new Error("Failed to stop session");
            return res.json();
        }),
        onSuccess: (data: DebateDTO | null) => {
            queryClient.invalidateQueries({ queryKey: ['debates'] });
            toast({ title: tPlayground('debateGenerator.liveSession.sessionClosed') });
        },
        onError: () => toast({ title: "Error", description: "Failed to stop live session", variant: 'destructive'})
    });

    const handleGenerateDebate = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim()) {
            generateDebateMutation.mutate();
        }
    };

    return {
        topic, setTopic,
        complexity, setComplexity,
        debateToDelete, setDebateToDelete,
        debates, isLoadingDebates,
        generateDebateMutation,
        deleteDebateMutation,
        handleGenerateDebate,
        generateTopicSuggestionMutation,
        startSessionMutation,
        stopSessionMutation,
        liveSessionData,
        setLiveSessionData,
        students,
  };
}
