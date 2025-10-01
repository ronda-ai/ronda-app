
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useScopedI18n } from '@/locales/client';
import { CheckCircle } from 'lucide-react';

const TestSubmissionComplete = () => {
  const t = useScopedI18n('publicTestSession');

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle className="mt-4">{t('submitted.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{t('submitted.description')}</p>
      </CardContent>
    </Card>
  );
};

export default TestSubmissionComplete;
