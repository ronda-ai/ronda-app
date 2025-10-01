
'use client';

import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { GenerateCrisisScenarioOutput } from '@/ai/flows/generate-crisis-scenario';
import { SafetyCommitteeDTO } from '@/modules/safety-committee/application/dtos/safety-committee.dto';
import { useStudentData } from '../../_hooks/useStudentData';
import { SafetyRiskMapDTO } from '@/modules/educational-safety/application/dtos/safety-risk-map.dto';
import { SafetyProtocolDTO } from '@/modules/educational-safety/application/dtos/safety-protocol.dto';
import { CrisisScenarioDTO } from '@/modules/educational-safety/application/dtos/crisis-scenario.dto';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { encode } from 'html-entities';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BrigadeFormationResult } from '@/modules/safety-committee/domain/interfaces/brigade-formation.dto';
import { ProtocolStep } from '@/modules/educational-safety/domain/educational-safety.entity';
import { GenerateDigitalConflictScenarioOutput } from '@/ai/flows/generate-digital-conflict-scenario';


export type SimulationHistoryItem = {
    role: 'user' | 'model';
    text: string;
    evaluation?: {
        isCorrect: 'good' | 'average' | 'bad';
        feedback: string;
        scoreChange: number;
    }
};

export type SimulationLength = 'short' | 'medium' | 'complex';
export type AnalysisDepth = 'concise' | 'moderate' | 'exhaustive';

