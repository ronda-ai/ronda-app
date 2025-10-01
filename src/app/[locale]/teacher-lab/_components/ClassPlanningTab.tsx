
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Wand } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useTeacherLab } from '../_hooks/useTeacherLab';
import ReactMarkdown from 'react-markdown';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ClassPlanningTabProps {
    hooks: ReturnType<typeof useTeacherLab>;
}

const ClassPlanningTab: React.FC<ClassPlanningTabProps> = ({ hooks }) => {
    const t = useScopedI18n('teacherLab.planningCopilot');

    const {
        learningObjective,
        setLearningObjective,
        pedagogicalMenu,
        generateMenuMutation,
        handleGenerateMenu,
    } = hooks;

    const isGenerating = generateMenuMutation.isPending;

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleGenerateMenu} className="space-y-4">
                        <Textarea
                            value={learningObjective}
                            onChange={(e) => setLearningObjective(e.target.value)}
                            placeholder={t('objectivePlaceholder')}
                            rows={3}
                            className="text-base"
                        />
                        <Button type="submit" disabled={isGenerating || !learningObjective.trim()}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {t('generateButton')}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {isGenerating ? (
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('generating')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </CardContent>
                 </Card>
            ) : pedagogicalMenu ? (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('menuTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {pedagogicalMenu.approaches.map((approach, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                                <h3 className="text-xl font-bold text-primary mb-2">{approach.title}</h3>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <h4 className="font-semibold">{t('activities.start')}</h4>
                                        <p className="text-muted-foreground">{approach.activities.start}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{t('activities.development')}</h4>
                                        <p className="text-muted-foreground">{approach.activities.development}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{t('activities.closure')}</h4>
                                        <p className="text-muted-foreground">{approach.activities.closure}</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t space-y-3">
                                     <div className="prose prose-sm max-w-none text-muted-foreground">
                                        <h4 className="font-semibold text-foreground">{t('mbeJustification')}</h4>
                                        <ReactMarkdown>{approach.mbeJustification}</ReactMarkdown>
                                    </div>
                                    <Alert variant="default" className="border-amber-200 bg-amber-50 text-amber-800">
                                        <Wand className="h-4 w-4 !text-amber-600" />
                                        <AlertTitle className="font-semibold text-amber-900">{t('adaptationSuggestion')}</AlertTitle>
                                        <AlertDescription>
                                            {approach.adaptationSuggestion}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ) : (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                    <p>{t('noMenu')}</p>
                </div>
            )}
        </div>
    );
};

export default ClassPlanningTab;
