
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { useScopedI18n } from '@/locales/client';
import { SessionData } from '../_hooks/usePublicTestSession';
import { Skeleton } from '@/components/ui/skeleton';

interface TestSelectorProps {
  sessionData: SessionData | null | undefined;
  isLoading: boolean;
  onSelectStudent: (studentId: string) => void;
}

const TestSelector: React.FC<TestSelectorProps> = ({ sessionData, isLoading, onSelectStudent }) => {
  const t = useScopedI18n('publicTestSession');

  if (isLoading || !sessionData) {
      return (
          <Card className="w-full max-w-md">
            <CardHeader><CardTitle>{t('welcome')}</CardTitle></CardHeader>
            <CardContent><Skeleton className="h-20 w-full" /></CardContent>
          </Card>
      )
  }

  const hasAvailable = sessionData.availableStudents && sessionData.availableStudents.length > 0;
  const hasRejoinable = sessionData.rejoinableStudents && sessionData.rejoinableStudents.length > 0;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t('welcome')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{t('selectYourName')}</p>
        <Select onValueChange={(studentId) => onSelectStudent(studentId)}>
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue placeholder={t('selectYourName')} />
          </SelectTrigger>
          <SelectContent>
            {hasAvailable && (
              <SelectGroup>
                <SelectLabel>{t('joinForFirstTime')}</SelectLabel>
                {sessionData.availableStudents.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectGroup>
            )}
            {hasRejoinable && (
              <SelectGroup>
                <SelectLabel>{t('rejoinSession')}</SelectLabel>
                {sessionData.rejoinableStudents.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
        {!hasAvailable && !hasRejoinable && (
          <p className="text-sm text-red-500">{t('noStudentsAvailable')}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TestSelector;
