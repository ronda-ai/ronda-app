
'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

export function useStudentSelector() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const { data: students = [], isLoading: isLoadingStudents } = useQuery<StudentDTO[]>({
    queryKey: ['students'],
    queryFn: () => fetch('/api/students').then(res => res.json()),
  });

  const selectedStudent = useMemo(() => {
    return students.find(s => s.id === selectedStudentId) || null;
  }, [students, selectedStudentId]);

  return {
    students,
    isLoadingStudents,
    selectedStudentId,
    setSelectedStudentId,
    selectedStudent,
  };
}
