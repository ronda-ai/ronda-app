
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
import { useScopedI18n } from '@/locales/client';
import { Loader2, Save, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface EditFocusAreaDialogProps {
    isOpen: boolean;
    onClose: () => void;
    focusArea: string | null;
    onUpdate: (oldName: string, newName: string) => void;
    onDelete: (nameToDelete: string) => void;
}

const EditFocusAreaDialog: React.FC<EditFocusAreaDialogProps> = ({ 
    isOpen, 
    onClose, 
    focusArea,
    onUpdate,
    onDelete
}) => {
    const t = useScopedI18n('languageSupport.editFocusAreaDialog');
    const tCommon = useScopedI18n('common');

    const [areaName, setAreaName] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        if (focusArea) {
            setAreaName(focusArea);
        }
    }, [focusArea]);

    const handleSave = () => {
        if (focusArea && areaName.trim() && areaName.trim() !== focusArea) {
            onUpdate(focusArea, areaName.trim());
        }
        onClose();
    };

    const handleDeleteConfirm = () => {
        if(focusArea) {
            onDelete(focusArea);
        }
        setIsDeleteDialogOpen(false);
        onClose();
    };

    if (!focusArea) return null;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('title', { name: focusArea })}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="area-name">{t('areaNameLabel')}</Label>
                            <Input
                                id="area-name"
                                value={areaName}
                                onChange={e => setAreaName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="justify-between">
                        <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('deleteButton')}
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={onClose}>{tCommon('back')}</Button>
                            <Button onClick={handleSave} disabled={areaName.trim() === focusArea}>
                                <Save className="mr-2 h-4 w-4" />
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
                        <AlertDialogDescription>{t('deleteDialog.description', { name: focusArea })}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('deleteDialog.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
                           {t('deleteDialog.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default EditFocusAreaDialog;
