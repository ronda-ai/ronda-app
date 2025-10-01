

'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import withAuth from '@/components/withAuth';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { ArrowLeft, BrainCircuit, CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import TestAnalysisDialog from './_components/TestAnalysisDialog';
import { useTestResults } from './_hooks/useTestResults';

function TestResultsPage() {
    const params = useParams();
    const router = useRouter();
    const testId = params.id as string;
    const t = useScopedI18n('tests.results');
    const tCommon = useScopedI18n('common');
    const tPublicTest = useScopedI18n('publicTestSession');
    const locale = useCurrentLocale();

    const {
        submissions,
        isLoading,
        test,
        analyzingSubmission,
        analysisResult,
        isAnalysisLoading,
        handleAnalyzeClick,
        closeAnalysisDialog
    } = useTestResults(testId);


    const getScorePercentage = (score: number, maxScore: number) => {
        if (maxScore === 0) return 0;
        return Math.round((score / maxScore) * 100);
    };

    const allQuestions = test?.blocks.flatMap(block => 
        block.questions.map(q => ({...q, blockTitle: block.title}))
    ) || [];
    const questionsMap = new Map(allQuestions.map(q => [q.id, q]));

    return (
        <DashboardLayout>
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('backButton')}
                    </Button>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('title')}</CardTitle>
                            <CardDescription>{t('description', { testName: test?.title || ''})}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {isLoading ? (
                                    <div className="p-4 space-y-3">
                                        <Skeleton className="h-10 w-full" />
                                        <Skeleton className="h-10 w-full" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                ) : submissions.length > 0 ? (
                                    submissions.map(sub => (
                                        <AccordionItem value={sub.id} key={sub.id}>
                                            <AccordionTrigger>
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="font-medium">{sub.studentName}</span>
                                                    <div className="flex items-center gap-4">
                                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                            <CheckCircle className="mr-1 h-3 w-3" />
                                                            {t('completed')}
                                                        </Badge>
                                                        <span className="font-mono font-semibold text-right">
                                                            {getScorePercentage(sub.score, sub.maxScore)}%
                                                            <span className="text-xs text-muted-foreground ml-1">({sub.score}/{sub.maxScore})</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="p-4 space-y-4 bg-muted/50 rounded-md mt-2">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="font-semibold">{t('submissionDetails')}</h4>
                                                        <Button size="sm" variant="outline" onClick={() => handleAnalyzeClick(sub)} disabled={isAnalysisLoading && analyzingSubmission?.id === sub.id}>
                                                            {isAnalysisLoading && analyzingSubmission?.id === sub.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <BrainCircuit className="mr-2 h-4 w-4"/>}
                                                            {t('analyzeWithAI')}
                                                        </Button>
                                                    </div>
                                                    {sub.answers.map(answer => {
                                                        const question = questionsMap.get(answer.questionId);
                                                        if (!question) return null;

                                                        const getAnswerText = (value: any) => {
                                                            if (question.type === 'multiple-choice' && question.options) {
                                                                return question.options[Number(value)]?.text || 'Invalid Option';
                                                            }
                                                            if(question.type === 'true-false') {
                                                                return value ? tPublicTest('true') : tPublicTest('false');
                                                            }
                                                            return String(value);
                                                        }

                                                        return (
                                                            <div key={answer.questionId} className="p-3 border-b">
                                                                <p className="font-medium text-sm">{question.text}</p>
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    {answer.isCorrect ? (
                                                                        <CheckCircle className="h-4 w-4 text-green-500"/>
                                                                    ) : (
                                                                        <XCircle className="h-4 w-4 text-red-500"/>
                                                                    )}
                                                                    <p className="text-sm text-muted-foreground">{t('studentAnswer')}: <span className="font-semibold text-foreground">{getAnswerText(answer.answer)}</span></p>
                                                                </div>
                                                                 {!answer.isCorrect && (
                                                                     <p className="text-sm text-green-600 ml-6">{t('correctAnswer')}: <span className="font-semibold">{getAnswerText(question.answer)}</span></p>
                                                                 )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))
                                ) : (
                                   <div className="text-center p-8 text-muted-foreground">
                                       {t('noSubmissions')}
                                   </div>
                                )}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
                 <TestAnalysisDialog
                    isOpen={!!analyzingSubmission}
                    onClose={closeAnalysisDialog}
                    analysis={analysisResult || null}
                    isLoading={isAnalysisLoading}
                    studentName={analyzingSubmission?.studentName || ''}
                />
            </main>
        </DashboardLayout>
    );
}

export default withAuth(TestResultsPage, ['teacher']);
