
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Trash2 } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { SkillDTO } from '@/modules/skill/application/dtos/skill.dto';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

interface EditSkillDialogProps {
    isOpen: boolean;
    onClose: () => void;
    skill: SkillDTO | null;
}

const EditSkillDialog: React.FC<EditSkillDialogProps> = ({ isOpen, onClose, skill }) => {
    const t = useScopedI18n('activityGenerator.editSkillDialog');
    const tCommon = useScopedI18n('common');
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const [skillName, setSkillName] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        if (skill) {
            setSkillName(skill.name);
        }
    }, [skill]);

    const updateSkillMutation = useMutation({
        mutationFn: (newName: string) => {
            if (!skill) throw new Error("No skill to update");
            return fetch(`/api/skills/${skill.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            toast({ title: t('toastUpdateSuccess') });
            onClose();
        },
        onError: () => {
            toast({ title: t('toastUpdateError'), variant: 'destructive' });
        }
    });

    const deleteSkillMutation = useMutation({
        mutationFn: () => {
            if (!skill) throw new Error("No skill to delete");
            return fetch(`/api/skills/${skill.id}`, { method: 'DELETE' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            toast({ title: t('toastDeleteSuccess') });
            setIsDeleteDialogOpen(false);
            onClose();
        },
        onError: () => {
            toast({ title: t('toastDeleteError'), variant: 'destructive' });
        }
    });

    const handleSave = () => {
        if (skillName.trim() && skillName.trim() !== skill?.name) {
            updateSkillMutation.mutate(skillName.trim());
        }
    };

    const handleDelete = () => {
        deleteSkillMutation.mutate();
    };

    if (!skill) return null;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('title', { name: skill.name })}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="skill-name">{t('skillNameLabel')}</Label>
                            <Input
                                id="skill-name"
                                value={skillName}
                                onChange={e => setSkillName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="justify-between">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(true)} disabled={deleteSkillMutation.isPending}>
                            {deleteSkillMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                            {t('deleteButton')}
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={onClose}>{tCommon('back')}</Button>
                            <Button onClick={handleSave} disabled={updateSkillMutation.isPending || skillName.trim() === skill.name}>
                                {updateSkillMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                {tCommon('save')}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('deleteDialog.description', { name: skill.name })}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('deleteDialog.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                           {t('deleteDialog.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default EditSkillDialog;
