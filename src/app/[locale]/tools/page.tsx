

'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  BookCopy,
  Wand,
  FileCheck2,
  Trash2,
  FileDown,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Select from 'react-select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActivityAdapter } from './_hooks/useActivityAdapter';
import { useRubricGenerator } from './_hooks/useRubricGenerator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { RubricSuggestionDTO } from '@/modules/rubric-suggestion/application/dtos/rubric-suggestion.dto';
import { encode } from 'html-entities';
import { ActivityAdaptationDTO } from '@/modules/activity-adaptation/application/dtos/activity-adaptation.dto';
import ReactMarkdown from 'react-markdown';
import { useSearchParams } from 'next/navigation';

function ToolsPage() {
  const t = useScopedI18n('tools');
  const tTests = useScopedI18n('tests');
  const tRelations = useScopedI18n('relations');
  const locale = useCurrentLocale();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = React.useState(tab || 'adapter');

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);


  const {
    activityText,
    setActivityText,
    setSelectedStudents,
    customPrompt,
    setCustomPrompt,
    isLoadingStudents,
    studentOptions,
    selectedStudentOptions,
    adaptationHistory,
    isLoadingAdaptationHistory,
    adaptActivityMutation,
    handleAdapterSubmit,
    activityOptions,
    summarizeActivityMutation,
    adaptationToDelete,
    setAdaptationToDelete,
    deleteAdaptationMutation,
  } = useActivityAdapter();

  const {
    rubricActivityText,
    setRubricActivityText,
    rubricHistory,
    isLoadingRubricHistory,
    generateRubricMutation,
    handleRubricSubmit,
    activityOptions: rubricActivityOptions,
    rubricToDelete,
    setRubricToDelete,
    deleteRubricMutation,
    handleSelectActivityOrTest,
  } = useRubricGenerator();

  const isGeneratingAdapter = adaptActivityMutation.isPending;
  const isGeneratingRubric = generateRubricMutation.isPending;

  const handleDownloadAdaptation = (adaptation: ActivityAdaptationDTO) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t('activityAdapter.title')}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
          h1, h2, h3 { color: #222; }
          h1 { font-size: 1.8rem; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
          h2 { font-size: 1.4rem; color: #555; margin-top: 2rem; border-left: 4px solid #ccc; padding-left: 0.8rem; }
          .original-activity { background-color: #f9f9f9; border: 1px solid #eee; border-radius: 8px; padding: 1rem; margin-bottom: 2rem; }
          .suggestion-card { border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1.5rem; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .suggestion-header { background-color: #e6e6fa; color: #4B0082; padding: 0.8rem 1rem; }
          .suggestion-header h3 { margin: 0; font-size: 1.2rem; }
          .suggestion-content { padding: 1rem; }
          .suggestion-reasoning { font-size: 0.9rem; color: #666; border-top: 1px dashed #ccc; padding-top: 0.8rem; margin-top: 1rem; }
          .suggestion-reasoning strong { color: #333; }
        </style>
      </head>
      <body>
        <h1>${t('activityAdapter.title')}</h1>
        <div class="original-activity">
            <h2>${t('activityAdapter.activityLabel')}</h2>
            <p>${encode(adaptation.originalActivity)}</p>
        </div>
        <h2>${t('history.descriptionAdapter')}</h2>
        ${adaptation.suggestions.map(suggestion => `
          <div class="suggestion-card">
            <div class="suggestion-header">
              <h3>${encode(suggestion.title)}</h3>
            </div>
            <div class="suggestion-content">
              <p>${encode(suggestion.description)}</p>
              <p class="suggestion-reasoning"><strong>${t('history.reasoning')}:</strong> ${encode(suggestion.reasoning)}</p>
            </div>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeFilename = adaptation.originalActivity.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.setAttribute('href', url);
    link.setAttribute('download', `adaptation_${safeFilename}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const handleDownloadRubric = (rubric: RubricSuggestionDTO) => {
    const scoringGuideHtml = rubric.suggestedScoring && rubric.suggestedScoring.length > 0 ? `
      <h2>${t('history.scoringGuide')}</h2>
      <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
        <thead style="background-color: #f2f2f2;">
          <tr>
            <th style="padding: 8px; text-align: left;">${tTests('editor.blockTypes.title')}</th>
            <th style="padding: 8px; text-align: left;">${tTests('editor.points')}</th>
            <th style="padding: 8px; text-align: left;">${tTests('editor.description')}</th>
          </tr>
        </thead>
        <tbody>
          ${rubric.suggestedScoring.map(item => `
            <tr>
              <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(item.section)}</td>
              <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(item.points)}</td>
              <td style="padding: 8px; border-top: 1px solid #ddd;">${encode(item.description)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t('rubricGenerator.title')}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
          h1, h2 { color: #222; }
          h1 { font-size: 1.8rem; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
          h2 { font-size: 1.4rem; color: #555; margin-top: 2rem; }
          .activity-description { background-color: #f9f9f9; border: 1px solid #eee; border-radius: 8px; padding: 1rem; margin-bottom: 2rem; white-space: pre-wrap; }
          table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          thead { background-color: #f2f2f2; }
          strong { color: #333; }
        </style>
      </head>
      <body>
        <h1>${t('rubricGenerator.title')}</h1>
        <div class="activity-description">
            <h2>${t('activityAdapter.activityLabel')}</h2>
            <p>${encode(rubric.activityDescription)}</p>
        </div>
        <h2>${t('history.criterion')}</h2>
        <table>
          <thead>
            <tr>
              <th>${t('history.criterion')}</th>
              <th>${t('history.excellent')}</th>
              <th>${t('history.satisfactory')}</th>
              <th>${t('history.needsImprovement')}</th>
            </tr>
          </thead>
          <tbody>
            ${rubric.criteria.map(criterion => `
              <tr>
                <td><strong>${encode(criterion.criterion)}</strong></td>
                <td>${encode(criterion.excellent)}</td>
                <td>${encode(criterion.satisfactory)}</td>
                <td>${encode(criterion.needsImprovement)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${scoringGuideHtml}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeFilename = rubric.activityDescription.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.setAttribute('href', url);
    link.setAttribute('download', `rubrica_${safeFilename}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="p-8 pb-0">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="adapter">
                        <Wand className="mr-2" />
                        {t('activityAdapter.title')}
                    </TabsTrigger>
                    <TabsTrigger value="rubric">
                        <FileCheck2 className="mr-2" />
                        {t('rubricGenerator.title')}
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="adapter" className="flex-1 overflow-hidden mt-0">
                 <div className="h-full grid md:grid-cols-2 gap-8 p-8 pt-6">
                    <div className="flex flex-col gap-8 overflow-y-auto">
                      <Card>
                        <CardHeader>
                          <CardTitle>{t('activityAdapter.title')}</CardTitle>
                          <CardDescription>{t('activityAdapter.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleAdapterSubmit} className="space-y-4">
                            <div className='space-y-2'>
                                <Label htmlFor="existing-activity-select">{t('activityAdapter.existingActivityLabel')}</Label>
                                <Select
                                  options={activityOptions}
                                  onChange={(option) => {
                                      if (option) {
                                          summarizeActivityMutation.mutate(option.value);
                                      }
                                  }}
                                  placeholder={t('activityAdapter.existingActivityPlaceholder')}
                                  isClearable
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="activity-text">{t('activityAdapter.activityLabel')}</Label>
                                <Textarea
                                id="activity-text"
                                value={activityText}
                                onChange={(e) => setActivityText(e.target.value)}
                                placeholder={t('activityAdapter.placeholder')}
                                required
                                rows={6}
                                className="text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-select">{t('activityAdapter.studentLabel')}</Label>
                                <Select
                                    isMulti
                                    options={studentOptions}
                                    value={selectedStudentOptions}
                                    onChange={(selected) => setSelectedStudents(selected.map(s => s.value))}
                                    placeholder={t('activityAdapter.studentPlaceholder')}
                                    isLoading={isLoadingStudents}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="custom-prompt">{t('activityAdapter.customPromptLabel')}</Label>
                                <Input
                                id="custom-prompt"
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder={t('activityAdapter.customPromptPlaceholder')}
                                />
                            </div>
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={isGeneratingAdapter || !activityText.trim()}
                              size="lg"
                            >
                              {isGeneratingAdapter ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Wand className="mr-2 h-4 w-4" />
                              )}
                              {t('activityAdapter.button')}
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                       {isGeneratingAdapter && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('activityAdapter.generatingTitle')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                   <Skeleton className="h-16 w-full" />
                                   <Skeleton className="h-16 w-full" />
                                   <Skeleton className="h-16 w-full" />
                                </CardContent>
                            </Card>
                       )}
                    </div>
                    <div className="overflow-y-auto">
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle>{t('history.title')}</CardTitle>
                          <CardDescription>{t('history.descriptionAdapter')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[calc(100vh-320px)] pr-4">
                            {isLoadingAdaptationHistory ? (
                              <div className="space-y-4">
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-24 w-full" />
                              </div>
                            ) : adaptationHistory.length > 0 ? (
                              <Accordion type="single" collapsible className="w-full space-y-4">
                                {adaptationHistory.map((item) => (
                                  <AccordionItem value={item.id} key={item.id} className="border rounded-lg bg-muted/30">
                                     <div className="flex justify-between items-center p-4">
                                        <AccordionTrigger className="flex-1 text-left hover:no-underline p-0">
                                            <div>
                                                <p className="font-normal text-muted-foreground line-clamp-2">"{item.originalActivity}"</p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                                </p>
                                            </div>
                                        </AccordionTrigger>
                                        <div className="flex items-center ml-2">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-primary/70 hover:text-primary" onClick={() => handleDownloadAdaptation(item)}>
                                                <FileDown className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-7 w-7 text-destructive/60 hover:text-destructive shrink-0" 
                                                onClick={() => setAdaptationToDelete(item.id)}
                                                disabled={deleteAdaptationMutation.isPending && deleteAdaptationMutation.variables === item.id}
                                            >
                                                {deleteAdaptationMutation.isPending && deleteAdaptationMutation.variables === item.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <AccordionContent className="px-4 pb-4 pt-0">
                                      <div className="space-y-4 border-t pt-4">
                                        {item.suggestions.map((suggestion, index) => (
                                          <div key={index} className="p-4 border rounded-lg bg-background">
                                              <h4 className="font-semibold text-primary">{suggestion.title}</h4>
                                              <p className="text-sm mt-1">{suggestion.description}</p>
                                              <p className="text-xs text-muted-foreground mt-3 pt-2 border-t">
                                                  <span className="font-semibold">{t('history.reasoning')}:</span> {suggestion.reasoning}
                                              </p>
                                          </div>
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                                <BookCopy className="mx-auto h-12 w-12 text-gray-400" />
                                <h4 className="mt-4 text-lg font-semibold">{t('history.noResults.title')}</h4>
                                <p className="mt-2 text-sm">{t('history.noResults.description')}</p>
                              </div>
                            )}
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="rubric" className="flex-1 overflow-hidden mt-0">
                <div className="h-full grid md:grid-cols-2 gap-8 p-8 pt-6">
                    <div className="flex flex-col gap-8 overflow-y-auto">
                      <Card>
                        <CardHeader>
                          <CardTitle>{t('rubricGenerator.title')}</CardTitle>
                          <CardDescription>{t('rubricGenerator.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleRubricSubmit} className="space-y-4">
                            <div className='space-y-2'>
                                <Label htmlFor="existing-rubric-activity-select">{t('activityAdapter.existingActivityLabel')}</Label>
                                <Select
                                    options={rubricActivityOptions}
                                    onChange={(option) => handleSelectActivityOrTest(option as any)}
                                    placeholder={t('activityAdapter.existingActivityPlaceholder')}
                                    isClearable
                                />
                            </div>
                            <Textarea
                              value={rubricActivityText}
                              onChange={(e) => setRubricActivityText(e.target.value)}
                              placeholder={t('rubricGenerator.placeholder')}
                              required
                              rows={8}
                              className="text-base"
                            />
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={isGeneratingRubric || !rubricActivityText.trim()}
                              size="lg"
                            >
                              {isGeneratingRubric ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <FileCheck2 className="mr-2 h-4 w-4" />
                              )}
                              {t('rubricGenerator.button')}
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="overflow-y-auto">
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle>{t('history.title')}</CardTitle>
                          <CardDescription>{t('history.descriptionRubric')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[calc(100vh-320px)] pr-4">
                            {isLoadingRubricHistory ? (
                              <div className="space-y-4">
                                <Skeleton className="h-40 w-full" />
                                <Skeleton className="h-40 w-full" />
                              </div>
                            ) : rubricHistory.length > 0 ? (
                               <Accordion type="single" collapsible className="w-full space-y-4">
                                {rubricHistory.map((item) => (
                                  <AccordionItem value={item.id} key={item.id} className="border rounded-lg bg-muted/30">
                                      <div className="flex justify-between items-center p-4">
                                          <AccordionTrigger className="flex-1 hover:no-underline p-0 text-left">
                                              <div>
                                                <p className="font-normal text-muted-foreground line-clamp-2">"{item.activityDescription}"</p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: locale === 'es' ? es : enUS })}
                                                </p>
                                              </div>
                                          </AccordionTrigger>
                                          <div className="flex items-center ml-2">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-primary/70 hover:text-primary" onClick={() => handleDownloadRubric(item)}>
                                                <FileDown className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-7 w-7 text-destructive/60 hover:text-destructive shrink-0" 
                                                onClick={() => setRubricToDelete(item.id)}
                                                disabled={deleteRubricMutation.isPending && deleteRubricMutation.variables === item.id}
                                            >
                                                {deleteRubricMutation.isPending && deleteRubricMutation.variables === item.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                          </div>
                                      </div>
                                      <AccordionContent className="px-4 pb-4 pt-0">
                                          <div className="border-t pt-4 space-y-4">
                                              <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-1/4">{t('history.criterion')}</TableHead>
                                                        <TableHead>{t('history.excellent')}</TableHead>
                                                        <TableHead>{t('history.satisfactory')}</TableHead>
                                                        <TableHead>{t('history.needsImprovement')}</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {item.criteria.map((criterion, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-semibold">{criterion.criterion}</TableCell>
                                                            <TableCell>{criterion.excellent}</TableCell>
                                                            <TableCell>{criterion.satisfactory}</TableCell>
                                                            <TableCell>{criterion.needsImprovement}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                              </Table>
                                              {item.suggestedScoring && item.suggestedScoring.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold mt-4 mb-2">{t('history.scoringGuide')}</h4>
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>{tTests('editor.blockTypes.title')}</TableHead>
                                                                <TableHead>{tTests('editor.points')}</TableHead>
                                                                <TableHead>{tTests('editor.description')}</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {item.suggestedScoring.map((scoring, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell className="font-medium">{scoring.section}</TableCell>
                                                                    <TableCell>{scoring.points}</TableCell>
                                                                    <TableCell>{scoring.description}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                              )}
                                          </div>
                                      </AccordionContent>
                                  </AccordionItem>
                                ))}
                               </Accordion>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                                <BookCopy className="mx-auto h-12 w-12 text-gray-400" />
                                <h4 className="mt-4 text-lg font-semibold">{t('history.noResults.title')}</h4>
                                <p className="mt-2 text-sm">{t('history.noResults.description')}</p>
                              </div>
                            )}
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
      </div>
       <AlertDialog open={!!adaptationToDelete} onOpenChange={(open) => !open && setAdaptationToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('history.deleteDialogAdapter.title')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('history.deleteDialogAdapter.description')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setAdaptationToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => adaptationToDelete && deleteAdaptationMutation.mutate(adaptationToDelete)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                        {deleteAdaptationMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {t('history.deleteDialogAdapter.confirm')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={!!rubricToDelete} onOpenChange={(open) => !open && setRubricToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('history.deleteDialogRubric.title')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('history.deleteDialogRubric.description')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setRubricToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => rubricToDelete && deleteRubricMutation.mutate(rubricToDelete)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" disabled={deleteRubricMutation.isPending}>
                        {deleteRubricMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {t('history.deleteDialogRubric.confirm')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </DashboardLayout>
  );
}

export default withAuth(ToolsPage, ['teacher']);
