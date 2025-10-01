
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Sparkles, X } from 'lucide-react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';

interface ChallengeConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChallengeConfigDialog: React.FC<ChallengeConfigDialogProps> = ({ isOpen, onClose }) => {
  const tAIConfig = useScopedI18n('home.aiConfig');
  const tSubjects = useScopedI18n('subjects');
  const tToast = useScopedI18n('toasts');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [config, setConfig] = useState<Partial<AIConfigurationDTO>>({});
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState<null | 'positive' | 'negative'>(null);

  const { data: savedConfig, isLoading: isLoadingConfig } = useQuery<AIConfigurationDTO>({
    queryKey: ['aiConfiguration'],
    queryFn: () => fetch('/api/ai/configuration').then(res => res.ok ? res.json() : null),
  });

  useEffect(() => {
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, [savedConfig]);

  const saveConfigMutation = useMutation({
    mutationFn: (newConfig: Partial<AIConfigurationDTO>) =>
      fetch('/api/ai/configuration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiConfiguration'] });
      toast({ title: tAIConfig('toastSaved') });
      onClose();
    },
    onError: () => {
      toast({ title: tAIConfig('toastError'), variant: 'destructive' });
    }
  });

  const handleConfigChange = (field: keyof AIConfigurationDTO, value: string | string[]) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateSuggestion = async (promptType: 'positive' | 'negative') => {
    setIsGeneratingSuggestion(promptType);
    try {
      const res = await fetch('/api/suggestions/prompt', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          subject: config.subject,
          ageOrGrade: config.ageOrGrade,
          country: config.country,
          promptType,
          language: locale,
        }),
      });
      if (!res.ok) throw new Error('API error');
      const result = await res.json();
      const fieldToUpdate = promptType === 'positive' ? 'customPrompt' : 'negativePrompt';
      handleConfigChange(fieldToUpdate, result.suggestion);

    } catch (error) {
      console.error('Failed to generate prompt suggestion:', error);
      toast({
        title: tToast('aiSuggestionFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingSuggestion(null);
    }
  };

  const subjects = [
    'general', 'science', 'history', 'math', 'english', 'art', 'music', 'pe',
    'programming', 'theater', 'dance', 'financial-literacy', 'digital-citizenship',
    'environmental-science',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{tAIConfig('title')}</DialogTitle>
          <DialogDescription>{tAIConfig('challengeConfigDescription')}</DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto mx-1">
          <div className="mx-1 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">{tAIConfig('subject')}</Label>
              <Select value={config.subject || 'general'} onValueChange={(v) => handleConfigChange('subject', v)}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder={tAIConfig('subjectPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subj => (
                    <SelectItem key={subj} value={subj}>
                      {tSubjects(subj as any)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{tAIConfig('spotlight.title')}</Label>
              <RadioGroup
                value={config.challengeLocation || 'does-not-matter'}
                onValueChange={(v) => handleConfigChange('challengeLocation', v)}
                className="flex gap-4"
              >
                <Label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                  <RadioGroupItem value="at-desk" id="at-desk" />
                  {tAIConfig('spotlight.atDesk')}
                </Label>
                <Label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                  <RadioGroupItem value="in-front" id="in-front" />
                  {tAIConfig('spotlight.inFront')}
                </Label>
                <Label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                  <RadioGroupItem value="does-not-matter" id="does-not-matter" />
                  {tAIConfig('spotlight.doesNotMatter')}
                </Label>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customPrompt">{tAIConfig('customPrompt')}</Label>
              <div className="flex items-center gap-2">
                <Textarea
                  id="customPrompt"
                  value={config.customPrompt || ''}
                  onChange={e => handleConfigChange('customPrompt', e.target.value)}
                  placeholder={tAIConfig('customPromptPlaceholder')}
                  rows={3}
                />
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleGenerateSuggestion('positive')}
                  disabled={isGeneratingSuggestion !== null}
                >
                  <Sparkles className={`w-4 h-4 ${isGeneratingSuggestion === 'positive' ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="negativePrompt">{tAIConfig('negativePrompt')}</Label>
              <div className="flex items-center gap-2">
                <Textarea
                  id="negativePrompt"
                  value={config.negativePrompt || ''}
                  onChange={e => handleConfigChange('negativePrompt', e.target.value)}
                  placeholder={tAIConfig('negativePromptPlaceholder')}
                  rows={3}
                />
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleGenerateSuggestion('negative')}
                  disabled={isGeneratingSuggestion !== null}
                >
                  <Sparkles className={`w-4 h-4 ${isGeneratingSuggestion === 'negative' ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={saveConfigMutation.isPending}>
            <X className="mr-2" />
            Cancel
          </Button>
          <Button onClick={() => saveConfigMutation.mutate(config)} disabled={saveConfigMutation.isPending}>
            {saveConfigMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {tAIConfig('saveButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeConfigDialog;
