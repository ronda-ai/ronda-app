
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import { BrainCircuit, Loader2, Lightbulb, Check, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { TestAnalysisDTO } from '@/modules/test-analysis/application/dtos/test-analysis.dto';

interface TestAnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: TestAnalysisDTO | null;
  isLoading: boolean;
  studentName: string;
}

const TestAnalysisDialog: React.FC<TestAnalysisDialogProps> = ({
  isOpen,
  onClose,
  analysis,
  isLoading,
  studentName,
}) => {
  const t = useScopedI18n('tests.results.analysisDialog');
  const tCommon = useScopedI18n('common');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BrainCircuit className="text-primary" />
            {t('title', { name: studentName })}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {isLoading || !analysis ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-center italic text-muted-foreground">
                "{analysis.performanceSummary}"
              </p>
              <div>
                <h4 className="font-semibold text-green-600 flex items-center gap-2 mb-2">
                    <Check className="h-5 w-5"/>
                    {t('strengths')}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                 <h4 className="font-semibold text-amber-600 flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5"/>
                    {t('opportunities')}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {analysis.opportunities.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>
               <div>
                 <h4 className="font-semibold text-blue-600 flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5"/>
                    {t('suggestion')}
                </h4>
                <p className="text-sm p-3 bg-blue-50 border border-blue-200 rounded-md">
                    {analysis.suggestion}
                </p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tCommon('close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestAnalysisDialog;
