

'use client';

import { useToast } from '@/hooks/use-toast';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';
import { DigitalConvivialityActivityDTO } from '@/modules/digital-conviviality/application/dtos/digital-conviviality-activity.dto';
import { ActivityType } from '@/ai/flows/generate-digital-conviviality-activity';
import { DigitalConflictScenarioDTO } from '@/modules/digital-conviviality/application/dtos/digital-conflict-scenario.dto';
import { DigitalPactDTO } from '@/modules/digital-conviviality/application/dtos/digital-pact.dto';
import { useStudentData } from '../../_hooks/useStudentData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

export type { ActivityType };

export function useDigitalConviviality() {
    const tToast = useScopedI18n('toasts');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // State for Activities
    const [activityType, setActivityType] = useState<ActivityType | ''>('');
    const [customPrompt, setCustomPrompt] = useState('');
    const [activityToDelete, setActivityToDelete] = useState<string | null>(null);

    // State for Conflict Simulations
    const [conflictTopics, setConflictTopics] = useState('');
    const [scenarioToDelete, setScenarioToDelete] = useState<string | null>(null);

    // State for Digital Pacts
    const [studentCount, setStudentCount] = useState<number>(0);
    const [mainConcerns, setMainConcerns] = useState('');
    const [pactToDelete, setPactToDelete] = useState<string | null>(null);
    const { students } = useStudentData();
    React.useEffect(() => {
        if (students.length > 0) {
            setStudentCount(students.filter(s => !s.isAbsent).length);
        }
    }, [students]);


    const { data: aiConfig } = useQuery<AIConfigurationDTO>({
        queryKey: ['aiConfiguration'],
        queryFn: () => fetch('/api/ai/configuration').then(res => res.ok ? res.json() : null),
    });

    // Queries
    const { data: activities = [], isLoading: isLoadingActivities } = useQuery<DigitalConvivialityActivityDTO[]>({
        queryKey: ['digitalConvivialityActivities'],
        queryFn: () => fetch('/api/digital-conviviality').then(res => res.json()),
    });
    
    const { data: scenarios = [], isLoading: isLoadingScenarios } = useQuery<DigitalConflictScenarioDTO[]>({
        queryKey: ['digitalConflictScenarios'],
        queryFn: () => fetch('/api/digital-conviviality/conflict-simulation').then(res => res.json()),
    });

    const { data: pacts = [], isLoading: isLoadingPacts } = useQuery<DigitalPactDTO[]>({
        queryKey: ['digitalPacts'],
        queryFn: () => fetch('/api/digital-conviviality/pact').then(res => res.json()),
    });

    // Mutations for Activities
    const generateActivityMutation = useMutation({
        mutationFn: () =>
        fetch('/api/digital-conviviality', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                activityType,
                customPrompt, 
                language: locale,
                ageOrGrade: aiConfig?.ageOrGrade,
                classInterests: aiConfig?.classInterests || [],
             }),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['digitalConvivialityActivities'] });
            setCustomPrompt('');
        },
        onError: () => {
            toast({
                title: tToast('aiSuggestionFailed'),
                variant: 'destructive',
            });
        },
    });

    const deleteActivityMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/digital-conviviality/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['digitalConvivialityActivities'] });
            toast({ title: "Activity deleted." });
            setActivityToDelete(null);
        },
        onError: () => {
            toast({ title: "Failed to delete activity.", variant: 'destructive' });
            setActivityToDelete(null);
        }
    });

    // Mutations for Conflict Scenarios
    const generateConflictScenarioMutation = useMutation({
        mutationFn: (): Promise<DigitalConflictScenarioDTO> =>
        fetch('/api/digital-conviviality/conflict-simulation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: locale,
                topics: conflictTopics.split(',').map(t => t.trim()).filter(Boolean),
                ageOrGrade: aiConfig?.ageOrGrade,
            })
        }).then(res => {
            if (!res.ok) throw new Error("API Error");
            return res.json();
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['digitalConflictScenarios'] });
            setConflictTopics('');
        },
        onError: () => {
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive'});
        }
    });
    
    const deleteScenarioMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/digital-conviviality/conflict-simulation/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['digitalConflictScenarios'] });
            toast({ title: "Scenario deleted." });
            setScenarioToDelete(null);
        },
        onError: () => {
            toast({ title: "Failed to delete scenario.", variant: 'destructive' });
            setScenarioToDelete(null);
        }
    });

    // Mutations for Digital Pacts
    const generatePactMutation = useMutation({
        mutationFn: (): Promise<DigitalPactDTO> =>
        fetch('/api/digital-conviviality/pact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: locale,
                studentCount,
                ageOrGrade: aiConfig?.ageOrGrade,
                classInterests: aiConfig?.classInterests,
                mainConcerns: mainConcerns.split(',').map(t => t.trim()).filter(Boolean),
            })
        }).then(res => {
            if (!res.ok) throw new Error("API Error");
            return res.json();
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['digitalPacts'] });
            setMainConcerns('');
        },
        onError: () => {
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive'});
        }
    });

    const deletePactMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/digital-conviviality/pact/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['digitalPacts'] });
            toast({ title: "Pact deleted." });
            setPactToDelete(null);
        },
        onError: () => {
            toast({ title: "Failed to delete pact.", variant: 'destructive' });
            setPactToDelete(null);
        }
    });

    const updatePactMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<DigitalPactDTO> }) => 
            fetch(`/api/digital-conviviality/pact/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(res => {
                if (!res.ok) throw new Error("Failed to update pact");
                return res.json();
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['digitalPacts'] });
            toast({ title: 'Pact draft saved.' });
        },
        onError: () => toast({ title: 'Failed to save pact draft.', variant: 'destructive' }),
    });

    const publishPactMutation = useMutation({
        mutationFn: (id: string) => 
            fetch(`/api/digital-conviviality/pact/${id}/publish`, {
                method: 'POST',
            }).then(res => {
                if (!res.ok) throw new Error("Failed to publish pact");
                return res.json();
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['digitalPacts'] });
            toast({ title: 'Pact published successfully!' });
        },
        onError: () => toast({ title: 'Failed to publish pact.', variant: 'destructive' }),
    });

    // Handlers
    const handleGenerateActivity = (e: React.FormEvent) => {
        e.preventDefault();
        if (activityType) {
            generateActivityMutation.mutate();
        }
    };
    
    const handleGenerateConflictScenario = (e: React.FormEvent) => {
        e.preventDefault();
        generateConflictScenarioMutation.mutate();
    }

    const handleGeneratePact = (e: React.FormEvent) => {
        e.preventDefault();
        generatePactMutation.mutate();
    }
    
    return {
        // Activities
        activityType,
        setActivityType,
        customPrompt,
        setCustomPrompt,
        activityToDelete,
        setActivityToDelete,
        activities,
        isLoadingActivities,
        generateActivityMutation,
        deleteActivityMutation,
        handleGenerateActivity,
        
        // Conflict Scenarios
        conflictTopics,
        setConflictTopics,
        scenarios,
        isLoadingScenarios,
        scenarioToDelete,
        setScenarioToDelete,
        generateConflictScenarioMutation,
        deleteScenarioMutation,
        handleGenerateConflictScenario,
        
        // Pacts
        studentCount,
        setStudentCount,
        mainConcerns,
        setMainConcerns,
        pactToDelete,
        setPactToDelete,
        pacts,
        isLoadingPacts,
        generatePactMutation,
        deletePactMutation,
        handleGeneratePact,
        updatePactMutation,
        publishPactMutation,
    };
}
