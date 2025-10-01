'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Book, User, BrainCircuit } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useTeacherLab } from '../_hooks/useTeacherLab';
import ReactMarkdown from 'react-markdown';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MbeExpertTabProps {
    hooks: ReturnType<typeof useTeacherLab>;
}

const MbeExpertTab: React.FC<MbeExpertTabProps> = ({ hooks }) => {
    const t = useScopedI18n('teacherLab.mbeExpert');

    const {
        mbeQuestion,
        setMbeQuestion,
        mbeStudentContext,
        setMbeStudentContext,
        mbeConsultationResult,
        generateMbeConsultationMutation,
        handleConsultMbe,
        studentOptions,
        mbeDocumentUrl,
        setMbeDocumentUrl,
        loadMbeDocumentMutation,
        handleLoadMbeDocument
    } = hooks;

    const isGenerating = generateMbeConsultationMutation.isPending;
    const isLoadingDocument = loadMbeDocumentMutation.isPending;

    return (
        <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Book className="text-primary"/>{t('knowledgeBase.title')}</CardTitle>
                    <CardDescription>{t('knowledgeBase.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLoadMbeDocument} className="flex flex-col md:flex-row items-end gap-4">
                        <div className="flex-grow space-y-2">
                            <Label htmlFor="mbe-url">{t('knowledgeBase.urlLabel')}</Label>
                            <Input
                                id="mbe-url"
                                value={mbeDocumentUrl}
                                onChange={(e) => setMbeDocumentUrl(e.target.value)}
                                placeholder={t('knowledgeBase.urlPlaceholder')}
                            />
                        </div>
                        <Button type="submit" disabled={isLoadingDocument || !mbeDocumentUrl.trim()}>
                            {isLoadingDocument ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                            {t('knowledgeBase.loadButton')}
                        </Button>
                    </form>
                </CardContent>
             </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('title')}</CardTitle>
                            <CardDescription>{t('description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleConsultMbe} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="mbe-question">{t('questionLabel')}</Label>
                                    <Textarea
                                        id="mbe-question"
                                        value={mbeQuestion}
                                        onChange={(e) => setMbeQuestion(e.target.value)}
                                        placeholder={t('questionPlaceholder')}
                                        rows={5}
                                        className="text-base"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="student-context">{t('studentContextLabel')}</Label>
                                    <Select
                                        id="student-context"
                                        options={studentOptions}
                                        value={studentOptions.find(opt => opt.value === mbeStudentContext) || null}
                                        onChange={(option) => setMbeStudentContext(option ? option.value : null)}
                                        placeholder={t('studentContextPlaceholder')}
                                        isClearable
                                    />
                                </div>
                                <Button type="submit" disabled={isGenerating || !mbeQuestion.trim()} className="w-full">
                                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                                    {t('button')}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Respuesta del Experto</CardTitle>
                        </CardHeader>
                        <CardContent>
                        {isGenerating ? (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        ) : mbeConsultationResult ? (
                            <div className="prose prose-sm max-w-none">
                                <ReactMarkdown>{mbeConsultationResult}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-12">
                                <BrainCircuit className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm">{t('noResults')}</p>
                            </div>
                        )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MbeExpertTab;
