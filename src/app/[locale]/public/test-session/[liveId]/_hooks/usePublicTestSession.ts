
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getDB } from '@/lib/db';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Question, TestDTO } from '@/modules/test/application/dtos/test.dto';

export type LocalSession = {
    studentId: string;
    studentName: string;
    answers: Record<string, any>;
};

export type SessionData = {
    test: TestDTO,
    availableStudents: StudentDTO[];
    rejoinableStudents: StudentDTO[];
    allStudents: StudentDTO[];
};

export function usePublicTestSession(liveId: string) {
    const [localSession, setLocalSession] = useState<LocalSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionData, setSessionData] = useState<SessionData>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isTestSubmitted, setIsTestSubmitted] = useState(false);

    const allQuestions = useMemo(() => {
        if (!sessionData?.test?.blocks) return [];
        return sessionData.test.blocks.flatMap(block => 
            block.questions.map(q => ({...q, type: block.type }))
        );
    }, [sessionData?.test]);

    const submitMutation = useMutation({
        mutationFn: (answers: Record<string, any>) => {
            if (!localSession || !sessionData) return Promise.reject('No session');
            return fetch(`/api/tests/session/${liveId}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: localSession.studentId,
                    answers: answers,
                }),
            }).then(res => {
                if (!res.ok) throw new Error('Submission failed');
                return res.json();
            });
        },
        onSuccess: () => {
            setIsTestSubmitted(true);
            const dbPromise = getDB();
            if (dbPromise) {
                dbPromise.then(db => {
                    db.delete('test-sessions', liveId);
                });
            }
        },
    });

    const leaveSessionMutation = useMutation({
        mutationFn: () => {
            if (!localSession) return Promise.reject('No local session');
             return fetch(`/api/tests/session/${liveId}/leave`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: localSession.studentId }),
            });
        },
        onSuccess: () => {
             const dbPromise = getDB();
            if (dbPromise) {
                dbPromise.then(db => {
                    db.delete('test-sessions', liveId);
                });
            }
            setLocalSession(null);
            setCurrentQuestionIndex(0);
            // Optionally refetch session data to update student lists
            // queryClient.invalidateQueries({ queryKey: ['liveSession', liveId] });
        }
    });

     useEffect(() => {
        const checkLocalSession = async () => {
            if (!liveId) return;
            try {
                const db = await getDB();
                if (db) {
                    const savedSession = await db.get('test-sessions', liveId);
                    if (savedSession) {
                        setLocalSession(savedSession);
                    }
                }
            } catch (error) {
                console.error("Error accessing IndexedDB:", error);
            }
        };

        checkLocalSession();
    }, [liveId]);


    useEffect(() => {
        const fetchData = async () => {
            if (!liveId) return;
            setIsLoading(true);
            try {
                const res = await fetch(`/api/tests/session/${liveId}`);
                if (!res.ok) throw new Error("Session not found");
                const data = await res.json();
                
                const detailsRes = await fetch(`/api/tests/session/${liveId}/session-details`);
                 if (!detailsRes.ok) throw new Error("Could not fetch test details");
                const testDetails = await detailsRes.json();

                setSessionData({ ...data, test: testDetails });

            } catch (error) {
                console.error(error);
                setSessionData(undefined);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [liveId]);


    const handleSelectStudent = async (studentId: string) => {
        if (!sessionData) return;
        const student = sessionData.allStudents.find(s => s.id === studentId);
        if (!student) return;

        const newSession: LocalSession = { studentId, studentName: student.name, answers: {} };

        try {
            await fetch(`/api/tests/session/${liveId}/join`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ studentId }),
            });
            
            const db = await getDB();
            if(db) {
                await db.put('test-sessions', newSession, liveId);
            }
            setLocalSession(newSession);

        } catch (error) {
            console.error("Failed to join session:", error);
        }
    };

    const handleAnswerChange = (questionId: string, answer: any) => {
        if (!localSession) return;
        const newAnswers = { ...localSession.answers, [questionId]: answer };
        const updatedSession = { ...localSession, answers: newAnswers };
        setLocalSession(updatedSession);

        // Also update IndexedDB
        const dbPromise = getDB();
        if (dbPromise) {
            dbPromise.then(db => {
                if (db) {
                    db.put('test-sessions', updatedSession, liveId);
                }
            });
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < allQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
    };

    const handleSubmit = () => {
        if (localSession) {
            submitMutation.mutate(localSession.answers);
        }
    };

    const handleLeaveSession = useCallback(() => {
        leaveSessionMutation.mutate();
    }, [leaveSessionMutation]);

    return {
        localSession,
        isLoading,
        sessionData,
        handleSelectStudent,
        currentQuestionIndex,
        handleAnswerChange,
        handleNextQuestion,
        handlePreviousQuestion,
        handleSubmit,
        submitMutation,
        isTestSubmitted,
        allQuestions,
        handleLeaveSession,
    };
}
