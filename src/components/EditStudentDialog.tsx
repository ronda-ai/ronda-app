
'use client';

import React, { useState, useEffect } from 'react';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
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
} from '@/components/ui/dialog';
import { useScopedI18n } from '@/locales/client';
import Select from 'react-select';
import { UpdateStudentDTO } from '@/modules/student/application/dtos/update-student.dto';
import { Gender } from '@/modules/student/domain/student.entity';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Checkbox } from './ui/checkbox';

interface EditStudentDialogProps {
  student: StudentDTO | null;
  students: StudentDTO[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: UpdateStudentDTO) => void;
}

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({
  student,
  students,
  isOpen,
  onClose,
  onSave,
}) => {
  const t = useScopedI18n('studentList');
  const tRelations = useScopedI18n('relations');
  const tGenders = useScopedI18n('genders');
  const tShare = useScopedI18n('shareProfile');
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [qualities, setQualities] = useState('');
  const [notes, setNotes] = useState('');
  const [fears, setFears] = useState('');
  const [disability, setDisability] = useState('');
  const [neurodiversity, setNeurodiversity] = useState('');
  const [goodRelations, setGoodRelations] = useState<string[]>([]);
  const [badRelations, setBadRelations] = useState<string[]>([]);
  const [gender, setGender] = useState<Gender>();
  const [publicId, setPublicId] = useState<string | null | undefined>(null);
  const [publicIdExpiresAt, setPublicIdExpiresAt] = useState<string | null | undefined>(null);
  const [isUniqueViewActive, setIsUniqueViewActive] = useState<boolean | undefined>(false);

  const [shareDuration, setShareDuration] = useState<'24h' | '7d' | 'never'>('24h');
  const [isViewOnce, setIsViewOnce] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (student) {
      setName(student.name);
      setAge(student.age?.toString() || '');
      setQualities(student.qualities.join(', '));
      setNotes(student.notes || '');
      setFears(student.fears?.join(', ') || '');
      setDisability(student.disability || '');
      setNeurodiversity(student.neurodiversity || '');
      setGoodRelations(student.goodRelations || []);
      setBadRelations(student.badRelations || []);
      setGender(student.gender);
      setPublicId(student.publicId);
      setPublicIdExpiresAt(student.publicIdExpiresAt ? new Date(student.publicIdExpiresAt).toISOString() : null);
      setIsUniqueViewActive(student.isUniqueViewActive);
      
      // Reset share options
      setIsViewOnce(student.isUniqueViewActive || false);
      setShareDuration('24h');

    }
  }, [student]);

  const handleSave = () => {
    if (student && name.trim()) {
      onSave(student.id, {
        name: name,
        age: age ? parseInt(age, 10) : undefined,
        qualities: qualities.split(',').map((q) => q.trim()).filter(Boolean),
        notes: notes,
        fears: fears.split(',').map((f) => f.trim()).filter(Boolean),
        disability: disability,
        neurodiversity: neurodiversity,
        goodRelations,
        badRelations,
        gender,
        publicId: publicId,
        publicIdExpiresAt: publicIdExpiresAt ? new Date(publicIdExpiresAt) : null,
        isUniqueViewActive,
      });
      onClose();
    }
  };
  
  const handleShareProfile = async () => {
    if (!student) return;
    setIsSharing(true);
    try {
        const duration = isViewOnce ? 'view-once' : shareDuration;
        const response = await fetch(`/api/students/${student.id}/share`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ duration }),
        });
        if (!response.ok) throw new Error('Failed to generate share link');
        const { publicId: newPublicId, publicIdExpiresAt: newExpiresAt, isUniqueViewActive: newIsUniqueViewActive } = await response.json();
        setPublicId(newPublicId);
        setPublicIdExpiresAt(newExpiresAt);
        setIsUniqueViewActive(newIsUniqueViewActive);

        const shareUrl = `${window.location.origin}/public/student/${newPublicId}`;
        await navigator.clipboard.writeText(shareUrl);
        toast({
            title: tShare('toastSuccessTitle'),
            description: tShare('toastSuccessDescription'),
        });
    } catch (error) {
        toast({
            title: tShare('toastErrorTitle'),
            description: tShare('toastErrorDescription'),
            variant: "destructive",
        });
    } finally {
        setIsSharing(false);
    }
  };


  const studentOptions = students
    .filter((s) => s.id !== student?.id)
    .map((s) => ({ value: s.id, label: s.name }));

  const genderOptions: Gender[] = ['female', 'male', 'non-binary', 'other', 'prefer-not-to-say'];
  const durationOptions = [
      { value: '24h', label: tShare('durations.24h') },
      { value: '7d', label: tShare('durations.7d') },
      { value: 'never', label: tShare('durations.never') },
  ]

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--background))',
      borderColor: 'hsl(var(--input))',
      color: 'hsl(var(--foreground))',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--card))',
      color: 'hsl(var(--card-foreground))',
      zIndex: 9999, // Ensure menu is on top of dialog
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--secondary))',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--secondary-foreground))',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'hsl(var(--primary))' : state.isFocused ? 'hsl(var(--accent))' : 'transparent',
        color: state.isSelected ? 'hsl(var(--primary-foreground))' : 'inherit',
        ':active': {
            backgroundColor: 'hsl(var(--accent))',
        },
    }),
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('editStudent')}: {student?.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">{t('agePlaceholder')}</Label>
            <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">{t('genderPlaceholder')}</Label>
             <ShadcnSelect value={gender} onValueChange={(value) => setGender(value as Gender)}>
                <SelectTrigger id="gender" className="col-span-3">
                    <SelectValue placeholder={t('genderPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                    {genderOptions.map((g) => (
                        <SelectItem key={g} value={g}>{tGenders(g as any)}</SelectItem>
                    ))}
                </SelectContent>
            </ShadcnSelect>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="qualities" className="text-right">{t('qualitiesPlaceholder')}</Label>
            <Input id="qualities" value={qualities} onChange={(e) => setQualities(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fears" className="text-right">{t('fearsPlaceholder')}</Label>
            <Input id="fears" value={fears} onChange={(e) => setFears(e.target.value)} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="disability" className="text-right">{t('disabilityPlaceholder')}</Label>
            <Input id="disability" value={disability} onChange={(e) => setDisability(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="neurodiversity" className="text-right">{t('neurodiversityPlaceholder')}</Label>
            <Input id="neurodiversity" value={neurodiversity} onChange={(e) => setNeurodiversity(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="notes" className="text-right pt-2">{t('notesPlaceholder')}</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">{tRelations('goodRelations')}</Label>
              <div className="col-span-3">
                <Select
                  isMulti
                  options={studentOptions.filter(o => !badRelations.includes(o.value))}
                  value={studentOptions.filter(o => goodRelations.includes(o.value))}
                  onChange={(selected) => setGoodRelations(selected.map(s => s.value))}
                  styles={customSelectStyles}
                  placeholder={tRelations('selectPlaceholder')}
                />
              </div>
           </div>
           <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">{tRelations('badRelations')}</Label>
                <div className="col-span-3">
                    <Select
                        isMulti
                        options={studentOptions.filter(o => !goodRelations.includes(o.value))}
                        value={studentOptions.filter(o => badRelations.includes(o.value))}
                        onChange={(selected) => setBadRelations(selected.map(s => s.value))}
                        styles={customSelectStyles}
                        placeholder={tRelations('selectPlaceholder')}
                    />
                </div>
           </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publicId" className="text-right">{tShare('shareLink')}</Label>
                <div className="col-span-3">
                    <Input id="publicId" value={publicId ? `${window.location.origin}/public/student/${publicId}` : ''} readOnly className="bg-muted" placeholder={tShare('generatePlaceholder')} />
                    <p className="text-xs text-muted-foreground mt-1">
                        {publicIdExpiresAt ? `${tShare('expires')}: ${format(new Date(publicIdExpiresAt), 'PPP p')}` : publicId ? (isUniqueViewActive ? tShare('viewOnce') : tShare('doesNotExpire')) : tShare('noLink')}
                    </p>
                </div>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="share-duration" className="text-right">{tShare('duration')}</Label>
                <div className="col-span-3 flex items-center gap-2">
                    <div className='flex items-center space-x-2'>
                         <Checkbox id="view-once" checked={isViewOnce} onCheckedChange={(checked) => setIsViewOnce(!!checked)} />
                         <Label htmlFor="view-once">{tShare('viewOnce')}</Label>
                    </div>
                     <ShadcnSelect value={shareDuration} onValueChange={(v) => setShareDuration(v as '24h' | '7d' | 'never')} disabled={isViewOnce}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {durationOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </ShadcnSelect>
                    <Button variant="outline" size="icon" onClick={handleShareProfile} disabled={isSharing}>
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">{tRelations('cancel')}</Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>{tRelations('save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;

