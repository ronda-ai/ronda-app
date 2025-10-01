
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
import { ChallengeHistoryDTO } from '@/modules/challenge/application/dtos/challenge-history.dto';

type EvaluationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rating: NonNullable<ChallengeHistoryDTO['rating']>, feedback: string, mood: string) => void;
  isSaving: boolean;
  evaluationData: {
    studentName: string;
    challenge: ChallengeHistoryDTO;
  } | null;
};

const EvaluationDialog: React.FC<EvaluationDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  isSaving,
  evaluationData,
}) => {
  const t = useScopedI18n('evaluations.evaluationDialog');
  const tRatings = useScopedI18n('evaluations.ratings');
  const tRelations = useScopedI18n('relations');
  const tMoods = useScopedI18n('evaluations.moods');
  
  const [rating, setRating] = useState<NonNullable<ChallengeHistoryDTO['rating']>>('met-expectations');
  const [feedback, setFeedback] = useState('');
  const [mood, setMood] = useState('focused');

  useEffect(() => {
    if (isOpen && evaluationData) {
      setRating(evaluationData.challenge.rating || 'met-expectations');
      setFeedback(evaluationData.challenge.feedback || '');
      setMood(evaluationData.challenge.mood || 'focused');
    } else if (!isOpen) {
        setRating('met-expectations');
        setFeedback('');
        setMood('focused');
    }
  }, [isOpen, evaluationData]);

  const handleSave = () => {
    onSave(rating, feedback, mood);
  };
  
  if (!evaluationData) return null;

  const { studentName, challenge } = evaluationData;

  const ratingOptions: { value: NonNullable<ChallengeHistoryDTO['rating']>, label: string }[] = [
    { value: 'needs-support', label: tRatings('needsSupport') },
    { value: 'met-expectations', label: tRatings('metExpectations') },
    { value: 'exceeded-expectations', label: tRatings('exceededExpectations') },
  ];

  const moodOptions: { value: string, label: string }[] = [
    { value: 'enthusiastic', label: tMoods('enthusiastic') },
    { value: 'focused', label: tMoods('focused') },
    { value: 'nervous', label: tMoods('nervous') },
    { value: 'frustrated', label: tMoods('frustrated') },
    { value: 'happy', label: tMoods('happy') },
    { value: 'tired', label: tMoods('tired') },
  ];


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('forStudent', { name: studentName })}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>{t('challenge')}</Label>
            <blockquote className="p-4 bg-gray-50 border-l-4 border-gray-300">
              <p className="font-semibold">"{challenge.challenge.challenge}"</p>
              <footer className="text-sm text-gray-500 mt-2">Tip: "{challenge.challenge.tip}"</footer>
            </blockquote>
          </div>
           <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="rating">{t('rating')}</Label>
                <Select value={rating} onValueChange={(value) => setRating(value as NonNullable<ChallengeHistoryDTO['rating']>)}>
                <SelectTrigger id="rating">
                    <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                    {ratingOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="mood">{t('mood')}</Label>
                <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="mood">
                    <SelectValue placeholder="Select a mood" />
                </SelectTrigger>
                <SelectContent>
                    {moodOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">{t('feedback')}</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t('feedbackPlaceholder')}
              rows={4}
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

export default EvaluationDialog;
