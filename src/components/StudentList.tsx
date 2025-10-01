
'use client';

import React, { useState } from 'react';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Minus, Trash2, Star, User, Sparkles, Pencil, Info, ShieldAlert, Heart, HeartCrack, UserX, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Badge } from '@/components/ui/badge';
import EditStudentDialog from './EditStudentDialog';
import { UpdateStudentDTO } from '@/modules/student/application/dtos/update-student.dto';
import { cn } from '@/lib/utils';
import { Gender } from '@/modules/student/domain/student.entity';
import { Skeleton } from './ui/skeleton';
import { PersonStanding, BrainCircuit, Venus, Mars } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UseMutationResult } from '@tanstack/react-query';

interface StudentListProps {
  students: StudentDTO[];
  isLoading: boolean;
  onRemoveStudent: (id: string) => void;
  onUpdateParticipation: (args: {id: string; change: 1 | -1}) => void;
  onUpdateStudent: (id: string, data: UpdateStudentDTO) => void;
  updateStudentMutation: UseMutationResult<StudentDTO | null, Error, { id: string, data: UpdateStudentDTO }, unknown>;
  selectedStudentId?: string | null;
  onSelectStudent?: (id: string | null) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  isLoading,
  onRemoveStudent,
  onUpdateParticipation,
  onUpdateStudent,
  updateStudentMutation,
  selectedStudentId,
  onSelectStudent
}) => {
  const [editingStudent, setEditingStudent] = useState<StudentDTO | null>(null);
  const [updatingStudentId, setUpdatingStudentId] = useState<string | null>(null);
  
  const t = useScopedI18n('studentList');
  const tGenders = useScopedI18n('genders');
  
  const handleToggleAbsent = (student: StudentDTO) => {
    setUpdatingStudentId(student.id);
    onUpdateStudent(student.id, { isAbsent: !student.isAbsent });
  };
  
  React.useEffect(() => {
    if (!updateStudentMutation.isPending) {
        setUpdatingStudentId(null);
    }
  }, [updateStudentMutation.isPending]);
  
  const genderIcons: Record<Gender, React.ReactNode> = {
    female: <Venus className="h-4 w-4 text-pink-500" />,
    male: <Mars className="h-4 w-4 text-blue-500" />,
    'non-binary': <span className="font-bold text-purple-500 text-sm">NB</span>,
    other: <User className="h-4 w-4 text-gray-500" />,
    'prefer-not-to-say': <User className="h-4 w-4 text-gray-400" />,
  }
  
  const getParticipationText = (count: number) => {
    if (count === 0) return t('participations_zero');
    if (count === 1) return t('participations_one');
    return t('participations_other', { count });
  }

  const handleSaveStudent = (id: string, data: UpdateStudentDTO) => {
    setUpdatingStudentId(id);
    onUpdateStudent(id, data);
    setEditingStudent(null);
  };

  const renderStudentCard = (student: StudentDTO) => {
    const isUpdating = updateStudentMutation.isPending && updatingStudentId === student.id;
    return (
      <Card key={student.id} className={cn("flex flex-col p-3 shadow-sm gap-3 transition-colors", student.isAbsent ? 'opacity-50 bg-slate-50' : 'bg-card', onSelectStudent && 'hover:bg-accent', selectedStudentId === student.id && 'bg-secondary', isUpdating && 'opacity-60 pointer-events-none')}>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{student.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="font-medium">{student.name} {student.age && `(${student.age})`}</p>
          </div>
          {student.gender && (
            <Tooltip>
                <TooltipTrigger asChild>
                    <button type="button">{genderIcons[student.gender]}</button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tGenders(student.gender as any)}</p>
                </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground ml-1">
                <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                <span className="text-xs">
                  {getParticipationText(student.participation)}
                </span>
            </div>
            <div className="flex items-center gap-1">
              {isUpdating ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleToggleAbsent(student); }}>
                        <UserX className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{student.isAbsent ? t('markAsPresent') : t('markAsAbsent')}</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setEditingStudent(student);}}>
                        <Pencil className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{t('editStudent')}</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => { e.stopPropagation(); onUpdateParticipation({id: student.id, change: 1});}}
                        disabled={student.isAbsent}
                        >
                        <Plus className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t('addParticipation')}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => { e.stopPropagation(); onUpdateParticipation({id: student.id, change: -1});}}
                        disabled={student.participation === 0 || student.isAbsent}
                        >
                        <Minus className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t('removeParticipation')}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); onRemoveStudent(student.id);}}
                        >
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t('removeStudent')}</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </div>
        </div>

        {(student.qualities.length > 0) && (
          <div className="flex flex-wrap gap-1 items-center pl-1 pt-2 border-t">
            <Sparkles className="h-3 w-3 mr-1 text-primary"/>
            {student.qualities.map((quality, i) => (
              <Badge key={i} variant="secondary">{quality}</Badge>
            ))}
          </div>
        )}
        {(student.goodRelations && student.goodRelations.length > 0) && (
            <div className="flex flex-wrap gap-1 items-center pl-1 pt-2 border-t">
                <Heart className="h-3 w-3 mr-1 text-green-500"/>
                {student.goodRelations.map((id, i) => (
                    <Badge key={i} variant="secondary" className="bg-green-100 text-green-800">{students.find(s => s.id === id)?.name}</Badge>
                ))}
            </div>
        )}
        {(student.badRelations && student.badRelations.length > 0) && (
            <div className="flex flex-wrap gap-1 items-center pl-1 pt-2 border-t">
                <HeartCrack className="h-3 w-3 mr-1 text-red-500"/>
                {student.badRelations.map((id, i) => (
                    <Badge key={i} variant="destructive" className='opacity-75 bg-red-100 text-red-800 border-red-200'>{students.find(s => s.id === id)?.name}</Badge>
                ))}
            </div>
        )}
        {student.fears && student.fears.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center pl-1 pt-2 border-t">
                <ShieldAlert className="h-3 w-3 mr-1 text-destructive"/>
                {student.fears.map((fear, i) => (
                    <Badge key={i} variant="destructive" className='opacity-75'>{fear}</Badge>
                ))}
            </div>
        )}
        {student.disability && (
          <div className="flex flex-wrap gap-1 items-start text-muted-foreground pl-1 border-t pt-2">
            <PersonStanding className="h-3 w-3 mr-1 mt-1 text-blue-500"/>
            <p className="text-xs flex-1 text-blue-800">{student.disability}</p>
          </div>
        )}
        {student.neurodiversity && (
          <div className="flex flex-wrap gap-1 items-start text-muted-foreground pl-1 border-t pt-2">
            <BrainCircuit className="h-3 w-3 mr-1 mt-1 text-purple-500"/>
            <p className="text-xs flex-1 text-purple-800">{student.neurodiversity}</p>
          </div>
        )}
          {student.notes && (
          <div className="flex flex-wrap gap-1 items-start text-muted-foreground pl-1 border-t pt-2">
            <Info className="h-3 w-3 mr-1 mt-1"/>
            <p className="text-xs flex-1">{student.notes}</p>
          </div>
        )}
      </Card>
    );
  }

  return (
    <>
      <TooltipProvider>
        <div className="space-y-2">
        {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-3">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="flex-grow space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </Card>
            ))
        ) : students.length > 0 ? (
            students.map((student) => 
              onSelectStudent ? (
                <div key={student.id} className="rounded-md cursor-pointer" onClick={() => onSelectStudent(selectedStudentId === student.id ? null : student.id)}>
                    {renderStudentCard(student)}
                </div>
              ) : renderStudentCard(student)
            )
        ) : (
        <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground">
            <User className="w-10 h-10 mb-2"/>
            <p className="font-medium">{t('noStudents')}</p>
            <p className="text-sm">{t('noStudentsDescription')}</p>
        </div>
        )}
        </div>
      </TooltipProvider>
      <EditStudentDialog
        student={editingStudent}
        students={students}
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleSaveStudent}
      />
    </>
  );
};

export default StudentList;
