
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Loader2 } from 'lucide-react';
import { usePublicTestSession, LocalSession } from '../_hooks/usePublicTestSession';
import { useParams } from 'next/navigation';
import { Question } from '@/modules/test/application/dtos/test.dto';

interface TestTakerProps {
    localSession: LocalSession;
}

const TestTaker: React.FC<TestTakerProps> = ({ localSession }) => {
    const t = useScopedI18n('publicTestSession');
    const tEvaluations = useScopedI18n('evaluations');
    const params = useParams();
    const liveId = params.liveId as string;

    const {
        currentQuestionIndex,
        allQuestions,
        handleAnswerChange,
        handleNextQuestion,
        handleSubmit,
        submitMutation,
    } = usePublicTestSession(liveId);

    const currentQuestion: Question | undefined = allQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;

    if (!currentQuestion) {
        return <Loader2 className="h-8 w-8 animate-spin" />;
    }

    return (
        <main className="container mx-auto p-4 md:p-8">
            <Card className="w-full max-w-2xl mx-auto">
                <form onSubmit={(e) => { e.preventDefault(); isLastQuestion ? handleSubmit() : handleNextQuestion(); }}>
                    <CardHeader>
                        <CardTitle>Question {currentQuestionIndex + 1} of {allQuestions.length}</CardTitle>
                        <CardDescription className="text-lg pt-2">{currentQuestion.text}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                            <RadioGroup 
                                onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
                                value={String(localSession.answers[currentQuestion.id] ?? '')}
                                >
                                <div className="space-y-2">
                                    {currentQuestion.options.map((opt, index) => (
                                        <Label key={index} htmlFor={`${currentQuestion.id}-${index}`} className="flex items-center gap-3 rounded-md border p-3 hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer">
                                            <RadioGroupItem value={String(index)} id={`${currentQuestion.id}-${index}`} />
                                            {opt.text}
                                        </Label>
                                    ))}
                                </div>
                            </RadioGroup>
                        )}
                        {currentQuestion.type === 'true-false' && (
                            <RadioGroup 
                                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value === 'true')}
                                value={String(localSession.answers[currentQuestion.id] ?? '')}
                                >
                                <div className="flex gap-4">
                                    <Label htmlFor={`${currentQuestion.id}-true`} className="flex items-center gap-3 rounded-md border p-3 flex-1 hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer">
                                        <RadioGroupItem value="true" id={`${currentQuestion.id}-true`} />
                                        {t('true')}
                                    </Label>
                                    <Label htmlFor={`${currentQuestion.id}-false`} className="flex items-center gap-3 rounded-md border p-3 flex-1 hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer">
                                        <RadioGroupItem value="false" id={`${currentQuestion.id}-false`} />
                                        {t('false')}
                                    </Label>
                                </div>
                            </RadioGroup>
                        )}
                        {currentQuestion.type === 'open-ended' && (
                            <Textarea
                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                                value={localSession.answers[currentQuestion.id] ?? ''}
                                placeholder={t('answerPlaceholder')}
                                rows={5}
                            />
                        )}
                    </CardContent>
                    <CardContent className="flex justify-end">
                        <Button type="submit" disabled={submitMutation.isPending}>
                           {submitMutation.isPending && isLastQuestion ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                 isLastQuestion ? t('submit') : tEvaluations('pagination.next')
                            )}
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </main>
    );
};

export default TestTaker;
