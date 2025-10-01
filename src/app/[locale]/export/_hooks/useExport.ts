
'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/locales/client';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

export type DataType = 'students' | 'attendance' | 'evaluations';
export type ExportFormat = 'csv' | 'json' | 'html' | 'xlsx' | 'docx';

export function useExport() {
  const tExport = useScopedI18n('export');
  const tToast = useScopedI18n('toasts');
  const { toast } = useToast();

  const [dataType, setDataType] = useState<DataType>('evaluations');
  const [formatType, setFormatType] = useState<ExportFormat>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const { data: students = [] } = useQuery<StudentDTO[]>({
    queryKey: ['students'],
    queryFn: () => fetch('/api/students').then(res => res.json()),
  });

  const studentOptions = students.map(s => ({ value: s.id, label: s.name }));

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('type', dataType);
      queryParams.append('format', formatType);

      if (dataType !== 'students' && dateRange?.from) {
        queryParams.append('startDate', format(dateRange.from, 'yyyy-MM-dd'));
      }
      if (dataType !== 'students' && dateRange?.to) {
        queryParams.append('endDate', format(dateRange.to, 'yyyy-MM-dd'));
      }
      if (selectedStudentIds.length > 0) {
        queryParams.append('studentIds', selectedStudentIds.join(','));
      }

      const response = await fetch(`/api/export?${queryParams.toString()}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred during export.' }));
        throw new Error(errorData.message || 'Failed to export data');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export_${dataType}_${new Date().toISOString().split('T')[0]}.${formatType}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast({ title: tExport('toastSuccess') });
    } catch (error: any) {
      console.error(error);
      toast({
        title: tExport('toastError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return {
    dataType,
    setDataType,
    formatType,
    setFormatType,
    isExporting,
    dateRange,
    setDateRange,
    selectedStudentIds,
    setSelectedStudentIds,
    studentOptions,
    handleExport,
  }
}
