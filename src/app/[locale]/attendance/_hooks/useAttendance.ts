
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, getMonth, getYear } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/locales/client';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { AttendanceDTO, AttendanceStatus } from '@/modules/attendance/application/dtos/attendance.dto';
import { SetAttendanceDTO } from '@/modules/attendance/application/dtos/set-attendance.dto';

export type AttendanceByDate = {
  [date: string]: {
    present: number;
  };
};

export function useAttendance(students: StudentDTO[], locale: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const tToast = useScopedI18n('toasts');

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [localAttendance, setLocalAttendance] = useState<Record<string, AttendanceStatus>>({});

  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

  const { data: dailyAttendanceRecords = [], isLoading: isLoadingDailyAttendance } = useQuery<AttendanceDTO[]>({
    queryKey: ['attendance', formattedDate],
    queryFn: () =>
      fetch(`/api/attendance?date=${formattedDate}`).then(res => res.json()),
    enabled: !!selectedDate,
  });

  useEffect(() => {
    if (isLoadingDailyAttendance || students.length === 0) return;

    const newLocalAttendance: Record<string, AttendanceStatus> = {};
    students.forEach(student => {
      const record = Array.isArray(dailyAttendanceRecords) ? dailyAttendanceRecords.find(r => r.studentId === student.id) : undefined;
      newLocalAttendance[student.id] = record ? record.status : 'present';
    });
    
    // Prevent infinite loop by comparing the new state with the current one.
    if (JSON.stringify(newLocalAttendance) !== JSON.stringify(localAttendance)) {
        setLocalAttendance(newLocalAttendance);
    }
}, [dailyAttendanceRecords, students, isLoadingDailyAttendance, localAttendance]);


  const { data: monthlyAttendance = [] } = useQuery<AttendanceDTO[]>({
    queryKey: ['monthlyAttendance', getMonth(currentMonth), getYear(currentMonth)],
    queryFn: () =>
      fetch(
        `/api/attendance?month=${getMonth(currentMonth)}&year=${getYear(
          currentMonth
        )}`
      ).then(res => res.json()),
  });

  const attendanceByDate = useMemo<AttendanceByDate>(() => {
    const data: AttendanceByDate = {};
    if (Array.isArray(monthlyAttendance)) {
        monthlyAttendance.forEach(record => {
            const dateKey = record.date;
            if (!data[dateKey]) {
                data[dateKey] = { present: 0 };
            }
            if (record.status === 'present') {
                data[dateKey].present++;
            }
        });
    }
    return data;
  }, [monthlyAttendance]);

  const setBulkAttendanceMutation = useMutation({
    mutationFn: (data: SetAttendanceDTO[]) =>
      fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', formattedDate] });
      queryClient.invalidateQueries({
        queryKey: ['monthlyAttendance', getMonth(currentMonth), getYear(currentMonth)],
      });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({ title: tToast('attendanceSaved') });
    },
    onError: () => {
      toast({ title: tToast('attendanceFailed'), variant: 'destructive' });
    },
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setLocalAttendance(prev => ({...prev, [studentId]: status}));
  };

  const handleSaveAll = () => {
    if (!selectedDate) return;
    const attendanceData: SetAttendanceDTO[] = students.map(student => ({
        studentId: student.id,
        date: formattedDate,
        status: localAttendance[student.id] || 'present'
    }));
    setBulkAttendanceMutation.mutate(attendanceData);
  }
  
  return {
      selectedDate,
      setSelectedDate,
      currentMonth,
      setCurrentMonth,
      isLoadingDailyAttendance,
      handleStatusChange,
      localAttendance,
      attendanceByDate,
      handleSaveAll,
      isSaving: setBulkAttendanceMutation.isPending,
  }
}
