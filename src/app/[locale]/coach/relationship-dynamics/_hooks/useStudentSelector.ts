
'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/locales/client';

export function useStudentSelector() {
    const [selectedStudents, setSelectedStudents] = useState<StudentDTO[]>([]);
    const { toast } = useToast();
    const tToast = useScopedI18n('toasts');
    const t = useScopedI18n('coach.relationshipLab');
    
    const { data: allStudents = [], isLoading: isLoadingStudents } = useQuery<StudentDTO[]>({
        queryKey: ['students'],
        queryFn: () => fetch('/api/students').then(res => res.json()),
    });

    const generateSuggestionMutation = useMutation({
        mutationFn: (language: string) => fetch('/api/suggestions/relationship-suggestion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ students: allStudents, language }),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        }),
        onSuccess: (data) => {
            const suggestedStudents = allStudents.filter(s => data.suggestedStudentNames.includes(s.name));
            setSelectedStudents(suggestedStudents);
            toast({ title: t('suggestions.toastSuccess') });
        },
        onError: () => {
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
        }
    });

    const studentOptions = allStudents.map(s => ({ value: s, label: s.name }));
    const selectedStudentOptions = selectedStudents.map(s => ({ value: s, label: s.name }));
    
    return {
        allStudents,
        isLoadingStudents,
        selectedStudents,
        setSelectedStudents,
        generateSuggestionMutation,
        studentOptions,
        selectedStudentOptions,
    };
}
