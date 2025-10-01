
'use client';

import React, { useState } from 'react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Tags } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQualitiesSuggestions } from '../_hooks/useQualitiesSuggestions';
import QualitiesSuggestionDialog from '@/components/QualitiesSuggestionDialog';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

interface QualitiesSuggestionTabProps {
  selectedStudent: StudentDTO;
}

const QualitiesSuggestionTab: React.FC<QualitiesSuggestionTabProps> = ({ selectedStudent }) => {
  const tCoach = useScopedI18n('coach');
  const locale = useCurrentLocale();
  const {
    qualitiesSuggestionHistory,
    isLoadingQualitiesSuggestionHistory,
    generateQualitiesSuggestion,
    qualitiesSuggestions,
    isQualitiesDialogOpen,
    setIsQualitiesDialogOpen,
    qualitiesUpdateAction,
    setQualitiesUpdateAction,
    handleAcceptQualities,
    resetQualitiesDialog,
  } = useQualitiesSuggestions(selectedStudent, locale);

  const isGeneratingQualities = generateQualitiesSuggestion.isPending;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className='flex-1'>
              <CardTitle className="text-lg">{tCoach('qualitiesSuggestion.title')}</CardTitle>
              <CardDescription className="mt-1">{tCoach('qualitiesSuggestion.description')}</CardDescription>
            </div>
            <Button onClick={() => generateQualitiesSuggestion.mutate(selectedStudent)} disabled={isGeneratingQualities} className="ml-4">
              {isGeneratingQualities ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {tCoach('qualitiesSuggestion.button')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingQualitiesSuggestionHistory ? <Skeleton className="h-20 w-full" /> : qualitiesSuggestionHistory.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{tCoach('qualitiesSuggestion.suggestionText')}</p>
              <div className="flex flex-wrap gap-2">
                {qualitiesSuggestionHistory.flatMap(s => s.suggestions).map((suggestion, index) => (
                  <span key={index} className="text-sm font-semibold p-2 bg-yellow-100 text-yellow-800 rounded-md">{suggestion}</span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
              <Tags className="mx-auto h-12 w-12 text-gray-400" />
              <h4 className="mt-4 text-lg font-semibold">{tCoach('qualitiesSuggestion.noSuggestions.title')}</h4>
              <p className="mt-2 text-sm">{tCoach('qualitiesSuggestion.noSuggestions.description')}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <QualitiesSuggestionDialog
        isOpen={isQualitiesDialogOpen}
        onClose={resetQualitiesDialog}
        studentName={selectedStudent?.name || ''}
        suggestions={qualitiesSuggestions}
        updateAction={qualitiesUpdateAction}
        onUpdateActionChange={(action) => setQualitiesUpdateAction(action as 'add' | 'replace')}
        onConfirm={handleAcceptQualities}
        isSaving={false}
      />
    </>
  );
};

export default QualitiesSuggestionTab;
