

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { BookCopy, FileText, Trash2, Loader2, PlusCircle, FileDown, FileCheck2, Eye, LineChart, Play, TowerControl } from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import withAuth from '@/components/withAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import DashboardLayout from '@/components/DashboardLayout';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { TestDTO } from '@/modules/test/application/dtos/test.dto';
import { useTests } from './_hooks/useTests';
import TestEditor from './_components/TestEditor';
import CreateTestDialog from './_components/CreateTestDialog';
import { encode } from 'html-entities';
import TestPreviewDialog from './_components/TestPreviewDialog';
import LiveSessionDialog from './_components/LiveSessionDialog';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function TestsPage() {
  const t = useScopedI18n('tests');
  const tCommon = useScopedI18n('common');
  const tTools = useScopedI18n('tools');
  const locale = useCurrentLocale();

  const {
    tests,
    isLoadingTests,
    students,
    testToDelete,
    setTestToDelete,
    deleteTestMutation,
    selectedTest,
    setSelectedTest,
    isCreateTestOpen,
    setIsCreateTestOpen,
    handleCreateNewTest,
    updateTestMutation,
    generateRubricMutation,
    startTestSessionMutation,
    stopTestSessionMutation,
    liveSessionData,
    setLiveSessionData,
  } = useTests();

  const [previewingTest, setPreviewingTest] = React.useState<TestDTO | null>(null);

  const handleDownloadTest = (test: TestDTO) => {
    if (!test.rubric) {
      console.warn("Rubric data is missing for this test, download might be incomplete.");
    }
    const rubricHtml = test.rubric ? `
        <h2>${t('rubricTitle')}</h2>
        <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
          <thead style="background-color: #f2f2f2;">
            <tr>
              <th style="padding: 8px; text-align: left;">${tTools('history.criterion')}</th>
              <th style="padding: 8px; text-align: left;">${tTools('history.excellent')}</th>
              <th style="padding: 8px; text-align: left;">${tTools('history.satisfactory')}</th>
              <th style="padding: 8px; text-align: left;">${tTools('history.needsImprovement')}</th>
            </tr>
          </thead>
          <tbody>
            ${test.rubric.criteria.map(c => `
              <tr>
                <td style="padding: 8px; border-top: 1px solid #ddd;"><strong>${encode(c.criterion)}</strong></td>
                <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(c.excellent)}</td>
                <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(c.satisfactory)}</td>
                <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(c.needsImprovement)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${test.rubric.suggestedScoring && test.rubric.suggestedScoring.length > 0 ? `
            <h3 style="margin-top: 1.5rem;">${tTools('history.scoringGuide')}</h3>
            <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
              <thead style="background-color: #f2f2f2;">
                <tr>
                    <th style="padding: 8px; text-align: left;">${t('editor.blockTypes.title')}</th>
                    <th style="padding: 8px; text-align: left;">${t('editor.points')}</th>
                    <th style="padding: 8px; text-align: left;">${t('editor.description')}</th>
                </tr>
              </thead>
              <tbody>
              ${test.rubric.suggestedScoring.map(item => `
                  <tr>
                      <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(item.section)}</td>
                      <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(item.points)}</td>
                      <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(item.description)}</td>
                  </tr>
              `).join('')}
              </tbody>
            </table>
        ` : ''}
    ` : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${encode(test.title)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
          h1, h2, h3 { color: #222; }
          h1 { font-size: 1.8rem; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
          h2 { font-size: 1.4rem; color: #555; margin-top: 2rem; border-left: 4px solid #8A2BE2; padding-left: 0.8rem; }
          .question-block { margin-bottom: 1.5rem; }
          .question { margin-bottom: 1rem; }
          .options { list-style-type: lower-alpha; padding-left: 1.5rem; }
        </style>
      </head>
      <body>
        <h1>${encode(test.title)}</h1>
        <p><em>${t('basedOn')}: "${encode(test.storyTitle)}"</em></p>
        
        ${test.blocks.map(block => `
          <div class="question-block">
            <h2>${encode(block.title)}</h2>
            ${block.questions.map((q, i) => `
              <div class="question">
                <p><strong>${i + 1}. ${encode(q.text)}</strong></p>
                ${q.options ? `<ol class="options">${q.options.map(opt => `<li>${encode(opt.text)}</li>`).join('')}</ol>` : ''}
              </div>
            `).join('')}
          </div>
        `).join('')}

        ${rubricHtml}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeFilename = test.title.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.setAttribute('href', url);
    link.setAttribute('download', `test_${safeFilename}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  if (selectedTest) {
    return (
        <DashboardLayout>
            <main className="flex-1 overflow-y-auto">
                <TestEditor 
                    test={selectedTest}
                    onTestChange={setSelectedTest}
                    onBack={() => {
                        updateTestMutation.mutate(selectedTest);
                        setSelectedTest(null)
                    }}
                />
            </main>
        </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('tagline')}</CardDescription>
              </div>
              <Button onClick={() => setIsCreateTestOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4"/>
                  {t('createButton')}
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-220px)] pr-4">
                {isLoadingTests ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : tests.length > 0 ? (
                  <div className="space-y-4">
                    <TooltipProvider>
                      {tests.map((test) => (
                        <Card key={test.id} className="hover:bg-accent transition-colors">
                          <CardContent className="p-4 flex items-center justify-between">
                              <button className="text-left flex-1" onClick={() => setSelectedTest(test)}>
                                  <h4 className="font-semibold text-lg">{test.title}</h4>
                                  <p className="text-sm text-muted-foreground">{t('basedOn')} "{test.storyTitle}"</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                      {t('createdAt')}: {format(new Date(test.createdAt), 'PP', { locale: locale === 'es' ? es : enUS })}
                                  </p>
                              </button>
                              <div className="flex items-center">
                                {test.status === 'live' && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="ml-2 text-green-500 hover:text-green-600" asChild>
                                          <Link href={`/${locale}/tests/${test.id}/results`}>
                                              <LineChart className="h-4 w-4"/>
                                          </Link>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>{t('liveSession.viewResults')}</p></TooltipContent>
                                  </Tooltip>
                                )}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (test.status === 'live') {
                                                setLiveSessionData({ testId: test.id, liveId: test.liveId! });
                                            } else {
                                                startTestSessionMutation.mutate(test.id);
                                            }
                                        }}
                                        disabled={startTestSessionMutation.isPending && startTestSessionMutation.variables === test.id}
                                    >
                                      {(startTestSessionMutation.isPending && startTestSessionMutation.variables === test.id) ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : test.status === 'live' ? (
                                        <TowerControl className="h-4 w-4 text-primary" />
                                      ) : (
                                        <Play className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>{test.status === 'live' ? t('liveSession.title') : t('startTest')}</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="ml-2"
                                      onClick={(e) => { e.stopPropagation(); setPreviewingTest(test); }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>{t('previewButton')}</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="ml-2"
                                      onClick={(e) => { e.stopPropagation(); handleDownloadTest(test); }}
                                    >
                                      <FileDown className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>{tCommon('download')}</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="ml-2"
                                      onClick={(e) => { e.stopPropagation(); generateRubricMutation.mutate(test); }}
                                      disabled={generateRubricMutation.isPending && generateRubricMutation.variables?.id === test.id}
                                    >
                                      {generateRubricMutation.isPending && generateRubricMutation.variables?.id === test.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <FileCheck2 className="h-4 w-4" />}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>{t('generateRubric')}</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="ml-2 text-destructive hover:text-destructive"
                                      onClick={(e) => { e.stopPropagation(); setTestToDelete(test.id); }}
                                      disabled={deleteTestMutation.isPending && deleteTestMutation.variables === test.id}
                                    >
                                      {deleteTestMutation.isPending && deleteTestMutation.variables === test.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Trash2 className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>{t('deleteTest')}</p></TooltipContent>
                                </Tooltip>
                              </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h4 className="mt-4 text-lg font-semibold">{t('noTests.title')}</h4>
                    <p className="mt-2 text-sm">{t('noTests.description')}</p>
                     <Button onClick={() => setIsCreateTestOpen(true)} className="mt-4">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        {t('createButton')}
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
      <AlertDialog open={!!testToDelete} onOpenChange={() => setTestToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
                <AlertDialogDescription>{t('deleteDialog.description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setTestToDelete(null)}>{tCommon('back')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => testToDelete && deleteTestMutation.mutate(testToDelete)} disabled={deleteTestMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {deleteTestMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('deleteDialog.confirm')}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CreateTestDialog 
        isOpen={isCreateTestOpen}
        onClose={() => setIsCreateTestOpen(false)}
        onTestCreated={handleCreateNewTest}
      />
      <TestPreviewDialog 
        isOpen={!!previewingTest}
        onClose={() => setPreviewingTest(null)}
        test={previewingTest}
      />
      <LiveSessionDialog
        isOpen={!!liveSessionData}
        onClose={() => setLiveSessionData(null)}
        sessionData={liveSessionData}
        stopSessionMutation={stopTestSessionMutation}
        students={students}
      />
    </DashboardLayout>
  );
}

export default withAuth(TestsPage, ['teacher']);
