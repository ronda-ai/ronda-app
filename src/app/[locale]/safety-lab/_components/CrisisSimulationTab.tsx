
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Bot, User, ChevronsRight, ShieldQuestion, Check, AlertTriangle, X, RotateCcw } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { useEducationalSafety } from '../_hooks/useEducationalSafety';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CrisisSimulationTabProps {
    hooks: ReturnType<typeof useEducationalSafety>;
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

const CrisisSimulationTab: React.FC<CrisisSimulationTabProps> = ({ hooks }) => {
  const t = useScopedI18n('safetyLab.conflictSimulation');
  const {
      crisisType, setCrisisType,
      simulationLength, setSimulationLength,
      selectedBrigadeForSim, setSelectedBrigadeForSim,
      simulationHistory,
      simulationResult,
      generateCrisisScenarioMutation,
      handleStartSimulation,
      handleSimulationChoice,
      handleResetSimulation,
      currentScore,
      committees,
      simulationError,
      handleRetryLastStep,
  } = hooks;

  const isGenerating = generateCrisisScenarioMutation.isPending;

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
            <form onSubmit={handleStartSimulation} className="space-y-4">
               <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="crisis-type">{t('topicsLabel')}</Label>
                    <Input
                      id="crisis-type"
                      value={crisisType}
                      onChange={(e) => setCrisisType(e.target.value)}
                      placeholder={t('topicsPlaceholder')}
                      required
                      disabled={isGenerating || simulationHistory.length > 0}
                    />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="sim-length">{t('durations.title')}</Label>
                    <Select value={simulationLength} onValueChange={(v) => setSimulationLength(v as any)} disabled={isGenerating || simulationHistory.length > 0}>
                      <SelectTrigger id="sim-length">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">{t('durations.short')}</SelectItem>
                        <SelectItem value="medium">{t('durations.medium')}</SelectItem>
                        <SelectItem value="complex">{t('durations.complex')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="sim-brigade">{t('brigadeLabel')}</Label>
                 <Select value={selectedBrigadeForSim || 'none'} onValueChange={(v) => setSelectedBrigadeForSim(v === 'none' ? null : v)} disabled={isGenerating || simulationHistory.length > 0}>
                    <SelectTrigger id="sim-brigade">
                        <SelectValue placeholder={t('brigadePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">{t('noBrigade')}</SelectItem>
                        {committees.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                 </Select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isGenerating || !crisisType.trim() || simulationHistory.length > 0}>
                  {isGenerating && simulationHistory.length === 0 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  {t('button')}
                </Button>
                {simulationHistory.length > 0 && (
                  <Button variant="outline" onClick={handleResetSimulation}><RotateCcw className="mr-2 h-4 w-4"/>{t('resetButton')}</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      
        <Card className="h-full">
          <CardHeader>
             <div className="flex justify-between items-center">
                <CardTitle>{t('scenarioTitle')}</CardTitle>
                {simulationHistory.length > 0 && (
                    <div className="text-lg font-bold">
                        Score: <span className="text-primary">{currentScore}</span>
                    </div>
                )}
            </div>
          </CardHeader>
          <CardContent>
            {simulationHistory.length > 0 || isGenerating ? (
              <ScrollArea className="h-96 pr-4">
                <div className="space-y-4">
                  {simulationHistory.map((item, index) => {
                    const EvaluationIcon = item.evaluation ? evaluationIcons[item.evaluation.isCorrect] : null;
                    const evaluationColor = item.evaluation ? evaluationColors[item.evaluation.isCorrect] : '';
                    const isUserMessage = item.role === 'user';
                    
                    return (
                        <div key={index} className={cn("flex gap-3", isUserMessage ? 'justify-end' : 'justify-start')}>
                          {!isUserMessage && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                          <div className={cn("max-w-[80%] rounded-lg p-3", isUserMessage ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                             {item.evaluation && EvaluationIcon && (
                                <div className={cn("mb-2 p-2 border-l-4", evaluationColor)}>
                                    <h4 className="font-semibold flex items-center gap-1.5"><EvaluationIcon className="h-4 w-4" /> Feedback ({item.evaluation.scoreChange > 0 ? `+${item.evaluation.scoreChange}` : item.evaluation.scoreChange} pts)</h4>
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
                  
                  {simulationResult && !simulationError && !simulationResult.isFinalStep && (
                      <div className="space-y-2 pt-4">
                          {simulationResult.choices.map((choice, index) => (
                              <Button
                                  key={index}
                                  variant="outline"
                                  className="w-full justify-start text-left h-auto"
                                  onClick={() => handleSimulationChoice(choice.text)}
                                  disabled={isGenerating}
                              >
                                <ChevronsRight className="mr-2 h-4 w-4 flex-shrink-0"/>
                                {choice.text}
                              </Button>
                          ))}
                      </div>
                  )}

                  {simulationError && (
                    <div className="flex justify-center py-4">
                        <div className="text-center text-destructive">
                            <p>{t('generationError')}</p>
                            <Button variant="outline" size="sm" onClick={handleRetryLastStep} className="mt-2">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                {t('retryButton')}
                            </Button>
                        </div>
                    </div>
                  )}
                  
                  {simulationResult?.isFinalStep && (
                      <Alert className="mt-4 border-green-500 bg-green-50 text-green-800">
                          <AlertTitle className="font-bold flex items-center gap-2"><Check className="h-5 w-5"/>{t('simulationComplete')}</AlertTitle>
                          <AlertDescription>{simulationResult.finalSummary}</AlertDescription>
                      </Alert>
                  )}

                </div>
              </ScrollArea>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                    <ShieldQuestion className="mx-auto h-12 w-12 text-gray-400" />
                    <h4 className="mt-4 text-lg font-semibold">{t('noScenario.title')}</h4>
                    <p className="mt-2 text-sm">{t('noScenario.description')}</p>
                </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
};

export default CrisisSimulationTab;
