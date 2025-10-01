

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { useScopedI18n } from '@/locales/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { SupportPlanDTO, SupportPlanStepDTO, SupportPlanStepStatus } from '@/modules/support-plan/application/dtos/support-plan.dto';
import { PersonalizedActivityDTO, PersonalizedActivityStepDTO, PersonalizedActivityStepStatus } from '@/modules/personalized-activity/application/dtos/personalized-activity.dto';
import { RelationshipRemediationDTO, RemediationStep, RemediationStepStatus } from '@/modules/relationship-remediation/application/dtos/relationship-remediation.dto';
import { IndividualRelationshipStrategyDTO, StrategyStepDTO, IndividualStrategyStepStatus } from '@/modules/individual-relationship-strategy/application/dtos/individual-relationship-strategy.dto';
import { FearManagementSuggestionDTO, FearManagementStepDTO, FearManagementStepStatus } from '@/modules/fear-management-suggestion/application/dtos/fear-management-suggestion.dto';


type EvaluationData = {
    plan?: SupportPlanDTO | PersonalizedActivityDTO | FearManagementSuggestionDTO;
    remediation?: RelationshipRemediationDTO;
    individualStrategy?: IndividualRelationshipStrategyDTO;
    step: SupportPlanStepDTO | PersonalizedActivityStepDTO | RemediationStep | StrategyStepDTO | FearManagementStepDTO;
    stepIndex: number;
} | null

type StepEvaluationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (status: SupportPlanStepStatus | PersonalizedActivityStepStatus | RemediationStepStatus, feedback?: string) => void;
  isSaving: boolean;
  evaluationData: EvaluationData;
  isPersonalizedActivity?: boolean;
  isIndividualMode?: boolean;
};

const StepEvaluationDialog: React.FC<StepEvaluationDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  isSaving,
  evaluationData,
  isPersonalizedActivity = false,
  isIndividualMode = false,
}) => {
  const tCoach = useScopedI18n('coach.supportPlan.stepDialog');
  const tCoachFearManagement = useScopedI18n('coach.fearManagement');
  const tActivity = useScopedI18n('individualActivities.history.stepDialog');
  const tRemediation = useScopedI18n('coach.relationshipLab.history.stepDialog');
  const tRelations = useScopedI18n('relations');
  
  const [status, setStatus] = useState<string>('pending');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (isOpen && evaluationData) {
      setStatus(evaluationData.step.status || 'pending');
      setFeedback(evaluationData.step.feedback || '');
    } else if (!isOpen) {
        setStatus('pending');
        setFeedback('');
    }
  }, [isOpen, evaluationData]);

  const handleSave = () => {
    onSave(status as any, feedback);
  };
  
  if (!evaluationData) return null;

  const { step } = evaluationData;

  let t: any;
  let statusOptions: { value: string; label: string; }[];
  let stepText: string;

  if (evaluationData.plan && 'targetedFear' in evaluationData.plan) { // This is FearManagementSuggestionDTO
      statusOptions = [
          { value: 'pending', label: tRemediation('statuses.pending') },
          { value: 'completed', label: tRemediation('statuses.completed') },
          { value: 'skipped', label: tRemediation('statuses.skipped') },
      ];
      stepText = (step as FearManagementStepDTO).text;
  } else if (isIndividualMode) {
      t = tRemediation;
      statusOptions = [
          { value: 'pending', label: t('statuses.pending') },
          { value: 'completed', label: t('statuses.completed') },
          { value: 'skipped', label: t('statuses.skipped') },
      ];
      stepText = (step as StrategyStepDTO).text;
  } else if (isPersonalizedActivity) {
      t = tActivity;
      statusOptions = [
          { value: 'pending', label: t('statuses.pending') },
          { value: 'in-progress', label: t('statuses.in-progress') },
          { value: 'completed', label: t('statuses.completed') },
          { value: 'skipped', label: t('statuses.skipped') },
      ];
      stepText = (step as PersonalizedActivityStepDTO).title;
  } else if (evaluationData.remediation) {
      t = tRemediation;
       statusOptions = [
          { value: 'pending', label: t('statuses.pending') },
          { value: 'completed', label: t('statuses.completed') },
          { value: 'skipped', label: t('statuses.skipped') },
      ];
      stepText = (step as RemediationStep).text;
  } else {
      t = tCoach;
      statusOptions = [
          { value: 'pending', label: t('statuses.pending') },
          { value: 'achieved', label: t('statuses.achieved') },
          { value: 'partially-achieved', label: t('statuses.partially-achieved') },
          { value: 'not-achieved', label: t('statuses.not-achieved') },
          { value: 'discarded', label: t('statuses.discarded') },
      ];
      stepText = (step as SupportPlanStepDTO).text;
  }
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>{stepText}</Label>
            { (step as PersonalizedActivityStepDTO).description && 
              <p className="text-sm text-muted-foreground">{(step as PersonalizedActivityStepDTO).description}</p>
            }
          </div>
          <div className="space-y-2">
              <Label htmlFor="status">{t('status')}</Label>
              <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger id="status">
                  <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                  {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                      {option.label}
                  </SelectItem>
                  ))}
              </SelectContent>
              </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">{t('feedback')}</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t('feedbackPlaceholder')}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={isSaving}>{tRelations('cancel')}</Button>
          </DialogClose>
          <Button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('saveButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StepEvaluationDialog;

    
