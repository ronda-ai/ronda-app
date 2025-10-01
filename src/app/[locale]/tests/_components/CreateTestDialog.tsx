

'use client';

import React, { useState } from 'react';
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
import { Loader2, Sparkles, Pencil } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TestBlockType } from '@/modules/test/application/dtos/test.dto';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';

interface CreateTestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTestCreated: (test: any) => void;
}

const CreateTestDialog: React.FC<CreateTestDialogProps> = ({ isOpen, onClose, onTestCreated }) => {
  const t = useScopedI18n('tests.creationDialog');
  const tCommon = useScopedI18n('common');
  const locale = useCurrentLocale();
  const { toast } = useToast();

  const [creationMode, setCreationMode] = useState<'manual' | 'ai' | null>(null);
  const [topic, setTopic] = useState('');
  const [testType, setTestType] = useState<TestBlockType>('multiple-choice');
  const [customPrompt, setCustomPrompt] = useState('');

  const generateTestMutation = useMutation({
    mutationFn: () =>
      fetch('/api/tests/generate-from-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, testType, customPrompt, language: locale }),
      }).then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      }),
    onSuccess: (data) => {
      onTestCreated(data);
      handleClose();
    },
    onError: () => {
      toast({ title: t('toastError'), variant: 'destructive' });
    }
  });

  const handleManualCreation = () => {
    const blankTest = {
      storyId: 'manual-' + nanoid(8), 
      storyTitle: 'Manual Creation',
      title: t('manualTitle'),
      blocks: [],
      rubric: {
        criteria: [],
        suggestedScoring: [],
      },
    };
    onTestCreated(blankTest);
    handleClose();
  };

  const handleAiCreation = () => {
    if (!topic) return;
    generateTestMutation.mutate();
  };

  const handleClose = () => {
    setCreationMode(null);
    setTopic('');
    setTestType('multiple-choice');
    setCustomPrompt('');
    onClose();
  };
  
  const tTestTypes = useScopedI18n('playground.collaborativeStory.test.types');

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        {!creationMode ? (
            <div className="grid grid-cols-2 gap-4 py-4">
                <Button variant="outline" className="h-24 flex-col gap-2" onClick={handleManualCreation}>
                    <Pencil className="h-6 w-6" />
                    {t('manualButton')}
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => setCreationMode('ai')}>
                    <Sparkles className="h-6 w-6" />
                    {t('aiButton')}
                </Button>
            </div>
        ) : (
            <div className="py-4 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="topic">{t('topicLabel')}</Label>
                    <Textarea
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder={t('topicPlaceholder')}
                    />
                </div>
                <div className="space-y-2">
                     <Label htmlFor="test-type">{tTestTypes('title')}</Label>
                     <Select value={testType} onValueChange={(v) => setTestType(v as any)}>
                        <SelectTrigger id="test-type">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="multiple-choice">{tTestTypes('multiple-choice')}</SelectItem>
                            <SelectItem value="true-false">{tTestTypes('true-false')}</SelectItem>
                            <SelectItem value="open-ended">{tTestTypes('open-ended')}</SelectItem>
                            <SelectItem value="mixed">{tTestTypes('mixed')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="custom-prompt">{t('customPromptLabel')}</Label>
                    <Textarea
                        id="custom-prompt"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder={t('customPromptPlaceholder')}
                    />
                </div>
            </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            {creationMode ? tCommon('back') : tCommon('close')}
          </Button>
          {creationMode === 'ai' && (
            <Button onClick={handleAiCreation} disabled={!topic || generateTestMutation.isPending}>
              {generateTestMutation.isPending ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
              {t('generateButton')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestDialog;
