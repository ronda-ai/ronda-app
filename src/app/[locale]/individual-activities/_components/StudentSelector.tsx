
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useScopedI18n } from '@/locales/client';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

interface StudentSelectorProps {
  students: StudentDTO[];
  isLoadingStudents: boolean;
  selectedStudentId: string | null;
  handleSelectStudent: (studentId: string) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
  students,
  isLoadingStudents,
  selectedStudentId,
  handleSelectStudent,
}) => {
  const tIndividualActivity = useScopedI18n('individualActivities');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tIndividualActivity('step0.title')}</CardTitle>
        <CardDescription>{tIndividualActivity('step0.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoadingStudents ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <div className="space-y-2">
            <Label htmlFor="student-select">{tIndividualActivity('step1.selectLabel')}</Label>
            <Select onValueChange={handleSelectStudent} value={selectedStudentId || ''}>
              <SelectTrigger id="student-select">
                <SelectValue placeholder={tIndividualActivity('step1.selectPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentSelector;
