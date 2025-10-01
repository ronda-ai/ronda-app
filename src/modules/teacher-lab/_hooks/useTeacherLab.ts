
'use client';

import React from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import type { ClassroomPulseDTO } from '@/modules/teacher-lab/application/dtos/classroom-pulse.dto';
import type { PedagogicalMenuDTO } from '@/modules/teacher-lab/application/dtos/pedagogical-menu.dto';
import type { ClassroomClimateScenarioInput, ClassroomClimateScenarioOutput } from '@/modules/teacher-lab/application/dtos/classroom-climate-scenario.dto';
import type { QuestionAnalysisInput, QuestionAnalysisOutput } from '@/modules/teacher-lab/application/dtos/question-analysis.dto';
import type { ReflectionGuidanceInput, ReflectionGuidanceOutput } from '@/modules/teacher-lab/application/dtos/reflection-guidance.dto';
import type { ClassAnalysisFromAudioDTO } from '@/modules/teacher-lab/application/dtos/class-analysis-from-audio.dto';
import { MbeConsultationInput } from '@/modules/mbe-expert/domain/interfaces/mbe-expert-service.interface';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

// Re-export this type as it's used in the component
export type SimulationHistoryItem = {
    role: 'user' | 'model';
    text: string;
    evaluation?: {
        isCorrect: 'good' | 'average' | 'bad';
        feedback: string;
        mbeCriterias: string[];
    }
};

export type SimulationLength = 'short' | 'medium' | 'complex';

