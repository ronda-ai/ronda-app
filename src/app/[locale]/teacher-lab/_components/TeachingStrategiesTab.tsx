'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, BrainCircuit, Sparkles, Upload, FileAudio } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useTeacherLab } from '../_hooks/useTeacherLab';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import { Progress } from '@/components/ui/progress';

interface TeachingStrategiesTabProps {
    hooks: ReturnType<typeof useTeacherLab>;
}

const TeachingStrategiesTab: React.FC<TeachingStrategiesTabProps> = ({ hooks }) => {
    const t = useScopedI18n('teacherLab.questionAnalysis');
    const tAudio = useScopedI18n('teacherLab.audioAnalysis');
    const {
        questionsToAnalyze,
        setQuestionsToAnalyze,
        questionAnalysisResult,
        generateQuestionAnalysisMutation,
        handleAnalyzeQuestions,
        audioFile,
        handleAudioFileChange,
        handleAnalyzeAudio,
        audioAnalysisResult,
        generateAudioAnalysisMutation,
        transcriptionProgress,
    } = hooks;

    const isAnalyzingQuestions = generateQuestionAnalysisMutation.isPending;
    const isAnalyzingAudio = generateAudioAnalysisMutation.isPending;
    
    const questionChartData = React.useMemo(() => {
        if (!questionAnalysisResult) return [];
        const levelCounts: Record<string, number> = {
            'Remembering': 0, 'Understanding': 0, 'Applying': 0,
            'Analyzing': 0, 'Evaluating': 0, 'Creating': 0,
        };
        questionAnalysisResult.analyses.forEach(analysis => {
            levelCounts[analysis.bloomLevel] = (levelCounts[analysis.bloomLevel] || 0) + 1;
        });
        return Object.entries(levelCounts).map(([name, value]) => ({ name, value }));
    }, [questionAnalysisResult]);
    
    const talkTimeData = audioAnalysisResult ? [
        { name: 'Teacher', value: audioAnalysisResult.teacherTalkPercentage, fill: 'hsl(var(--primary))' },
        { name: 'Student', value: 100 - audioAnalysisResult.teacherTalkPercentage, fill: 'hsl(var(--secondary))' }
    ] : [];

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BrainCircuit />{t('title')}</CardTitle>
                        <CardDescription>{t('description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAnalyzeQuestions} className="space-y-4">
                            <Textarea
                                value={questionsToAnalyze}
                                onChange={(e) => setQuestionsToAnalyze(e.target.value)}
                                placeholder={t('placeholder')}
                                rows={10}
                                className="text-base"
                            />
                            <Button type="submit" disabled={isAnalyzingQuestions || !questionsToAnalyze.trim()}>
                                {isAnalyzingQuestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                                {t('button')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2"><FileAudio />{tAudio('title')}</CardTitle>
                        <CardDescription>{tAudio('description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                               <input
                                    type="file"
                                    id="audio-upload"
                                    accept="audio/*"
                                    onChange={handleAudioFileChange}
                                    className="hidden"
                                />
                                <label htmlFor="audio-upload" className="flex-grow">
                                    <Button asChild variant="outline" className="w-full cursor-pointer">
                                        <div>
                                            <Upload className="mr-2 h-4 w-4" />
                                            {tAudio('selectFileButton')}
                                        </div>
                                    </Button>
                                </label>
                            </div>
                            {audioFile && <p className="text-sm text-muted-foreground">{tAudio('selectedFile')}: {audioFile.name}</p>}
                             {isAnalyzingAudio && transcriptionProgress !== null && (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">{tAudio(transcriptionProgress < 100 ? 'progress.transcribing' : 'progress.analyzing')}</p>
                                    <Progress value={transcriptionProgress} className="w-full" />
                                </div>
                            )}
                            <Button onClick={handleAnalyzeAudio} disabled={!audioFile || isAnalyzingAudio} className="w-full">
                                {isAnalyzingAudio ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                                {tAudio('analyzeButton')}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
               <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{t('resultsTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isAnalyzingQuestions ? (
                      <div className="space-y-4">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    ) : questionAnalysisResult ? (
                      <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2">{t('summaryTitle')}</h4>
                            <p className="text-sm italic text-muted-foreground">"{questionAnalysisResult.summary}"</p>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer>
                                <BarChart data={questionChartData} layout="vertical" margin={{ left: 80 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" allowDecimals={false} />
                                    <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="hsl(var(--primary))" barSize={20}>
                                        <LabelList dataKey="value" position="right" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4">
                            {questionAnalysisResult.analyses.map((analysis, index) => (
                                <div key={index} className="p-4 border rounded-md">
                                    <p className="text-sm text-muted-foreground italic">"{analysis.question}"</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Badge>{analysis.bloomLevel}</Badge>
                                        <p className="text-xs text-muted-foreground">{analysis.justification}</p>
                                    </div>
                                    <div className="mt-3 pt-3 border-t">
                                        <p className="text-sm text-green-600 font-semibold">{t('suggestionLabel')}: <span className="italic font-normal">"{analysis.suggestion}"</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                        <BrainCircuit className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold">{t('noResults')}</h4>
                      </div>
                    )}
                  </CardContent>
               </Card>
                 {audioAnalysisResult && (
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>{tAudio('resultsTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h4 className="font-semibold">{tAudio('talkTime')}</h4>
                                <ResponsiveContainer width="100%" height={40}>
                                    <BarChart layout="vertical" data={talkTimeData} stackOffset="expand">
                                        <XAxis type="number" hide />
                                        <YAxis type="category" dataKey="name" hide />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="var(--color-fill)" background={{ fill: 'hsl(var(--secondary))' }} stackId="a">
                                             <LabelList
                                                dataKey="value"
                                                position="center"
                                                formatter={(value: number) => `${Math.round(value)}%`}
                                                className="fill-primary-foreground font-bold"
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="flex justify-between text-sm">
                                    <span>{tAudio('teacher')}: {Math.round(audioAnalysisResult.teacherTalkPercentage)}%</span>
                                    <span>{tAudio('student')}: {Math.round(100 - audioAnalysisResult.teacherTalkPercentage)}%</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold">{tAudio('questionAnalysis')}</h4>
                                <p className="text-sm text-muted-foreground">{audioAnalysisResult.questionAnalysis}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold">{tAudio('atmosphere')}</h4>
                                <p className="text-sm text-muted-foreground">{audioAnalysisResult.atmosphere}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold">{tAudio('recommendations')}</h4>
                                <div className="prose prose-sm max-w-none text-muted-foreground">
                                    <ReactMarkdown>{audioAnalysisResult.recommendations}</ReactMarkdown>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default TeachingStrategiesTab;
