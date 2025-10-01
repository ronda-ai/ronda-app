
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { useScopedI18n } from '@/locales/client';
import { Loader2, Settings2, Circle, CheckCircle, XCircle } from 'lucide-react';
import { IndividualRelationshipStrategyDTO, IndividualStrategyStepStatus } from '@/modules/individual-relationship-strategy/application/dtos/individual-relationship-strategy.dto';
import { cn } from '@/lib/utils';

interface IndividualStrategyDetailsDialogProps {
    selectedStrategy: IndividualRelationshipStrategyDTO | null;
    setSelectedStrategy: (strategy: IndividualRelationshipStrategyDTO | null) => void;
    adjustPrompt: string;
    setAdjustPrompt: (prompt: string) => void;
    isAdjusting: boolean;
    handleAdjustStrategy: () => void;
    setEvaluatingStep: (step: any) => void;
}

const stepStatusIcons: Record<IndividualStrategyStepStatus, React.ElementType> = {
  pending: Circle,
  completed: CheckCircle,
  skipped: XCircle,
};

const stepStatusColors: Record<IndividualStrategyStepStatus, string> = {
  pending: 'text-gray-500',
  completed: 'text-green-500',
  skipped: 'text-red-500',
};

const IndividualStrategyDetailsDialog: React.FC<IndividualStrategyDetailsDialogProps> = ({
    selectedStrategy,
    setSelectedStrategy,
    adjustPrompt,
    setAdjustPrompt,
    isAdjusting,
    handleAdjustStrategy,
    setEvaluatingStep,
}) => {
    const t = useScopedI18n('coach.relationshipLab');
    
    if (!selectedStrategy) {
        return null;
    }

    return (
        <Dialog open={!!selectedStrategy} onOpenChange={() => setSelectedStrategy(null)}>
            <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>{selectedStrategy.title}</DialogTitle>
                     <div className="prose prose-sm max-w-none text-muted-foreground pt-2">
                        <ReactMarkdown>{selectedStrategy.rationale}</ReactMarkdown>
                    </div>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto -mx-6 px-6 py-4 border-y">
                     <div className="space-y-4">
                        <div className="space-y-3">
                            {selectedStrategy.steps.map((step, index) => {
                                const StepIcon = stepStatusIcons[step.status] || Circle;
                                return (
                                    <div key={index}>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="w-full justify-start text-left h-auto p-2"
                                        onClick={() => setEvaluatingStep({ individualStrategy: selectedStrategy, step, stepIndex: index })}
                                    >
                                        <StepIcon
                                        className={cn(
                                            'h-5 w-5 mr-3 flex-shrink-0',
                                            stepStatusColors[step.status]
                                        )}
                                        />
                                        <span className="flex-grow whitespace-normal">
                                        <ReactMarkdown className="prose prose-sm max-w-none">{step.text}</ReactMarkdown>
                                        </span>
                                    </Button>
                                    {step.feedback && (
                                        <p className="text-xs text-muted-foreground italic pl-10 pt-1">
                                        {`"${step.feedback}"`}
                                        </p>
                                    )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                 <div className="space-y-4 flex-shrink-0 pt-4">
                    <h4 className="font-semibold text-sm">{t('details.adjustTitle')}</h4>
                    <Textarea 
                        value={adjustPrompt}
                        onChange={e => setAdjustPrompt(e.target.value)}
                        placeholder={t('details.adjustPlaceholder')}
                        rows={2}
                    />
                    <Button onClick={handleAdjustStrategy} disabled={isAdjusting}>
                        {isAdjusting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Settings2 className="mr-2 h-4 w-4" />}
                        {t('details.adjustButton')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default IndividualStrategyDetailsDialog;
