'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

interface AnalyticsData {
  attendance: {date: string; present: number; absent: number}[];
  participation: {name: string; count: number}[];
}

export function useAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const { data: students = [] } = useQuery<StudentDTO[]>({
    queryKey: ['students'],
    queryFn: () => fetch('/api/students').then(res => res.json()),
  });

  const queryParams = new URLSearchParams();
  if (dateRange?.from)
    queryParams.append('startDate', format(dateRange.from, 'yyyy-MM-dd'));
  if (dateRange?.to)
    queryParams.append('endDate', format(dateRange.to, 'yyyy-MM-dd'));
  if (selectedStudentIds.length > 0) {
    queryParams.append('studentIds', selectedStudentIds.join(','));
  }

  const { data: analyticsData, isLoading: isLoadingAnalytics } =
    useQuery<AnalyticsData>({
      queryKey: ['analytics', dateRange, selectedStudentIds],
      queryFn: () =>
        fetch(`/api/analytics?${queryParams.toString()}`).then(res => res.json()),
      enabled: !!dateRange?.from && !!dateRange?.to,
    });
    
  const studentOptions = students.map(s => ({ value: s.id, label: s.name }));
  const selectedStudentOptions = studentOptions.filter(opt => selectedStudentIds.includes(opt.value));

  return {
    dateRange,
    setDateRange,
    selectedStudentIds,
    setSelectedStudentIds,
    students,
    analyticsData,
    isLoadingAnalytics,
    studentOptions,
    selectedStudentOptions
  };
}
