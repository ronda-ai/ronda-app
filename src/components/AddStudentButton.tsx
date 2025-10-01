
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Gender } from '@/modules/student/domain/student.entity';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreateStudentDTO } from '@/modules/student/application/dtos/create-student.dto';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Sparkles, UserPlus } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

interface AddStudentButtonProps {
  onAddStudent: (studentData: CreateStudentDTO) => Promise<void>;
}

const AddStudentButton: React.FC<AddStudentButtonProps> = ({ onAddStudent }) => {
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentQualities, setNewStudentQualities] = useState('');
  const [newStudentAge, setNewStudentAge] = useState('');
  const [newStudentNotes, setNewStudentNotes] = useState('');
  const [newStudentFears, setNewStudentFears] = useState('');
  const [newStudentDisability, setNewStudentDisability] = useState('');
  const [newStudentNeurodiversity, setNewStudentNeurodiversity] = useState('');
  const [newStudentGender, setNewStudentGender] = useState<Gender>();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState<null | 'qualities' | 'fears' | 'notes'>(null);

  const t = useScopedI18n('studentList');
  const tRelations = useScopedI18n('relations');
  const tGenders = useScopedI18n('genders');
  const tToast = useScopedI18n('toasts');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  
  const addStudentMutation = useMutation({
    mutationFn: onAddStudent,
    onSuccess: () => {
      resetAddForm();
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
        console.error("Failed to add student:", error);
    }
  });


  const resetAddForm = () => {
    setNewStudentName('');
    setNewStudentQualities('');
    setNewStudentAge('');
    setNewStudentNotes('');
    setNewStudentFears('');
    setNewStudentDisability('');
    setNewStudentNeurodiversity('');
    setNewStudentGender(undefined);
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    addStudentMutation.mutate({
        name: newStudentName,
        qualities: newStudentQualities.split(',').map((q) => q.trim()).filter(Boolean),
        age: newStudentAge ? parseInt(newStudentAge, 10) : undefined,
        notes: newStudentNotes,
        fears: newStudentFears.split(',').map((f) => f.trim()).filter(Boolean),
        disability: newStudentDisability,
        neurodiversity: newStudentNeurodiversity,
        gender: newStudentGender,
    });
  };

  const handleGenerateProfileSuggestion = async (fieldType: 'qualities' | 'fears' | 'notes') => {
    if (!newStudentName.trim() || !newStudentAge.trim() || !newStudentGender) {
      toast({
        title: tToast('profileSuggestionNeedsInfo'),
        variant: 'destructive',
      });
      return;
    }
    setIsGeneratingSuggestion(fieldType);
    try {
      const res = await fetch('/api/suggestions/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: newStudentName,
          studentAge: parseInt(newStudentAge, 10),
          studentGender: newStudentGender,
          language: locale,
          fieldType: fieldType,
        }),
      });
      if (!res.ok) throw new Error('API Error');

      const result = await res.json();

      if (result.suggestion) {
        switch (fieldType) {
          case 'qualities':
            setNewStudentQualities(result.suggestion);
            break;
          case 'fears':
            setNewStudentFears(result.suggestion);
            break;
          case 'notes':
            setNewStudentNotes(result.suggestion);
            break;
        }
      }
    } catch (error) {
      console.error('Failed to generate profile suggestion:', error);
      toast({
        title: tToast('aiSuggestionFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingSuggestion(null);
    }
  };

  const genderOptions: Gender[] = ['female', 'male', 'non-binary', 'other', 'prefer-not-to-say'];
  const suggestionDisabled = isGeneratingSuggestion !== null || !newStudentName.trim() || !newStudentAge.trim() || !newStudentGender;

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className='w-full'>
          <UserPlus className="mr-2 h-4 w-4" />
          {t('addStudentButton')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('addStudentButton')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="new-student-name">{t('addStudentPlaceholder')}</Label>
            <Input
              id="new-student-name"
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder={t('addStudentPlaceholder')}
              required
            />
          </div>
          <div className="flex gap-2">
            <div className='space-y-2 w-1/3'>
              <Label htmlFor="new-student-age">{t('agePlaceholder')}</Label>
              <Input
                id="new-student-age"
                type="number"
                value={newStudentAge}
                onChange={(e) => setNewStudentAge(e.target.value)}
                placeholder={t('agePlaceholder')}
              />
            </div>
            <div className='space-y-2 flex-grow'>
              <Label htmlFor="new-student-gender">{t('genderPlaceholder')}</Label>
              <Select value={newStudentGender} onValueChange={(value) => setNewStudentGender(value as Gender)}>
                <SelectTrigger id="new-student-gender">
                  <SelectValue placeholder={t('genderPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((gender) => (
                    <SelectItem key={gender} value={gender}>{tGenders(gender as any)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor="new-student-qualities">{t('qualitiesPlaceholder')}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="new-student-qualities"
                type="text"
                value={newStudentQualities}
                onChange={(e) => setNewStudentQualities(e.target.value)}
                placeholder={t('qualitiesPlaceholder')}
              />
              <Button variant="outline" size="icon" type="button" onClick={() => handleGenerateProfileSuggestion('qualities')} disabled={suggestionDisabled}>
                <Sparkles className={`h-4 w-4 ${isGeneratingSuggestion === 'qualities' ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor="new-student-fears">{t('fearsPlaceholder')}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="new-student-fears"
                type="text"
                value={newStudentFears}
                onChange={(e) => setNewStudentFears(e.target.value)}
                placeholder={t('fearsPlaceholder')}
              />
              <Button variant="outline" size="icon" type="button" onClick={() => handleGenerateProfileSuggestion('fears')} disabled={suggestionDisabled}>
                <Sparkles className={`h-4 w-4 ${isGeneratingSuggestion === 'fears' ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor="new-student-disability">{t('disabilityPlaceholder')}</Label>
            <Input
              id="new-student-disability"
              type="text"
              value={newStudentDisability}
              onChange={(e) => setNewStudentDisability(e.target.value)}
              placeholder={t('disabilityPlaceholder')}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="new-student-neurodiversity">{t('neurodiversityPlaceholder')}</Label>
            <Input
              id="new-student-neurodiversity"
              type="text"
              value={newStudentNeurodiversity}
              onChange={(e) => setNewStudentNeurodiversity(e.target.value)}
              placeholder={t('neurodiversityPlaceholder')}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="new-student-notes">{t('notesPlaceholder')}</Label>
            <div className="flex items-start gap-2">
              <Textarea
                id="new-student-notes"
                value={newStudentNotes}
                onChange={(e) => setNewStudentNotes(e.target.value)}
                placeholder={t('notesPlaceholder')}
                rows={3}
              />
              <Button variant="outline" size="icon" type="button" onClick={() => handleGenerateProfileSuggestion('notes')} disabled={suggestionDisabled}>
                <Sparkles className={`h-4 w-4 ${isGeneratingSuggestion === 'notes' ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={addStudentMutation.isPending}>{tRelations('cancel')}</Button>
            </DialogClose>
            <Button type="submit" disabled={!newStudentName.trim() || addStudentMutation.isPending}>
              {addStudentMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              {t('addStudentButton')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentButton;
