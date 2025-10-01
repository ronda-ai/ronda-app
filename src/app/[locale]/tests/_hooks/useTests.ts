
'use client';

import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { TestDTO } from '@/modules/test/application/dtos/test.dto';
import { nanoid } from 'nanoid';
import { CreateTestDTO } from '@/modules/test/application/dtos/create-test.dto';
import { useStudentData } from '../../_hooks/useStudentData';

export function useTests() {
    const t = useScopedI18n('tests');
    const tToast = useScopedI18n('toasts');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [testToDelete, setTestToDelete] = React.useState<string | null>(null);
    const [selectedTest, setSelectedTest] = React.useState<TestDTO | null>(null);
    const [isCreateTestOpen, setIsCreateTestOpen] = React.useState(false);
    const [liveSessionData, setLiveSessionData] = useState<{testId: string, liveId: string} | null>(null);

    const { students } = useStudentData();

    const { data: tests = [], isLoading: isLoadingTests } = useQuery<TestDTO[]>({
        queryKey: ['tests'],
        queryFn: () => fetch('/api/tests').then(res => res.json()),
    });
    
    const { data: selectedTestDetails, isLoading: isLoadingSelectedTestDetails } = useQuery<TestDTO | null>({
        queryKey: ['testDetails', selectedTest?.id],
        queryFn: async () => {
            if (!selectedTest?.id) return null;
            const res = await fetch(`/api/tests/${selectedTest.id}`); 
            if (!res.ok) throw new Error('Failed to fetch test details');
            return res.json();
        },
        enabled: !!selectedTest,
    });
    
    useEffect(() => {
        if (selectedTestDetails) {
            setSelectedTest(selectedTestDetails);
        }
    }, [selectedTestDetails]);

    const createTestMutation = useMutation({
        mutationFn: (newTest: CreateTestDTO) =>
            fetch('/api/tests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTest),
            }).then(res => res.json()),
        onSuccess: (data: TestDTO) => {
            queryClient.invalidateQueries({ queryKey: ['tests'] });
            setSelectedTest(data); // Open the new test in the editor
            toast({ title: t('toastCreateSuccess') });
        },
        onError: () => {
            toast({ title: t('toastCreateFailed'), variant: 'destructive' });
        }
    });

    const updateTestMutation = useMutation({
        mutationFn: (testToUpdate: TestDTO) =>
            fetch('/api/tests', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testToUpdate),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tests'] });
            queryClient.invalidateQueries({ queryKey: ['testDetails', selectedTest?.id] });
            toast({ title: t('toastUpdateSuccess') });
        },
        onError: () => {
            toast({ title: t('toastUpdateFailed'), variant: 'destructive' });
        }
    });

    const deleteTestMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/tests/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tests'] });
            toast({ title: t('toastDeleted') });
            setTestToDelete(null);
        },
        onError: () => {
            toast({ title: t('toastDeleteFailed'), variant: 'destructive' });
        }
    });
    
     const generateRubricMutation = useMutation({
        mutationFn: (test: TestDTO) => {
            return fetch('/api/tests/generate-rubric', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ test, language: locale }),
            }).then(res => res.json());
        },
        onSuccess: (updatedTest: TestDTO) => {
            queryClient.invalidateQueries({ queryKey: ['tests'] });
            queryClient.invalidateQueries({ queryKey: ['testDetails', updatedTest.id] });
            toast({ 
                title: t('rubricGenerated.title'),
                description: t('rubricGenerated.description'),
            });
        },
        onError: () => {
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
        }
    });

     const startTestSessionMutation = useMutation({
        mutationFn: (testId: string) =>
            fetch(`/api/tests/${testId}/start`, {
                method: 'POST',
            }).then(res => {
                if (!res.ok) throw new Error("Failed to start session");
                return res.json();
            }),
        onSuccess: (data: TestDTO) => {
            queryClient.invalidateQueries({ queryKey: ['tests'] });
            if (data.liveId) {
                setLiveSessionData({ testId: data.id, liveId: data.liveId });
            }
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to start live session.", variant: 'destructive' });
        }
    });

    const stopTestSessionMutation = useMutation({
        mutationFn: (testId: string) =>
            fetch(`/api/tests/${testId}/stop`, {
                method: 'POST',
            }).then(res => {
                if (!res.ok) throw new Error("Failed to stop session");
                return res.json();
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tests'] });
            toast({ title: "Session stopped" });
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to stop live session.", variant: 'destructive' });
        }
    });


    const handleCreateNewTest = (testData: any) => {
        createTestMutation.mutate(testData);
    };

    return {
        tests,
        isLoadingTests,
        students,
        testToDelete,
        setTestToDelete,
        deleteTestMutation,
        selectedTest,
        setSelectedTest,
        isLoadingSelectedTestDetails,
        isCreateTestOpen,
        setIsCreateTestOpen,
        handleCreateNewTest,
        updateTestMutation,
        generateRubricMutation,
        startTestSessionMutation,
        stopTestSessionMutation,
        liveSessionData,
        setLiveSessionData,
    }
}
