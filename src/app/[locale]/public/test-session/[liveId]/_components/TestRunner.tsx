
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { Question } from '@/modules/test/application/dtos/test.dto';

interface TestRunnerProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswerChange: (questionId: string, answer: any) => void;
  onSubmit: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
  answers: Record<string, any>;
  onLeave: () => void;
}

const TestRunner: React.FC<TestRunnerProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswerChange,
  onSubmit,
  onNext,
  onPrevious,
  isSubmitting,
  answers,
  onLeave,
}) => {
  const t = useScopedI18n('publicTestSession');
  const tEvaluations = useScopedI18n('evaluations');
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const renderQuestionInput = () => {
    switch (question.type) {
        case 'multiple-choice':
            return (
                 <RadioGroup key={question.id} onValueChange={(val) => onAnswerChange(question.id, parseInt(val))} value={String(answers[question.id] ?? '')}>
                    {question.options?.map((opt, index) => (
                         <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={String(index)} id={`q-${currentQuestionIndex}-opt-${index}`} />
                            <Label htmlFor={`q-${currentQuestionIndex}-opt-${index}`}>{opt.text}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )
        case 'true-false':
             return (
                 <RadioGroup key={question.id} onValueChange={(val) => onAnswerChange(question.id, val === 'true')} value={String(answers[question.id] ?? '')}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id={`q-${currentQuestionIndex}-true`} />
                        <Label htmlFor={`q-${currentQuestionIndex}-true`}>{t('true')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id={`q-${currentQuestionIndex}-false`} />
                        <Label htmlFor={`q-${currentQuestionIndex}-false`}>{t('false')}</Label>
                    </div>
                </RadioGroup>
             )
        case 'open-ended':
            return (
                <Textarea
                    key={question.id}
                    value={answers[question.id] || ''}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    placeholder={t('answerPlaceholder')}
                    rows={5}
                />
            )
        default:
            return null;
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={(e) => { e.preventDefault(); isLastQuestion ? onSubmit() : onNext(); }}>
        <CardHeader>
          <CardTitle>
            {t('question')} {currentQuestionIndex + 1} / {totalQuestions}
          </CardTitle>
          <Button variant="ghost" size="sm" type="button" onClick={onLeave}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('leaveSession')}
          </Button>
          <CardDescription className="text-lg pt-2">{question.text}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderQuestionInput()}
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious} disabled={currentQuestionIndex === 0}>
              {tEvaluations('pagination.previous')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && isLastQuestion ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                isLastQuestion ? t('submit') : tEvaluations('pagination.next')
                )}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TestRunner;
