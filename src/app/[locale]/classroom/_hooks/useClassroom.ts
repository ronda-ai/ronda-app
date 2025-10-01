
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { useStudentData } from '../../_hooks/useStudentData';
import { Theme } from '@/config/themes';

export function useClassroom() {
  const tAIConfig = useScopedI18n('home.aiConfig');
  const tToast = useScopedI18n('toasts');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const locale = useCurrentLocale();

  const [config, setConfig] = useState<Partial<AIConfigurationDTO>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<StudentDTO | null>(null);
  const [askingAIStudent, setAskingAIStudent] = useState<StudentDTO | null>(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isThemeGalleryOpen, setIsThemeGalleryOpen] = useState(false);

  const { students, isLoadingStudents, updateStudentMutation } = useStudentData();

  const { data: savedConfig, isLoading: isLoadingConfig } = useQuery<AIConfigurationDTO>({
    queryKey: ['aiConfiguration'],
    queryFn: () => fetch('/api/ai/configuration').then(res => res.ok ? res.json() : null),
  });

  useEffect(() => {
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, [savedConfig]);

  const saveConfigMutation = useMutation({
    mutationFn: (newConfig: Partial<AIConfigurationDTO>) =>
      fetch('/api/ai/configuration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiConfiguration'] });
      toast({ title: tAIConfig('toastSaved') });
    },
    onError: () => {
      toast({ title: tAIConfig('toastError'), variant: 'destructive' });
    }
  });

  const askAIExpertMutation = useMutation({
    mutationFn: ({ student, question }: { student: StudentDTO, question: string }) =>
      fetch('/api/suggestions/expert-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student, question, language: locale }),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to get expert advice');
        return res.json();
      }),
    onSuccess: (data) => {
      setAiAnswer(data.advice);
    },
    onError: () => {
      toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
    }
  });

  const handleConfigChange = (field: keyof AIConfigurationDTO, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };
  
  const handleThemeSelection = (theme: Theme) => {
    setConfig(prev => ({
        ...prev,
        theme: {
            name: theme.name,
            primary: theme.primary,
            background: theme.background,
            accent: theme.accent,
        }
    }));
  };

  const handlePluginChange = (value: string) => {
    setConfig(prev => ({...prev, plugin: value, modelName: undefined }));
  };
  
  const handleAskAI = () => {
    if (askingAIStudent && aiQuestion) {
      askAIExpertMutation.mutate({ student: askingAIStudent, question: aiQuestion });
    }
  }

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    const lowercasedFilter = searchTerm.toLowerCase();
    return students.filter(student => {
      return (
        student.name.toLowerCase().includes(lowercasedFilter) ||
        student.qualities.some(q => q.toLowerCase().includes(lowercasedFilter)) ||
        student.fears?.some(f => f.toLowerCase().includes(lowercasedFilter)) ||
        student.notes?.toLowerCase().includes(lowercasedFilter)
      );
    });
  }, [students, searchTerm]);

  return {
    config,
    setConfig,
    isLoadingConfig,
    saveConfigMutation,
    handleConfigChange,
    handlePluginChange,
    handleThemeSelection,
    students,
    isLoadingStudents,
    updateStudentMutation,
    searchTerm,
    setSearchTerm,
    filteredStudents,
    editingStudent,
    setEditingStudent,
    askingAIStudent,
    setAskingAIStudent,
    aiQuestion,
    setAiQuestion,
    aiAnswer,
    setAiAnswer,
    askAIExpertMutation,
    handleAskAI,
    isThemeGalleryOpen,
    setIsThemeGalleryOpen,
  };
}
