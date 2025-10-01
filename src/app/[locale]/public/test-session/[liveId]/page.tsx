
'use client';

import PublicLayout from '@/components/PublicLayout';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import TestRunner from './_components/TestRunner';
import TestSelector from './_components/TestSelector';
import TestSubmissionComplete from './_components/TestSubmissionComplete';
import { usePublicTestSession } from './_hooks/usePublicTestSession';

function TestSessionPage() {
    const params = useParams();
    const liveId = params.liveId as string;

    const {
        localSession,
        sessionData,
        isLoading,
        currentQuestionIndex,
        allQuestions,
        handleAnswerChange,
        handleNextQuestion,
        handlePreviousQuestion,
        handleSubmit,
        submitMutation,
        handleSelectStudent,
        isTestSubmitted,
        handleLeaveSession,
    } = usePublicTestSession(liveId);
    
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (localSession) {
                handleLeaveSession();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [localSession, handleLeaveSession]);
    
    if (isLoading || !sessionData && !localSession) {
        return (
            <PublicLayout>
                <div className="flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            </PublicLayout>
        )
    }
    
    if (!localSession) {
        return (
            <PublicLayout>
                <TestSelector
                    sessionData={sessionData}
                    onSelectStudent={handleSelectStudent}
                    isLoading={true}
                />
            </PublicLayout>
        );
    }
    
    if (isTestSubmitted) {
        return (
            <PublicLayout>
                <TestSubmissionComplete />
            </PublicLayout>
        )
    }

    const currentQuestion = allQuestions[currentQuestionIndex];
    
    if (!currentQuestion) {
        return (
             <PublicLayout>
                <div className="flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <main className="container mx-auto p-4 md:p-8 flex items-center justify-center">
                <TestRunner
                    question={currentQuestion}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={allQuestions.length}
                    answers={localSession.answers}
                    onAnswerChange={handleAnswerChange}
                    onSubmit={handleSubmit}
                    onNext={handleNextQuestion}
                    onPrevious={handlePreviousQuestion}
                    isSubmitting={submitMutation.isPending}
                    onLeave={handleLeaveSession}
                />
            </main>
        </PublicLayout>
    );
}

export default TestSessionPage;
