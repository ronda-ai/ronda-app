
'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/locales/client';
import { getDB } from '@/lib/db';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { DebateDTO } from '@/modules/debate/application/dtos/debate.dto';

interface SessionData {
  debate: DebateDTO;
  availableStudents: StudentDTO[];
  rejoinableStudents: StudentDTO[];
}

export function usePublicDebateSession(liveId: string) {
    const tPublicDebate = useScopedI18n('publicDebateSession');
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [selectedStudent, setSelectedStudent] = useState<StudentDTO | null>(null);
    const [joinedTeam, setJoinedTeam] = useState<'affirmative' | 'negative' | null>(null);
    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    
    const { data, isLoading: isLoadingData, isError } = useQuery<SessionData>({
        queryKey: ['publicDebateSession', liveId],
        queryFn: async () => {
            const res = await fetch(`/api/games/debate/session/${liveId}`);
            if (!res.ok) throw new Error('Session not found');
            return res.json();
        },
        enabled: !!liveId,
        refetchOnWindowFocus: true,
        refetchInterval: 5000,
    });

    const joinTeamMutation = useMutation({
        mutationFn: async ({ studentId, studentName, team }: { studentId: string; studentName: string; team: 'affirmative' | 'negative' }) => {
            const res = await fetch(`/api/games/debate/session/${liveId}/join`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, team }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to join team');
            }
            return { studentId, studentName, team };
        },
        onSuccess: async ({ studentId, studentName, team }) => {
            const db = await getDB();
            if (db) {
                await db.put('debate-sessions', { studentId, studentName, team }, liveId);
            }
            setJoinedTeam(team);
            queryClient.invalidateQueries({ queryKey: ['publicDebateSession', liveId] });
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: 'destructive' });
        }
    });

    const leaveTeamMutation = useMutation({
        mutationFn: async (studentId: string) => {
             const res = await fetch(`/api/games/debate/session/${liveId}/leave`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId }),
            });
             if (!res.ok) {
                throw new Error('Failed to leave team');
            }
        },
        onSuccess: async () => {
            await handleReset();
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: 'destructive' });
        }
    });


    useEffect(() => {
        const loadSessionFromDB = async () => {
            const db = await getDB();
            if (db && data) {
                const session = await db.get('debate-sessions', liveId);
                if (session) {
                    const student = data.availableStudents.find(s => s.id === session.studentId) || (data.rejoinableStudents || []).find(s => s.id === session.studentId);
                    setSelectedStudent(student || null);
                    setJoinedTeam(session.team);
                }
            }
             setIsSessionLoaded(true);
        };
        if(data) {
            loadSessionFromDB();
        }
    }, [liveId, data]);
    
    useEffect(() => {
        if (!data?.debate || data.debate.currentTurnIndex === -1) {
            setTimeLeft(0);
            return;
        }

        const calculateTimeLeft = () => {
            const debate = data.debate;
            const turn = debate.turnStructure[debate.currentTurnIndex];
            if (!turn) return 0;
            
            if (debate.isPaused) {
                return Math.max(0, turn.durationSeconds - Math.floor((debate.accumulatedPauseTime) / 1000));
            }
            
            if (!debate.turnStartedAt) return turn.durationSeconds;

            const now = new Date().getTime();
            const startTime = new Date(debate.turnStartedAt).getTime();
            const elapsedSinceStart = now - startTime;
            
            return Math.max(0, turn.durationSeconds - Math.floor(elapsedSinceStart / 1000));
        }
        
        setTimeLeft(calculateTimeLeft());

        if (data.debate.isPaused) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [data?.debate]);

    const joinTeam = (team: 'affirmative' | 'negative') => {
        if (selectedStudent) {
            joinTeamMutation.mutate({ studentId: selectedStudent.id, studentName: selectedStudent.name, team });
        }
    };
    
    const handleReset = async () => {
        const db = await getDB();
        if(db) {
            await db.delete('debate-sessions', liveId);
        }
        setSelectedStudent(null);
        setJoinedTeam(null);
    }

    const handleLeaveTeam = () => {
        if (selectedStudent) {
            leaveTeamMutation.mutate(selectedStudent.id);
        }
    }
    
    const students = data?.availableStudents || [];
    const currentTurn = data?.debate ? data.debate.turnStructure[data.debate.currentTurnIndex] : null;

    return {
        debate: data?.debate,
        students,
        isLoading: isLoadingData || !isSessionLoaded,
        isError,
        selectedStudent,
        setSelectedStudent,
        joinedTeam,
        joinTeam,
        isJoining: joinTeamMutation.isPending ? joinedTeam : false,
        handleLeaveTeam,
        isLeaving: leaveTeamMutation.isPending,
        handleReset,
        timeLeft,
        currentTurn,
    };
}
