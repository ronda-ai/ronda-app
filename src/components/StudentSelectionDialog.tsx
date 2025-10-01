
'use client';

import React, { useState, useEffect } from 'react';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Button } from '@/components/ui/button';
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
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Label } from './ui/label';

interface StudentSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentDTO[];
  onSelect: (selectedIds: string[]) => void;
  selectionLimit: number;
}

const StudentSelectionDialog: React.FC<StudentSelectionDialogProps> = ({
  isOpen,
  onClose,
  students,
  onSelect,
  selectionLimit,
}) => {
  const t = useScopedI18n('dialog');
  const tRelations = useScopedI18n('relations');
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Reset selection when dialog is opened
    if (isOpen) {
      setSelectedStudents(new Set());
    }
  }, [isOpen]);

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(studentId)) {
        newSelection.delete(studentId);
      } else {
        if (selectionLimit === 1) {
          newSelection.clear();
          newSelection.add(studentId);
        } else if (newSelection.size < selectionLimit) {
          newSelection.add(studentId);
        }
      }
      return newSelection;
    });
  };

  const handleConfirm = () => {
    onSelect(Array.from(selectedStudents));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('studentSelectionTitle')}</DialogTitle>
          <DialogDescription>{t('studentSelectionDescription')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 my-4">
          <div className="space-y-2 pr-4">
            {students.map((student) => (
              <Label
                key={student.id}
                htmlFor={`student-${student.id}`}
                className="flex items-center gap-3 rounded-md border p-3 hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer"
              >
                <Checkbox
                  id={`student-${student.id}`}
                  checked={selectedStudents.has(student.id)}
                  onCheckedChange={() => handleSelectStudent(student.id)}
                />
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{student.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{student.name}</span>
              </Label>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">{tRelations('cancel')}</Button>
          </DialogClose>
          <Button type="button" onClick={handleConfirm} disabled={selectedStudents.size === 0}>
            {t('startChallenge')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentSelectionDialog;
