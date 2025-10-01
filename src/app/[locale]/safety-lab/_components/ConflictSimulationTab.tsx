
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEducationalSafety } from '../_hooks/useEducationalSafety';

interface ConflictSimulationTabProps {
    hooks: ReturnType<typeof useEducationalSafety>;
}

const ConflictSimulationTab: React.FC<ConflictSimulationTabProps> = ({ hooks }) => {
    const t = useScopedI18n('safetyLab.conflictSimulation');

    const {
        scenarioTopics, setScenarioTopics,
        generatedScenario,
        generateScenarioMutation,
        handleGenerateScenario,
    } = hooks;

    const isGenerating = generateScenarioMutation.isPending;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldAlert /> {t('title')}
                        </CardTitle>
                        <CardDescription>{t('description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateScenario} className="flex flex-col md:flex-row items-end gap-4">
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="conflict-topics">{t('topicsLabel')}</Label>
                                <Input 
                                    id="conflict-topics"
                                    value={scenarioTopics}
                                    onChange={e => setScenarioTopics(e.target.value)}
                                    placeholder={t('topicsPlaceholder')}
                                />
                            </div>
                            <Button type="submit" disabled={isGenerating}>
                                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                {t('button')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div>
                 <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{t('scenarioTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isGenerating ? (
                            <Skeleton className="h-64 w-full" />
                        ) : generatedScenario ? (
                            <div className="space-y-6">
                                <p className="italic text-muted-foreground">"{generatedScenario.scenario}"</p>
                                <div>
                                    <h4 className="font-semibold text-foreground">{t('strategiesTitle')}</h4>
                                    <div className="mt-2 space-y-3">
                                        {generatedScenario.strategies.map((strategy, index) => (
                                            <div key={index} className="p-3 border rounded-md bg-background">
                                                <p className="font-medium text-primary">{strategy.name}</p>
                                                <p className="text-sm mt-1">{strategy.description}</p>
                                                <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">
                                                    <strong>{t('outcomeLabel')}:</strong> {strategy.simulatedOutcome}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                                <ShieldAlert className="mx-auto h-12 w-12 text-gray-400" />
                                <h4 className="mt-4 text-lg font-semibold">{t('noScenario.title')}</h4>
                                <p className="mt-2 text-sm">{t('noScenario.description')}</p>
                            </div>
                        )}
                    </CardContent>
                 </Card>
            </div>
        </div>
    );
};

export default ConflictSimulationTab;
