
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { LanguageSupportDTO } from '@/modules/language-support/application/dtos/language-support.dto';
import { FocusAreaDTO } from '@/modules/focus-area/application/dtos/focus-area.dto';

export function useLanguageSupport() {
    const tToast = useScopedI18n('toasts');
    const tFocusAreas = useScopedI18n('languageSupport.addFocusAreaDialog');
    const tEditFocusAreas = useScopedI18n('languageSupport.editFocusAreaDialog');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [feedbackValues, setFeedbackValues] = useState<Record<string, string>>({});
    const [deletingSupportId, setDeletingSupportId] = useState<string | null>(null);
    const [selectedFocusAreas, setSelectedFocusAreas] = useState<Set<string>>(new Set());

    const [isAddFocusAreaDialogOpen, setIsAddFocusAreaDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingFocusArea, setEditingFocusArea] = useState<FocusAreaDTO | null>(null);

    const { data: students = [], isLoading: isLoadingStudents } = useQuery<StudentDTO[]>({
        queryKey: ['students'],
        queryFn: () => fetch('/api/students').then(res => res.json()),
        initialData: [],
    });
    
    const { data: supportHistory = [], isLoading: isLoadingHistory } = useQuery<LanguageSupportDTO[]>({
        queryKey: ['languageSupport', selectedStudentId],
        queryFn: () => fetch(`/api/language-support/${selectedStudentId}`).then(res => res.json()),
        enabled: !!selectedStudentId,
    });

    const { data: availableFocusAreas = [], isLoading: isLoadingFocusAreas } = useQuery<FocusAreaDTO[]>({
        queryKey: ['focusAreas'],
        queryFn: () => fetch('/api/focus-areas').then(res => res.json()),
        initialData: [],
    });

    const selectedStudent = students.find(s => s.id === selectedStudentId);

    const handleFocusAreaChange = (area: string) => {
        if (isEditMode) {
            const areaToEdit = availableFocusAreas.find(fa => fa.name === area);
            if(areaToEdit) setEditingFocusArea(areaToEdit);
            return;
        }
        setSelectedFocusAreas(prev => {
            const newAreas = new Set(prev);
            if (newAreas.has(area)) {
                newAreas.delete(area);
            } else {
                newAreas.add(area);
            }
            return newAreas;
        });
    };

    const generateSupportMutation = useMutation({
        mutationFn: () => {
            if (!selectedStudent || !nativeLanguage || selectedFocusAreas.size === 0) return Promise.reject("Missing data");
            return fetch('/api/language-support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student: selectedStudent,
                    nativeLanguage: nativeLanguage,
                    focusAreas: Array.from(selectedFocusAreas),
                    instructionLanguage: locale,
                }),
            }).then(res => {
                if (!res.ok) throw new Error('API Error');
                return res.json();
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['languageSupport', selectedStudentId] });
            setNativeLanguage('');
            setSelectedFocusAreas(new Set());
        },
        onError: () => {
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
        }
    });

    const addFeedbackMutation = useMutation({
        mutationFn: ({ supportId, feedback }: { supportId: string, feedback: string }) =>
        fetch(`/api/language-support/${supportId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedback }),
        }),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['languageSupport', selectedStudentId] });
        toast({ title: tToast('feedbackSaved') });
        },
        onError: () => toast({ title: tToast('feedbackFailed'), variant: 'destructive' }),
    });

    const deleteSupportMutation = useMutation({
        mutationFn: (supportId: string) => fetch(`/api/language-support/${supportId}`, { method: 'DELETE' }),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['languageSupport', selectedStudentId] });
        setDeletingSupportId(null);
        toast({ title: useScopedI18n('languageSupport')('history.toastDeleted') });
        },
        onError: () => {
        toast({ title: useScopedI18n('languageSupport')('history.toastDeleteFailed'), variant: 'destructive' });
        setDeletingSupportId(null);
        }
    });
    
    const updateFocusAreaMutation = useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) => {
            return fetch(`/api/focus-areas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['focusAreas'] });
            toast({ title: tEditFocusAreas('toastUpdateSuccess') });
        },
        onError: () => {
            toast({ title: tEditFocusAreas('toastUpdateError'), variant: 'destructive' });
        }
    });

    const deleteFocusAreaMutation = useMutation({
        mutationFn: (id: string) => {
            return fetch(`/api/focus-areas/${id}`, { method: 'DELETE' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['focusAreas'] });
            toast({ title: tEditFocusAreas('toastDeleteSuccess') });
        },
        onError: () => {
            toast({ title: tEditFocusAreas('toastDeleteError'), variant: 'destructive' });
        }
    });

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedStudent && nativeLanguage.trim() && selectedFocusAreas.size > 0) {
        generateSupportMutation.mutate();
        }
    };

    const handleAddFeedback = (supportId: string) => {
        const feedback = feedbackValues[supportId];
        if (feedback && feedback.trim()) {
        addFeedbackMutation.mutate({ supportId, feedback });
        }
    };
    
    const handleOpenAddDialog = () => {
        setIsAddFocusAreaDialogOpen(true);
    }
    
    const handleToggleEditMode = () => {
        setIsEditMode(prev => !prev);
    }
    
    return {
        selectedStudentId,
        setSelectedStudentId,
        nativeLanguage,
        setNativeLanguage,
        selectedFocusAreas,
        handleFocusAreaChange,
        feedbackValues,
        setFeedbackValues,
        deletingSupportId,
        setDeletingSupportId,
        students,
        isLoadingStudents,
        supportHistory,
        isLoadingHistory,
        selectedStudent,
        availableFocusAreas,
        isLoadingFocusAreas,
        tFocusAreas,
        generateSupportMutation,
        addFeedbackMutation,
        deleteSupportMutation,
        handleGenerate,
        handleAddFeedback,
        isAddFocusAreaDialogOpen,
        setIsAddFocusAreaDialogOpen,
        handleOpenAddDialog,
        isEditMode,
        handleToggleEditMode,
        editingFocusArea,
        setEditingFocusArea,
        updateFocusAreaMutation,
        deleteFocusAreaMutation,
    }
}