export function useTeacherLab() {
    const tToast = useScopedI18n('toasts');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // --- State ---
    const [classroomPulse, setClassroomPulse] = React.useState<ClassroomPulseDTO | null>(null);
    const [learningObjective, setLearningObjective] = React.useState('');
    const [pedagogicalMenu, setPedagogicalMenu] = React.useState<PedagogicalMenuDTO | null>(null);
    const [scenarioDescription, setScenarioDescription] = React.useState('');
    const [simulationLength, setSimulationLength] = React.useState<SimulationLength>('medium');
    const [climateHistory, setClimateHistory] = React.useState<SimulationHistoryItem[]>([]);
    const [climateScenario, setClimateScenario] = React.useState<ClassroomClimateScenarioOutput | null>(null);
    const [climateSimulationError, setClimateSimulationError] = React.useState(false);
    const [questionsToAnalyze, setQuestionsToAnalyze] = React.useState('');
    const [questionAnalysisResult, setQuestionAnalysisResult] = React.useState<QuestionAnalysisOutput | null>(null);
    const [audioFile, setAudioFile] = React.useState<File | null>(null);
    const [audioAnalysisResult, setAudioAnalysisResult] = React.useState<ClassAnalysisFromAudioDTO | null>(null);
    const [transcriptionProgress, setTranscriptionProgress] = React.useState<number | null>(null);
    const [reflectionHistory, setReflectionHistory] = React.useState<{ role: 'user' | 'model', text: string }[]>([]);
    const [currentReflection, setCurrentReflection] = React.useState('');

    // --- MBE Expert State ---
    const [mbeQuestion, setMbeQuestion] = React.useState('');
    const [mbeStudentContext, setMbeStudentContext] = React.useState<string | null>(null);
    const [mbeConsultationResult, setMbeConsultationResult] = React.useState<string | null>(null);
    const [mbeDocumentUrl, setMbeDocumentUrl] = React.useState('https://estandaresdocentes.mineduc.cl/wp-content/uploads/2023/06/MBE-2-1.pdf');

    // --- Data Fetching ---
    const { data: latestClassroomPulse, isLoading: isLoadingPulseData } = useQuery<ClassroomPulseDTO | null>({
        queryKey: ['latestTeacherLabData', 'pulse'],
        queryFn: () => fetch(`/api/teacher-lab/latest/pulse`).then(res => res.ok ? res.json() : null),
    });

    const { data: latestPedagogicalMenu, isLoading: isLoadingMenuData } = useQuery<PedagogicalMenuDTO | null>({
        queryKey: ['latestTeacherLabData', 'menu'],
        queryFn: () => fetch(`/api/teacher-lab/latest/menu`).then(res => res.ok ? res.json() : null),
    });

    const { data: latestQuestionAnalysis, isLoading: isLoadingQuestionsData } = useQuery<QuestionAnalysisOutput | null>({
        queryKey: ['latestTeacherLabData', 'questions'],
        queryFn: () => fetch(`/api/teacher-lab/latest/questions`).then(res => res.ok ? res.json() : null),
    });

    const { data: latestReflection, isLoading: isLoadingReflectionData } = useQuery<{ role: 'user' | 'model'; text: string; }[] | null>({
        queryKey: ['latestTeacherLabData', 'reflection'],
        queryFn: () => fetch(`/api/teacher-lab/latest/reflection`).then(res => res.ok ? res.json() : null),
    });
    
    const { data: students = [] } = useQuery<StudentDTO[]>({
        queryKey: ['students'],
        queryFn: () => fetch('/api/students').then(res => res.json()),
    });

    const studentOptions = students.map(s => ({ value: s.id, label: s.name }));
    
    const isLoadingLatestData = isLoadingPulseData || isLoadingMenuData || isLoadingQuestionsData || isLoadingReflectionData;

    // --- Mutations ---
    const generatePulseMutation = useMutation<ClassroomPulseDTO, Error>({
        mutationFn: () => fetch('/api/teacher-lab/generate-classroom-pulse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: locale }),
        }).then(res => {
            if (!res.ok) throw new Error("Failed to generate pulse");
            return res.json();
        }),
        onSuccess: (data) => {
            setClassroomPulse(data);
            queryClient.invalidateQueries({ queryKey: ['latestTeacherLabData', 'pulse'] });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' })
    });

    const generateMenuMutation = useMutation<PedagogicalMenuDTO, Error, { objective: string }>({
        mutationFn: (variables) => fetch('/api/teacher-lab/generate-pedagogical-menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...variables, language: locale }),
        }).then(res => {
            if (!res.ok) throw new Error("Failed to generate menu");
            return res.json();
        }),
        onSuccess: (data) => {
            setPedagogicalMenu(data);
            queryClient.invalidateQueries({ queryKey: ['latestTeacherLabData', 'menu'] });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' })
    });

    const generateClimateScenarioMutation = useMutation<ClassroomClimateScenarioOutput, Error, Omit<ClassroomClimateScenarioInput, 'language'>>({
        mutationFn: (variables) => fetch('/api/teacher-lab/generate-classroom-climate-scenario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...variables, language: locale }),
        }).then(res => {
            if (!res.ok) throw new Error("Failed to generate climate scenario");
            return res.json();
        }),
        onSuccess: (data, variables) => {
            setClimateSimulationError(false);
            setClimateScenario(data);
            const newHistory: SimulationHistoryItem[] = [...(variables.history || [])];

            if (variables.history && variables.history.length > 0 && data.evaluation) {
                const newModelMessage: SimulationHistoryItem = { role: 'model', text: data.narrative, evaluation: data.evaluation };
                newHistory.push(newModelMessage);
                setClimateHistory(newHistory);
            } else {
                setClimateHistory([{ role: 'model', text: data.narrative }]);
            }
        },
        onError: () => {
            setClimateSimulationError(true);
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
        }
    });

    const generateQuestionAnalysisMutation = useMutation<QuestionAnalysisOutput, Error, QuestionAnalysisInput>({
        mutationFn: (variables) => fetch('/api/teacher-lab/generate-question-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables),
        }).then(res => {
            if (!res.ok) throw new Error("Failed to generate question analysis");
            return res.json();
        }),
        onSuccess: (data) => {
            setQuestionAnalysisResult(data);
            queryClient.invalidateQueries({ queryKey: ['latestTeacherLabData', 'questions'] });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' })
    });

    const generateAudioAnalysisMutation = useMutation<ClassAnalysisFromAudioDTO, Error, File>({
        mutationFn: async (file) => {
            const fileReader = new FileReader();
            return new Promise((resolve, reject) => {
                fileReader.onload = async (e) => {
                    const audioDataUri = e.target?.result as string;
                    setTranscriptionProgress(0);

                    const response = await fetch('/api/teacher-lab/generate-class-analysis-from-audio', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ audioDataUri, language: locale }),
                    });
                    
                    if (!response.ok || !response.body) {
                        return reject(new Error('Analysis failed to stream'));
                    }

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        buffer += decoder.decode(value, { stream: true });
                        
                        const lines = buffer.split('\n');
                        buffer = lines.pop() || '';

                        for (const line of lines) {
                            try {
                                const json = JSON.parse(line);
                                if (json.progress !== undefined) {
                                    setTranscriptionProgress(json.progress);
                                }
                                if (json.result) {
                                    resolve(json.result);
                                    return;
                                }
                                if(json.error) {
                                    reject(new Error(json.error));
                                    return;
                                }
                            } catch (e) {
                                // JSON is likely incomplete, wait for more data
                            }
                        }
                    }
                };
                fileReader.onerror = reject;
                fileReader.readAsDataURL(file);
            });
        },
        onSuccess: (data) => {
            setAudioAnalysisResult(data);
        },
        onError: (error) => {
            toast({ title: tToast('aiSuggestionFailed'), description: error.message, variant: 'destructive' });
        },
        onSettled: () => {
            setTranscriptionProgress(null);
        }
    });
    
    const generateReflectionGuidanceMutation = useMutation<ReflectionGuidanceOutput, Error, Omit<ReflectionGuidanceInput, 'language'>>({
        mutationFn: (variables) => fetch('/api/teacher-lab/generate-reflection-guidance', {
             method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...variables, language: locale}),
        }).then(res => {
            if(!res.ok) throw new Error("Failed to get reflection guidance");
            return res.json()
        }),
        onSuccess: (data) => {
            setReflectionHistory(prev => [...prev, { role: 'model', text: data.guidance }]);
            queryClient.invalidateQueries({ queryKey: ['latestTeacherLabData', 'reflection'] });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' })
    });
    
    const loadMbeDocumentMutation = useMutation({
        mutationFn: (url: string) => fetch('/api/teacher-lab/load-mbe-document', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        }).then(res => {
            if (!res.ok) throw new Error("Failed to load document");
            return res.json();
        }),
        onMutate: () => {
            toast({ title: 'Loading MBE document. This may take a couple of minutes...' });
        },
        onSuccess: (data) => {
            toast({ title: 'Success!', description: `${data.chunks} document chunks have been successfully loaded and vectorized.` });
        },
        onError: (error) => toast({ title: 'Error loading document', description: error.message, variant: 'destructive' }),
    });
    
    const generateMbeConsultationMutation = useMutation<any, Error, MbeConsultationInput>({
        mutationFn: (variables) => fetch('/api/teacher-lab/mbe-consultation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...variables, language: locale}),
        }).then(res => {
            if(!res.ok) throw new Error("Failed to get MBE consultation");
            return res.json();
        }),
        onSuccess: (data) => {
            setMbeConsultationResult(data.answer);
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' })
    });

    // --- Handlers ---
    const handleGeneratePulse = () => generatePulseMutation.mutate();
    const handleGenerateMenu = (e: React.FormEvent) => {
        e.preventDefault();
        if (learningObjective.trim()) {
            generateMenuMutation.mutate({ objective: learningObjective });
        }
    };
    const handleStartClimateSimulation = (e: React.FormEvent) => {
        e.preventDefault();
        if (scenarioDescription.trim()) {
            setClimateHistory([]);
            setClimateScenario(null);
            setClimateSimulationError(false);
            generateClimateScenarioMutation.mutate({ scenarioDescription, simulationLength, studentAliases: [] });
        }
    };
    const handleClimateSimulationChoice = (choiceText: string) => {
        setClimateSimulationError(false);
        const newHistory: SimulationHistoryItem[] = [...climateHistory, { role: 'user', text: choiceText }];
        setClimateHistory(newHistory);
        setClimateScenario(null);
        generateClimateScenarioMutation.mutate({ history: newHistory, simulationLength, studentAliases: [] });
    };
    const handleRetryClimateLastStep = () => {
        setClimateSimulationError(false);
        setClimateScenario(null);
        generateClimateScenarioMutation.mutate({ history: climateHistory, simulationLength, studentAliases: [] });
    };
    const handleResetClimateSimulation = () => {
        setScenarioDescription('');
        setClimateHistory([]);
        setClimateScenario(null);
        setClimateSimulationError(false);
    };
    const handleAnalyzeQuestions = (e: React.FormEvent) => {
        e.preventDefault();
        if (questionsToAnalyze.trim()) {
            const questionList = questionsToAnalyze.split('\n').filter(q => q.trim() !== '');
            generateQuestionAnalysisMutation.mutate({ questions: questionList, language: locale });
        }
    };
    const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAudioFile(e.target.files[0]);
        }
    };
    const handleAnalyzeAudio = () => {
        if (audioFile) {
            generateAudioAnalysisMutation.mutate(audioFile);
        }
    };
    const handleSendReflection = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentReflection.trim()) {
            const newHistory: { role: 'user' | 'model'; text: string; }[] = [...reflectionHistory, { role: 'user' as const, text: currentReflection }];
            setReflectionHistory(newHistory);
            generateReflectionGuidanceMutation.mutate({ teacherReflection: currentReflection, history: newHistory });
            setCurrentReflection('');
        }
    };
     const handleLoadMbeDocument = (e: React.FormEvent) => {
        e.preventDefault();
        if(mbeDocumentUrl) {
            loadMbeDocumentMutation.mutate(mbeDocumentUrl);
        }
    };
    const handleConsultMbe = (e: React.FormEvent) => {
        e.preventDefault();
        if (mbeQuestion.trim()) {
            const studentContext = mbeStudentContext ? students.find(s => s.id === mbeStudentContext) : undefined;
            generateMbeConsultationMutation.mutate({ question: mbeQuestion, student: studentContext, language: locale });
        }
    };

    return {
        classroomPulse, isLoadingPulse: generatePulseMutation.isPending, handleGeneratePulse,
        learningObjective, setLearningObjective, pedagogicalMenu, generateMenuMutation, handleGenerateMenu,
        scenarioDescription, setScenarioDescription, simulationLength, setSimulationLength, climateHistory, climateScenario, climateSimulationError, generateClimateScenarioMutation, handleStartClimateSimulation, handleClimateSimulationChoice, handleRetryClimateLastStep, handleResetClimateSimulation,
        questionsToAnalyze, setQuestionsToAnalyze, questionAnalysisResult, generateQuestionAnalysisMutation, handleAnalyzeQuestions,
        audioFile, handleAudioFileChange, handleAnalyzeAudio, audioAnalysisResult, generateAudioAnalysisMutation, transcriptionProgress,
        reflectionHistory, currentReflection, setCurrentReflection, generateReflectionGuidanceMutation, handleSendReflection,
        latestClassroomPulse, latestPedagogicalMenu, latestQuestionAnalysis, latestReflection,
        isLoadingLatestData,
        mbeQuestion, setMbeQuestion,
        mbeStudentContext, setMbeStudentContext,
        mbeConsultationResult, generateMbeConsultationMutation, handleConsultMbe, studentOptions,
        mbeDocumentUrl, setMbeDocumentUrl,
        loadMbeDocumentMutation, handleLoadMbeDocument,
    };
}
