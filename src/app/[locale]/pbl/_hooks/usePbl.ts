

'use client';

import { useState, useMemo, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { SkillDTO } from '@/modules/skill/application/dtos/skill.dto';
import { PblProjectDTO } from '@/modules/pbl/application/dtos/pbl.dto';
import { TeamFormationResult, TeamFormationWithId } from '@/modules/pbl/application/dtos/pbl-team-formation.dto';
import { useStudentData } from '../../_hooks/useStudentData';
import { ScaffoldingSuggestion } from '@/modules/pbl/application/dtos/pbl-scaffolding.dto';
import { GenerateRubricOutput } from '@/modules/rubric-suggestion/application/dtos/rubric-generation.dto';
import { RubricCriterion } from '@/modules/rubric-suggestion/application/dtos/rubric-suggestion.dto';


export function usePbl() {
  const tToast = useScopedI18n('toasts');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // --- Phase 1 State ---
  const [topic, setTopic] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [duration, setDuration] = useState('2-weeks');
  
  // --- Phase 2 State ---
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState(3);
  const [groupingCriteria, setGroupingCriteria] = useState<'balanced' | 'social-remediation' | 'synergy'>('balanced');
  const [teamFormationToDelete, setTeamFormationToDelete] = useState<string | null>(null);

  // --- Phase 3 State ---
  const [scaffoldingTeamFormationId, setScaffoldingTeamFormationId] = useState<string | null>(null);
  const [scaffoldingTeamIndex, setScaffoldingTeamIndex] = useState<number | null>(null);
  const [scaffoldingProblem, setScaffoldingProblem] = useState('');
  const [scaffoldingSuggestion, setScaffoldingSuggestion] = useState<ScaffoldingSuggestion | null>(null);

  // --- Phase 4 State ---
  const [selectedProjectForEval, setSelectedProjectForEval] = useState<string | null>(null);
  const [generatedRubric, setGeneratedRubric] = useState<GenerateRubricOutput | null>(null);

  // --- Skills Dialog State ---
  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillDTO | null>(null);

  const { students: allStudents } = useStudentData();
  const studentOptions = allStudents.map(s => ({ value: s.id, label: s.name }));


  const { data: availableSkills = [], isLoading: isLoadingSkills } = useQuery<SkillDTO[]>({
    queryKey: ['skills'],
    queryFn: () => fetch('/api/skills').then(res => res.json()),
  });

  const { data: projectHistory = [], isLoading: isLoadingHistory } = useQuery<PblProjectDTO[]>({
    queryKey: ['pblProjects'],
    queryFn: () => fetch('/api/pbl').then(res => res.json()),
  });

  const { data: allTeamFormations = [], isLoading: isLoadingAllTeamFormations } = useQuery<TeamFormationWithId[]>({
      queryKey: ['pblAllTeamFormations'],
      queryFn: () => fetch('/api/pbl/teams').then(res => res.json()),
  });

  const { data: teamFormations = [], isLoading: isLoadingTeamFormations } = useQuery<TeamFormationWithId[]>({
      queryKey: ['pblTeamFormations', selectedProjectId],
      queryFn: () => fetch(`/api/pbl/teams?projectId=${selectedProjectId}`).then(res => res.json()),
      enabled: !!selectedProjectId,
  });

  const generateProjectMutation = useMutation<PblProjectDTO, Error, { topic: string; skills: string[]; duration: string; language: string; }>({
    mutationFn: (variables) => 
        fetch('/api/pbl/generate-project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables),
        }).then(res => {
            if(!res.ok) throw new Error("Failed to generate project");
            return res.json();
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pblProjects'] });
        toast({ title: 'Project Plan Generated!' });
        setTopic('');
        setSelectedSkills(new Set());
    },
    onError: () => {
        toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
    }
  });
  
  const deleteProjectMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
        const response = await fetch(`/api/pbl/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pblProjects'] });
      toast({ title: 'Project deleted successfully.' });
    },
    onError: () => {
      toast({ title: 'Failed to delete project.', variant: 'destructive' });
    }
  });

  const generateTeamsMutation = useMutation<TeamFormationResult, Error, { projectId: string; teamSize: number; criteria: string; language: string }>({
    mutationFn: (data) =>
      fetch('/api/pbl/generate-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => {
        if(!res.ok) throw new Error("Failed to generate teams");
        return res.json();
      }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pblTeamFormations', selectedProjectId] });
        queryClient.invalidateQueries({ queryKey: ['pblAllTeamFormations'] });
        toast({ title: 'Teams Generated Successfully!' });
    },
    onError: () => {
        toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
    }
  });

  const deleteTeamFormationMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/pbl/teams/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error("Failed to delete team formation");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pblTeamFormations', selectedProjectId] });
       queryClient.invalidateQueries({ queryKey: ['pblAllTeamFormations'] });
      toast({ title: 'Team formation deleted successfully.' });
    },
    onError: () => {
      toast({ title: 'Failed to delete team formation.', variant: 'destructive' });
    }
  });
  
  const generateScaffoldingMutation = useMutation<ScaffoldingSuggestion, Error, { team: {name: string, qualities: string[]}[]; problem: string; language: string; }>({
      mutationFn: (data) =>
        fetch('/api/pbl/generate-scaffolding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then(res => {
          if (!res.ok) throw new Error("Failed to generate scaffolding suggestion");
          return res.json();
        }),
      onSuccess: (data: ScaffoldingSuggestion) => {
        setScaffoldingSuggestion(data);
        toast({ title: 'Intervention plan generated!' });
      },
      onError: () => {
        toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
      }
  })

  const generateRubricMutation = useMutation<GenerateRubricOutput, Error, string>({
    mutationFn: (activityDescription: string) => 
        fetch('/api/suggestions/generate-rubric', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ activityDescription, language: locale }),
        }).then(res => {
            if (!res.ok) throw new Error("Failed to generate rubric");
            return res.json();
        }),
    onSuccess: (data: GenerateRubricOutput) => {
        setGeneratedRubric(data);
        toast({ title: 'Rubric generated successfully!' });
    },
    onError: () => {
        toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' });
    }
  });

  const handleSkillChange = (skillName: string) => {
    setSelectedSkills(prev => {
      const newSkills = new Set(prev);
      if (newSkills.has(skillName)) {
        newSkills.delete(skillName);
      } else {
        newSkills.add(skillName);
      }
      return newSkills;
    });
  };
  
  const handlePhase1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || selectedSkills.size === 0) return;
    
    generateProjectMutation.mutate({
      topic,
      skills: Array.from(selectedSkills),
      duration,
      language: locale,
    });
  }

  const handlePhase2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    generateTeamsMutation.mutate({
      projectId: selectedProjectId,
      teamSize,
      criteria: groupingCriteria,
      language: locale,
    });
  };
  
  const handlePhase3Submit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!scaffoldingTeamFormationId || scaffoldingTeamIndex === null || !scaffoldingProblem.trim()) return;
      
      const formation = allTeamFormations.find(f => f.id === scaffoldingTeamFormationId);
      const team = formation?.teams[scaffoldingTeamIndex];

      if (!team) return;

      const studentIds = team.members.map(m => m.studentId);
      const studentsForTeam = allStudents.filter(s => studentIds.includes(s.id));
      
      const teamProfiles = studentsForTeam.map(s => ({ name: s.name, qualities: s.qualities }));
      
      generateScaffoldingMutation.mutate({
          team: teamProfiles,
          problem: scaffoldingProblem,
          language: locale
      });
  }

  const handlePhase4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectForEval) return;
    const project = projectHistory.find(p => p.id === selectedProjectForEval);
    if (!project) return;
    
    const activityDescription = `${project.topic} - ${project.essentialQuestion}`;
    generateRubricMutation.mutate(activityDescription);
  };
  
  const handleToggleEditMode = () => {
    setIsEditMode(prev => !prev);
  }


  const projectOptions = useMemo(() => 
    projectHistory.map(p => ({ value: p.id, label: p.topic })),
    [projectHistory]
  );
  
  const teamOptions = useMemo(() => {
    return allTeamFormations.flatMap((formation) => {
      const project = projectHistory.find(p => p.id === formation.projectId);
      if (!project) return [];
      
      return formation.teams.map((team, index) => ({
        value: `${formation.id}::${index}`,
        label: `[${project.topic}] ${team.teamName}: ${team.members.map(m => m.name).join(', ')}`
      }));
    });
  }, [allTeamFormations, projectHistory]);

  const handleTeamSelectionForScaffolding = (selectedValue: string) => {
    if (selectedValue) {
        const [formationId, teamIndexStr] = selectedValue.split('::');
        setScaffoldingTeamFormationId(formationId);
        setScaffoldingTeamIndex(parseInt(teamIndexStr, 10));
    } else {
        setScaffoldingTeamFormationId(null);
        setScaffoldingTeamIndex(null);
    }
  }


  return {
    // Phase 1
    topic, setTopic,
    selectedSkills, handleSkillChange,
    duration, setDuration,
    generateProjectMutation,
    handlePhase1Submit,
    isAddSkillDialogOpen, setIsAddSkillDialogOpen,
    isEditMode, handleToggleEditMode,
    editingSkill, setEditingSkill,
    
    // Phase 2
    selectedProjectId, setSelectedProjectId,
    teamSize, setTeamSize,
    groupingCriteria, setGroupingCriteria,
    generateTeamsMutation,
    handlePhase2Submit,
    teamFormations, isLoadingTeamFormations,
    teamFormationToDelete, setTeamFormationToDelete,
    deleteTeamFormationMutation,
    
    // Phase 3
    scaffoldingProblem, setScaffoldingProblem,
    scaffoldingSuggestion,
    generateScaffoldingMutation,
    handlePhase3Submit,
    teamOptions,
    handleTeamSelectionForScaffolding,
    scaffoldingTeamFormationId,
    scaffoldingTeamIndex,

    // Phase 4
    selectedProjectForEval, setSelectedProjectForEval,
    generateRubricMutation,
    handlePhase4Submit,
    generatedRubric,

    // Common
    availableSkills, isLoadingSkills,
    projectHistory, isLoadingHistory,
    deleteProjectMutation,
    projectOptions,
  };
}