export function useEducationalSafety() {
    const tToast = useScopedI18n('toasts');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // --- Students Data ---
    const { students } = useStudentData();

    // --- Phase 1 State (Risk Maps) ---
    const [locationContext, setLocationContext] = React.useState('');
    const [infrastructureContext, setInfrastructureContext] = React.useState('');
    const [socialContext, setSocialContext] = React.useState('');
    const [analysisDepth, setAnalysisDepth] = React.useState<AnalysisDepth>('moderate');
    const { data: riskMaps = [], isLoading: isLoadingRiskMaps } = useQuery<SafetyRiskMapDTO[]>({
        queryKey: ['safetyRiskMaps'],
        queryFn: () => fetch('/api/safety-lab/risk-maps').then(res => res.json()),
    });
    const [viewingRiskMap, setViewingRiskMap] = React.useState<SafetyRiskMapDTO | null>(null);


    // --- Phase 2 State (Protocols) ---
    const [protocolRisk, setProtocolRisk] = React.useState('');
    const { data: protocols = [], isLoading: isLoadingProtocols } = useQuery<SafetyProtocolDTO[]>({
        queryKey: ['safetyProtocols'],
        queryFn: () => fetch('/api/safety-lab/protocols').then(res => res.json()),
    });


    // --- Phase 3 State (Crisis Scenarios) ---
    const [crisisType, setCrisisType] = React.useState('');
    const [simulationLength, setSimulationLength] = React.useState<SimulationLength>('medium');
    const [selectedBrigadeForSim, setSelectedBrigadeForSim] = React.useState<string | null>(null);
    const [simulationHistory, setSimulationHistory] = React.useState<SimulationHistoryItem[]>([]);
    const [simulationResult, setSimulationResult] = React.useState<GenerateCrisisScenarioOutput | null>(null);
    const [currentScore, setCurrentScore] = React.useState(0);
    const [simulationError, setSimulationError] = React.useState(false);
    const { data: crisisScenarios = [], isLoading: isLoadingCrisisScenarios } = useQuery<CrisisScenarioDTO[]>({
        queryKey: ['crisisScenarios'],
        queryFn: () => fetch('/api/safety-lab/crisis-scenarios').then(res => res.json()),
    });
    const [scenarioTopics, setScenarioTopics] = React.useState('');
    const [generatedScenario, setGeneratedScenario] = React.useState<GenerateDigitalConflictScenarioOutput | null>(null);


    // --- Phase 4 State (Committees) ---
    const [newCommitteeName, setNewCommitteeName] = React.useState('');
    const { data: committees = [], isLoading: isLoadingCommittees } = useQuery<SafetyCommitteeDTO[]>({
        queryKey: ['safetyCommittees'],
        queryFn: () => fetch('/api/safety-lab/committees').then(res => res.json()),
    });

    // --- Brigade Formation State ---
    const [brigadeObjective, setBrigadeObjective] = React.useState('');
    const [brigadeCriteria, setBrigadeCriteria] = React.useState<'calm-under-pressure' | 'leadership-potential'>('calm-under-pressure');
    const [generatedBrigade, setGeneratedBrigade] = React.useState<BrigadeFormationResult | null>(null);


    // --- Phase 1 Mutations & Handlers (Risk Maps) ---
    const generateRiskMapMutation = useMutation<SafetyRiskMapDTO, Error, { locationContext: string; infrastructureContext: string; socialContext: string; language: string; analysisDepth: AnalysisDepth }>({
        mutationFn: (variables) =>
        fetch('/api/safety-lab/generate-risk-map', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyRiskMaps'] });
            setLocationContext('');
            setInfrastructureContext('');
            setSocialContext('');
            toast({ title: "Risk map generated and saved successfully." });
        },
        onError: () => {
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
        }
    });
    
    const deleteRiskMapMutation = useMutation<void, Error, string>({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/safety-lab/risk-maps/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete risk map');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyRiskMaps'] });
            toast({ title: 'Risk map deleted.' });
        },
        onError: () => {
            toast({ title: 'Failed to delete risk map.', variant: 'destructive' });
        }
    });

    const handleGenerateRiskMap = (e: React.FormEvent) => {
        e.preventDefault();
        generateRiskMapMutation.mutate({
            locationContext,
            infrastructureContext,
            socialContext,
            language: locale,
            analysisDepth,
        });
    }

    // --- Phase 2 Mutations & Handlers (Protocols) ---
    const generateProtocolMutation = useMutation<SafetyProtocolDTO, Error, { risk: string; language: string }>({
        mutationFn: (variables) =>
        fetch('/api/safety-lab/generate-protocol', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyProtocols'] });
            setProtocolRisk('');
            toast({ title: "Action protocol generated and saved successfully." });
        },
        onError: () => {
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
        }
    });

    const deleteProtocolMutation = useMutation<void, Error, string>({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/safety-lab/protocols/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete protocol');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyProtocols'] });
            toast({ title: 'Protocol deleted.' });
        },
        onError: () => {
            toast({ title: 'Failed to delete protocol.', variant: 'destructive' });
        }
    });

    const handleGenerateProtocol = (e: React.FormEvent) => {
        e.preventDefault();
        if (!protocolRisk.trim()) return;
        generateProtocolMutation.mutate({
            risk: protocolRisk,
            language: locale,
        });
    }

    // --- Phase 3 Mutations & Handlers (Crisis Scenarios) ---
    const generateCrisisScenarioMutation = useMutation<GenerateCrisisScenarioOutput, Error, { crisisType: string; history?: SimulationHistoryItem[], language: string, simulationLength: SimulationLength, students?: Partial<StudentDTO>[], currentScore: number }>({
        mutationFn: (variables) =>
        fetch('/api/safety-lab/generate-crisis-scenario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        }),
        onSuccess: (data, variables) => {
            setSimulationError(false); // Clear any previous error on success
            setSimulationResult(data);
            
            const lastHistoryItem = simulationHistory[simulationHistory.length - 1];

            // This is the first turn, there is no previous user action to evaluate.
            if (!variables.history || variables.history.length === 0) {
                setSimulationHistory([{ role: 'model', text: data.narrative }]);
                return;
            }

            if (data.evaluation) { // Only add evaluation if it exists
                 // Create a new array for the updated history
                const newHistory = [...simulationHistory];
                // Find the last user message to attach the evaluation to its *following model response*
                // The logic is a bit tricky. We want to show the evaluation with the AI's *response* to the user's action.
                const lastModelMessageIndex = newHistory.findLastIndex(h => h.role === 'model');

                // A new model response is about to be pushed. Add the evaluation to IT.
                const newModelMessage: SimulationHistoryItem = {
                    role: 'model',
                    text: data.narrative,
                    evaluation: data.evaluation
                };
                newHistory.push(newModelMessage);
                setSimulationHistory(newHistory);

                setCurrentScore(prev => prev + (data.evaluation?.scoreChange || 0));
            } else {
                 setSimulationHistory(prev => [...prev, { role: 'model', text: data.narrative }]);
            }
        },
        onError: () => {
            setSimulationError(true);
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
        }
    });

    const generateScenarioMutation = useMutation<GenerateDigitalConflictScenarioOutput, Error, void>({
        mutationFn: () => 
            fetch('/api/safety-lab/generate-conflict-scenario', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    language: locale,
                    topics: scenarioTopics.split(',').map(t => t.trim()).filter(Boolean),
                })
            }).then(res => {
                if(!res.ok) throw new Error("API Error");
                return res.json();
            }),
        onSuccess: (data) => {
            setGeneratedScenario(data);
        },
        onError: () => {
            toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
        }
    });

    const handleGenerateScenario = (e: React.FormEvent) => {
        e.preventDefault();
        generateScenarioMutation.mutate();
    }
    
    const deleteCrisisScenarioMutation = useMutation<void, Error, string>({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/safety-lab/crisis-scenarios/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete simulation scenario');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['crisisScenarios'] });
            toast({ title: 'Simulation scenario deleted.' });
        },
        onError: () => {
            toast({ title: 'Failed to delete simulation scenario.', variant: 'destructive' });
        }
    });

    const handleStartSimulation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!crisisType.trim()) return;
        
        let studentsForSim: StudentDTO[] = [];
        if (selectedBrigadeForSim) {
            const brigade = committees.find(c => c.id === selectedBrigadeForSim);
            if (brigade) {
                studentsForSim = brigade.members.map(m => m.student as StudentDTO);
            }
        }

        handleResetSimulation();
        generateCrisisScenarioMutation.mutate({
            crisisType,
            language: locale,
            simulationLength,
            students: studentsForSim,
            currentScore: 0,
        });
    }
    
    const handleSimulationChoice = (choice: string) => {
        setSimulationError(false);
        const newHistory: SimulationHistoryItem[] = [...simulationHistory, { role: 'user', text: choice }];
        setSimulationHistory(newHistory);
        setSimulationResult(null); // Clear previous choices
        
        let studentsForSim: StudentDTO[] = [];
        if (selectedBrigadeForSim) {
            const brigade = committees.find(c => c.id === selectedBrigadeForSim);
            if (brigade) {
                studentsForSim = brigade.members.map(m => m.student as StudentDTO);
            }
        }
        
        generateCrisisScenarioMutation.mutate({
            crisisType,
            history: newHistory,
            language: locale,
            simulationLength,
            students: studentsForSim,
            currentScore
        })
    };
    
    const handleRetryLastStep = () => {
        setSimulationError(false);
        // We retry by sending the history *including* the last failed user choice
        
        let studentsForSim: StudentDTO[] = [];
        if (selectedBrigadeForSim) {
            const brigade = committees.find(c => c.id === selectedBrigadeForSim);
            if (brigade) {
                studentsForSim = brigade.members.map(m => m.student as StudentDTO);
            }
        }

        generateCrisisScenarioMutation.mutate({
            crisisType,
            history: simulationHistory,
            language: locale,
            simulationLength,
            students: studentsForSim,
            currentScore
        });
    }
    
    const handleResetSimulation = () => {
        setCrisisType('');
        setSimulationHistory([]);
        setSimulationResult(null);
        setCurrentScore(0);
        setSelectedBrigadeForSim(null);
        setSimulationError(false);
    }

    // --- Brigade Formation Mutations & Handlers ---
    const generateBrigadeMutation = useMutation<BrigadeFormationResult, Error, void>({
        mutationFn: () => fetch('/api/safety-lab/generate-brigade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ objective: brigadeObjective, criteria: brigadeCriteria, language: locale })
        }).then(res => {
            if (!res.ok) throw new Error("API Error");
            return res.json();
        }),
        onSuccess: (data) => {
            setGeneratedBrigade(data);
            toast({ title: 'Brigade suggestion generated!' });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' })
    });

    const handleGenerateBrigade = (e: React.FormEvent) => {
        e.preventDefault();
        if (!brigadeObjective) return;
        generateBrigadeMutation.mutate();
    }

    // --- Phase 4 Mutations & Handlers (Committees) ---

    const createCommitteeMutation = useMutation<SafetyCommitteeDTO, Error, { name: string, members?: { studentId: string; role: string }[]; missions?: { text: string; status: 'pending' | 'completed' }[] }>({
        mutationFn: (variables) =>
        fetch('/api/safety-lab/committees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyCommittees'] });
            setNewCommitteeName('');
            setGeneratedBrigade(null);
            setBrigadeObjective('');
            toast({ title: 'Brigade created successfully.' });
        },
        onError: () => {
            toast({ title: 'Failed to create brigade.', variant: 'destructive' });
        }
    });
    
    const deleteCommitteeMutation = useMutation<void, Error, string>({
        mutationFn: async (committeeId) => {
            const response = await fetch(`/api/safety-lab/committees/${committeeId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete committee');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyCommittees'] });
            toast({ title: 'Brigade deleted.' });
        },
        onError: () => {
            toast({ title: 'Failed to delete brigade.', variant: 'destructive' });
        }
    });

    const addMemberMutation = useMutation<SafetyCommitteeDTO, Error, { committeeId: string, studentId: string, role: string }>({
        mutationFn: ({ committeeId, studentId, role }) => fetch(`/api/safety-lab/committees/${committeeId}/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, role })
        }).then(res => {
            if(!res.ok) throw new Error('Failed to add member.');
            return res.json();
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyCommittees'] });
        },
        onError: () => {
             toast({ title: 'Failed to add member.', variant: 'destructive' });
        }
    });

    const removeMemberMutation = useMutation<SafetyCommitteeDTO, Error, { committeeId: string, studentId: string }>({
        mutationFn: ({ committeeId, studentId }) => fetch(`/api/safety-lab/committees/${committeeId}/members/${studentId}`, {
            method: 'DELETE',
        }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyCommittees'] });
        }
    });
    
    const suggestRoleMutation = useMutation<{role: string; justification: string;}, Error, { committeeId: string, studentId: string }>({
        mutationFn: ({ committeeId, studentId }) => fetch(`/api/safety-lab/committees/${committeeId}/suggest-role`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, language: locale })
        }).then(res => {
            if (!res.ok) throw new Error('Failed to suggest role.');
            return res.json();
        }),
    });

    const addMissionMutation = useMutation<SafetyCommitteeDTO, Error, { committeeId: string; missionText: string }>({
        mutationFn: async ({ committeeId, missionText }) => {
            const response = await fetch(`/api/safety-lab/committees/${committeeId}/missions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: missionText, status: 'pending' })
            });
            if (!response.ok) {
                throw new Error('Failed to add mission.');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyCommittees'] });
        }
    });

    const toggleMissionStatusMutation = useMutation<SafetyCommitteeDTO, Error, { committeeId: string; missionIndex: number; newStatus: 'pending' | 'completed' }>({
        mutationFn: ({ committeeId, missionIndex, newStatus }) =>
            fetch(`/api/safety-lab/committees/${committeeId}/missions/${missionIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            }).then(res => {
                if (!res.ok) throw new Error('Failed to toggle mission status.');
                return res.json();
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safetyCommittees'] });
        }
    });


    const handleCreateCommittee = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommitteeName.trim()) return;
        createCommitteeMutation.mutate({ name: newCommitteeName });
    }

    const handleDownloadRiskMap = (riskMap: SafetyRiskMapDTO, locale: string, naturalLabel: string, socialLabel: string, infraLabel: string, riskLabel: string, priorityLabel: string, justificationLabel: string) => {
        const tableHeaderStyle = 'background-color: #f2f2f2; font-weight: bold; padding: 10px; border: 1px solid #ddd; text-align: left;';
        const tableCellStyle = 'padding: 10px; border: 1px solid #ddd;';
    
        const renderTable = (category: string, risks: any[]) => {
            if (!risks || risks.length === 0) return '';
            return `
                <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 20px;">${encode(category)}</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr>
                            <th style="${tableHeaderStyle}">${riskLabel}</th>
                            <th style="${tableHeaderStyle}">${priorityLabel}</th>
                            <th style="${tableHeaderStyle}">${justificationLabel}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${risks.map(risk => `
                            <tr>
                                <td style="${tableCellStyle}">${encode(risk.risk)}</td>
                                <td style="${tableCellStyle}">${encode(risk.priority)}</td>
                                <td style="${tableCellStyle}">${encode(risk.justification)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        };
    
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="${locale}">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${encode(riskMap.title)}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
              h1 { font-size: 1.8rem; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
            </style>
          </head>
          <body>
            <h1>${encode(riskMap.title)}</h1>
            <p>${encode(riskMap.riskMap.introduction)}</p>
            ${renderTable(naturalLabel, riskMap.riskMap.naturalRisks)}
            ${renderTable(socialLabel, riskMap.riskMap.socialRisks)}
            ${renderTable(infraLabel, riskMap.riskMap.infrastructureRisks)}
          </body>
          </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `risk_map_${riskMap.id}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDownloadProtocol = (protocol: SafetyProtocolDTO, locale: string, beforeLabel: string, duringLabel: string, afterLabel: string) => {
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="${locale}">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${encode(protocol.title)}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
              h1, h2 { color: #222; }
              h1 { font-size: 1.8rem; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
              h2 { font-size: 1.4rem; color: #333; margin-top: 2rem; border-left: 4px solid #8A2BE2; padding-left: 0.8rem; }
              ul { padding-left: 20px; }
              li { margin-bottom: 0.5rem; }
              strong { color: #555; }
            </style>
          </head>
          <body>
            <h1>${encode(protocol.title)}</h1>
            <h2>${encode(beforeLabel)}</h2>
            <ul>${protocol.beforeSteps.map((s: ProtocolStep) => `<li>${encode(s.text)} ${s.assignedBrigadeName ? `<strong>(${encode(s.assignedBrigadeName)})</strong>` : ''}</li>`).join('')}</ul>
            <h2>${encode(duringLabel)}</h2>
            <ul>${protocol.duringSteps.map((s: ProtocolStep) => `<li>${encode(s.text)} ${s.assignedBrigadeName ? `<strong>(${encode(s.assignedBrigadeName)})</strong>` : ''}</li>`).join('')}</ul>
            <h2>${encode(afterLabel)}</h2>
            <ul>${protocol.afterSteps.map((s: ProtocolStep) => `<li>${encode(s.text)} ${s.assignedBrigadeName ? `<strong>(${encode(s.assignedBrigadeName)})</strong>` : ''}</li>`).join('')}</ul>
          </body>
          </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `protocol_${protocol.risk.replace(/\s+/g, '_')}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    return {
        // --- Shared ---
        students,
        // --- Phase 1 ---
        locationContext, setLocationContext,
        infrastructureContext, setInfrastructureContext,
        socialContext, setSocialContext,
        analysisDepth, setAnalysisDepth,
        riskMaps, isLoadingRiskMaps,
        generateRiskMapMutation,
        handleGenerateRiskMap,
        deleteRiskMapMutation,
        handleDownloadRiskMap,
        viewingRiskMap,
        setViewingRiskMap,

        // --- Phase 2 ---
        protocolRisk, setProtocolRisk,
        protocols, isLoadingProtocols,
        generateProtocolMutation,
        handleGenerateProtocol,
        deleteProtocolMutation,
        handleDownloadProtocol,

        // --- Phase 3 ---
        crisisType, setCrisisType,
        simulationLength, setSimulationLength,
        selectedBrigadeForSim, setSelectedBrigadeForSim,
        simulationHistory,
        setSimulationHistory, // For reset
        simulationResult,
        setSimulationResult, // For reset
        currentScore,
        generateCrisisScenarioMutation,
        handleStartSimulation,
        handleSimulationChoice,
        handleResetSimulation,
        crisisScenarios,
        isLoadingCrisisScenarios,
        deleteCrisisScenarioMutation,
        simulationError,
        handleRetryLastStep,
        scenarioTopics, setScenarioTopics,
        generatedScenario,
        generateScenarioMutation,
        handleGenerateScenario,
        
        // --- Phase 4 ---
        newCommitteeName, setNewCommitteeName,
        committees, isLoadingCommittees,
        createCommitteeMutation,
        handleCreateCommittee,
        deleteCommitteeMutation,
        addMemberMutation,
        removeMemberMutation,
        suggestRoleMutation,
        addMissionMutation,
        toggleMissionStatusMutation,

        // Brigade Formation
        brigadeObjective, setBrigadeObjective,
        brigadeCriteria, setBrigadeCriteria,
        generatedBrigade,
        generateBrigadeMutation,
        handleGenerateBrigade,
    };
}