

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Bot, User, ChevronsRight, ShieldQuestion, Check, AlertTriangle, X, RotateCcw } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTeacherLab, SimulationLength } from '../_hooks/useTeacherLab';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClassroomClimateTabProps {
    hooks: ReturnType<typeof useTeacherLab>;
}

const evaluationIcons = {
  good: Check,
  average: AlertTriangle,
  bad: X,
};

const evaluationColors = {
  good: 'border-green-500 bg-green-50 text-green-800',
  average: 'border-yellow-500 bg-yellow-50 text-yellow-800',
  bad: 'border-red-500 bg-red-50 text-red-800',
};


const ClassroomClimateTab: React.FC<ClassroomClimateTabProps> = ({ hooks }) => {
  const t = useScopedI18n('teacherLab.classroomClimate');
  const tSafetyLab = useScopedI18n('safetyLab.conflictSimulation');
  const {
      climateHistory,
      climateScenario,
      generateClimateScenarioMutation,
      handleStartClimateSimulation,
      handleClimateSimulationChoice,
      handleResetClimateSimulation,
      climateSimulationError,
      handleRetryClimateLastStep,
      scenarioDescription,
      setScenarioDescription,
      simulationLength,
      setSimulationLength,
  } = hooks;

  const isGenerating = generateClimateScenarioMutation.isPending;

  return (
    <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> {t('title')}
            </CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartClimateSimulation} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="scenario-description">{t('scenarioDescriptionLabel')}</Label>
                        <Textarea
                            id="scenario-description"
                            value={scenarioDescription}
                            onChange={(e) => setScenarioDescription(e.target.value)}
                            placeholder={t('scenarioDescriptionPlaceholder')}
                            rows={3}
                            disabled={isGenerating || climateHistory.length > 0}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="sim-length">{tSafetyLab('durations.title')}</Label>
                        <Select value={simulationLength} onValueChange={(v) => setSimulationLength(v as any)} disabled={isGenerating || climateHistory.length > 0}>
                        <SelectTrigger id="sim-length">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="short">{tSafetyLab('durations.short')}</SelectItem>
                            <SelectItem value="medium">{tSafetyLab('durations.medium')}</SelectItem>
                            <SelectItem value="complex">{tSafetyLab('durations.complex')}</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isGenerating || !scenarioDescription.trim() || climateHistory.length > 0}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t('button')}
                </Button>
                {climateHistory.length > 0 && (
                  <Button variant="outline" onClick={handleResetClimateSimulation}><RotateCcw className="mr-2 h-4 w-4"/>{t('resetButton')}</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      
        {(climateHistory.length > 0 || isGenerating) && (
            <Card className="h-full">
            <CardHeader>
                <CardTitle>{t('scenarioTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 pr-4">
                    <div className="space-y-4">
                    {climateHistory.map((item, index) => {
                        const EvaluationIcon = item.evaluation ? evaluationIcons[item.evaluation.isCorrect] : null;
                        const evaluationColor = item.evaluation ? evaluationColors[item.evaluation.isCorrect] : '';
                        const isUserMessage = item.role === 'user';
                        
                        return (
                            <div key={index} className={cn("flex gap-3", isUserMessage ? 'justify-end' : 'justify-start')}>
                            {!isUserMessage && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                            <div className={cn("max-w-[80%] rounded-lg p-3", isUserMessage ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                {item.evaluation && EvaluationIcon && (
                                    <div className={cn("mb-2 p-2 border-l-4 rounded-md", evaluationColor)}>
                                        <h4 className="font-semibold flex items-center gap-1.5"><EvaluationIcon className="h-4 w-4" /> Feedback ({item.evaluation.mbeCriterias.join(', ')})</h4>
                                        <p className="text-xs italic">{item.evaluation.feedback}</p>
                                    </div>
                                )}
                                <p className="text-sm">{item.text}</p>
                            </div>
                            {isUserMessage && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                            </div>
                        )
                    })}

                    {isGenerating && (
                        <div className="flex gap-3 justify-start">
                            <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                            <div className="bg-muted rounded-lg p-3 space-y-2 w-full max-w-[80%]">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    )}
                    
                    {climateScenario && !climateSimulationError && (
                        <div className="space-y-2 pt-4">
                            {climateScenario.choices.map((choice, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="w-full justify-start text-left h-auto"
                                    onClick={() => handleClimateSimulationChoice(choice.text)}
                                    disabled={isGenerating}
                                >
                                    <ChevronsRight className="mr-2 h-4 w-4 flex-shrink-0"/>
                                    {choice.text}
                                </Button>
                            ))}
                        </div>
                    )}

                    {climateSimulationError && (
                        <div className="flex justify-center py-4">
                            <div className="text-center text-destructive">
                                <p>{t('generationError')}</p>
                                <Button variant="outline" size="sm" onClick={handleRetryClimateLastStep} className="mt-2">
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    {t('retryButton')}
                                </Button>
                            </div>
                        </div>
                    )}
                    </div>
                </ScrollArea>
            </CardContent>
            </Card>
        )}
    </div>
  );
};

export default ClassroomClimateTab;
