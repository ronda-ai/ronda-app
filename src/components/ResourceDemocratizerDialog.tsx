'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Loader2, Wand } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PersonalizedActivityDTO } from '@/modules/personalized-activity/application/dtos/personalized-activity.dto';
import { ManualGroupActivityDTO } from '@/modules/manual-group-activity/application/dtos/manual-group-activity.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { CurriculumActivityDTO } from '@/modules/curriculum-activity/application/dtos/curriculum-activity.dto';

interface ResourceDemocratizerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activityPlan?: PersonalizedActivityDTO | null;
  groupActivity?: ManualGroupActivityDTO | null;
  curriculumActivity?: CurriculumActivityDTO | null;
}

type AdaptationType = 'common-materials' | 'low-energy' | 'social-interaction' | 'simple-instructions';

const ResourceDemocratizerDialog: React.FC<ResourceDemocratizerDialogProps> = ({
  isOpen,
  onClose,
  activityPlan,
  groupActivity,
  curriculumActivity,
}) => {
  const t = useScopedI18n('individualActivities.democratizer');
  const tCommon = useScopedI18n('common');
  const tToasts = useScopedI18n('toasts');
  const locale = useCurrentLocale();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [adaptationType, setAdaptationType] = useState<AdaptationType | ''>('');
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  const currentPlan = activityPlan || groupActivity || curriculumActivity;
  const isGroupActivity = !!groupActivity;
  const isCurriculumActivity = !!curriculumActivity;
  
  const activities = React.useMemo(() => {
    if (!currentPlan) return [];
    // The 'activity' property on groupActivity is now 'activities' array
    if ('activities' in currentPlan && currentPlan.activities) {
      return currentPlan.activities;
    }
    return [];
  }, [currentPlan]);

  useEffect(() => {
    if (isOpen && currentPlan) {
      let allActivities: any[] = [];
      if ('activities' in currentPlan && currentPlan.activities) {
        allActivities = currentPlan.activities;
      }
      setSelectedIndices(new Set(allActivities.map((_, index) => index)));
    } else {
       setSelectedIndices(new Set());
       setAdaptationType('');
    }
  }, [isOpen, currentPlan]);

  const adaptActivityMutation = useMutation({
    mutationFn: (adaptation: AdaptationType) => {
        if (!currentPlan) return Promise.reject('No activity selected');
        
        let endpoint = '/api/personalized-activities/adapt';
        let body: any = {
            adaptationType: adaptation,
            language: locale,
        };

        if (isGroupActivity) {
            endpoint = '/api/manual-group-activities/adapt';
            body.groupId = currentPlan.id;
            body.selectedIndices = Array.from(selectedIndices);
        } else if (isCurriculumActivity) {
            endpoint = '/api/curriculum-activities/adapt';
            body.planId = currentPlan.id;
            body.selectedIndices = Array.from(selectedIndices);
        } else { // isPersonalizedActivity
            endpoint = '/api/personalized-activities/adapt';
            body.planId = currentPlan.id;
            body.selectedIndices = Array.from(selectedIndices);
        }
        
        return fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        })
    },
    onSuccess: () => {
        if (isGroupActivity) {
            queryClient.invalidateQueries({ queryKey: ['manualGroupActivities'] });
        } else if (isCurriculumActivity) {
            queryClient.invalidateQueries({ queryKey: ['curriculumActivities'] });
        } else {
            queryClient.invalidateQueries({ queryKey: ['personalizedActivities', activityPlan?.studentId] });
        }
        toast({ title: t('toastSuccess') });
        onClose();
    },
    onError: () => {
        toast({ title: tToasts('aiSuggestionFailed'), variant: 'destructive' });
    }
  });


  if (!currentPlan) return null;

  const adaptationOptions: { value: AdaptationType; label: string }[] = [
    { value: 'common-materials', label: t('options.commonMaterials') },
    { value: 'low-energy', label: t('options.lowEnergy') },
    { value: 'social-interaction', label: t('options.socialInteraction') },
    { value: 'simple-instructions', label: t('options.simpleInstructions') },
  ];
  
  const handleAdapt = () => {
    if (adaptationType) {
        adaptActivityMutation.mutate(adaptationType);
    }
  };

  const handleToggleActivity = (index: number) => {
    setSelectedIndices(prev => {
        const newSelection = new Set(prev);
        if (newSelection.has(index)) {
            newSelection.delete(index);
        } else {
            newSelection.add(index);
        }
        return newSelection;
    })
  }

  const description = isGroupActivity ? (selectedIndices.size === activities.length ? t('descriptionAll') : t('descriptionSelected', {count: selectedIndices.size})) : 
    (selectedIndices.size === activities.length ? t('descriptionAll') : t('descriptionSelected', {count: selectedIndices.size}));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
            <div>
                <Label>{t('activitiesToAdapt')}</Label>
                <ScrollArea className="h-40 mt-2 border rounded-md p-2">
                    <div className="space-y-2">
                        {activities.map((activity: any, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`activity-adapt-${index}`}
                                    checked={selectedIndices.has(index)}
                                    onCheckedChange={() => handleToggleActivity(index)}
                                />
                                <Label htmlFor={`activity-adapt-${index}`} className="font-normal text-sm cursor-pointer">{activity.title}</Label>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
          <Separator />
          <div>
            <Label>{t('prompt')}</Label>
            <Select value={adaptationType} onValueChange={(v) => setAdaptationType(v as AdaptationType)}>
                <SelectTrigger className='mt-2'>
                <SelectValue placeholder={t('selectPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                {adaptationOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>{tCommon('back')}</Button>
          <Button onClick={handleAdapt} disabled={!adaptationType || adaptActivityMutation.isPending || selectedIndices.size === 0}>
            {adaptActivityMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand className="mr-2 h-4 w-4" />}
            {t('adaptButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDemocratizerDialog;
