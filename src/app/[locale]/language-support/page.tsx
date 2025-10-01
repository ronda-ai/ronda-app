

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  BookCopy,
  Sparkles,
  Trash2,
  Send,
  Languages,
  FileDown,
  PlusCircle,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import withAuth from '@/components/withAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import ReactMarkdown from 'react-markdown';
import { useLanguageSupport } from './_hooks/useLanguageSupport';
import { Dialog, DialogHeader, DialogFooter, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { LanguageSupportDTO } from '@/modules/language-support/application/dtos/language-support.dto';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import AddFocusAreaDialog from './_components/AddFocusAreaDialog';
import EditFocusAreaDialog from './_components/EditFocusAreaDialog';
import { FocusAreaDTO } from '@/modules/focus-area/application/dtos/focus-area.dto';

interface TranslationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  studentMaterial: string;
  translation: string;
}

const TranslationDialog: React.FC<TranslationDialogProps> = ({
  isOpen,
  onClose,
  title,
  studentMaterial,
  translation,
}) => {
  const t = useScopedI18n('languageSupport.history');
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          <div className="prose prose-sm">
             <ReactMarkdown>{studentMaterial}</ReactMarkdown>
          </div>
          <div className="prose prose-sm text-muted-foreground border-l pl-4">
             <ReactMarkdown>{translation}</ReactMarkdown>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">{useScopedI18n('common')('back')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function LanguageSupportPage() {
  const t = useScopedI18n('languageSupport');
  const tCommon = useScopedI18n('common');
  const locale = useCurrentLocale();
  const [translationDialogState, setTranslationDialogState] = useState<{
    isOpen: boolean;
    title: string;
    studentMaterial: string;
    translation: string;
  }>({ isOpen: false, title: '', studentMaterial: '', translation: '' });


  const {
    selectedStudentId,
    setSelectedStudentId,
    nativeLanguage,
    setNativeLanguage,
    selectedFocusAreas,
    handleFocusAreaChange,
    feedbackValues,
    setFeedbackValues,
    deletingSupportId,
    setDeletingSupportId,
    students,
    isLoadingStudents,
    supportHistory,
    isLoadingHistory,
    selectedStudent,
    availableFocusAreas,
    isLoadingFocusAreas,
    generateSupportMutation,
    addFeedbackMutation,
    deleteSupportMutation,
    handleGenerate,
    handleAddFeedback,
    isAddFocusAreaDialogOpen,
    setIsAddFocusAreaDialogOpen,
    isEditMode,
    handleToggleEditMode,
    editingFocusArea,
    setEditingFocusArea,
    updateFocusAreaMutation,
    deleteFocusAreaMutation,
  } = useLanguageSupport();

  const openTranslationDialog = (item: { studentMaterial: string, studentMaterialTranslation: string, nativeLanguage: string }) => {
    setTranslationDialogState({
      isOpen: true,
      title: t('history.translationTitle', { language: item.nativeLanguage }),
      studentMaterial: item.studentMaterial,
      translation: item.studentMaterialTranslation
    });
  };
  
  const getGuideTitle = (guide: string) => {
    const match = guide.match(/^###\s*(.*)/);
    return match ? match[1] : t('history.header', { language: 'Material' });
  };
  
  const handleDownload = (material: string, title: string) => {
    const blob = new Blob([material], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('form.title')}</CardTitle>
                <CardDescription>{t('form.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingStudents ? <Skeleton className="h-64 w-full" /> : (
                  <form onSubmit={handleGenerate} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="student-select">{t('form.studentLabel')}</Label>
                        <Select onValueChange={setSelectedStudentId} value={selectedStudentId || ''}>
                            <SelectTrigger id="student-select">
                                <SelectValue placeholder={t('form.studentPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                {students.map(student => (
                                    <SelectItem key={student.id} value={student.id}>
                                        {student.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedStudentId && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="native-language">{t('form.languageLabel')}</Label>
                                <Input 
                                    id="native-language"
                                    value={nativeLanguage}
                                    onChange={(e) => setNativeLanguage(e.target.value)}
                                    placeholder={t('form.languagePlaceholder')}
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                               <div className="flex justify-between items-center">
                                    <Label>{t('form.focusAreasLabel')}</Label>
                                    <div className='flex items-center'>
                                      <Button type='button' variant='ghost' size='icon' className='h-6 w-6' onClick={() => setIsAddFocusAreaDialogOpen(true)}>
                                          <PlusCircle className='h-5 w-5 text-primary' />
                                      </Button>
                                       <Button type='button' variant='ghost' size='icon' className='h-6 w-6' onClick={handleToggleEditMode} data-active={isEditMode}>
                                          <Trash2 className={cn('h-5 w-5', isEditMode ? 'text-destructive' : 'text-primary')} />
                                      </Button>
                                    </div>
                                </div>
                                <ScrollArea className="h-48 border rounded-md p-4">
                                     {isLoadingFocusAreas ? (
                                         <div className="space-y-2 pr-4"><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-full" /></div>
                                     ) : (
                                        <div className="flex flex-col gap-2 pr-4">
                                            {availableFocusAreas.map((area) => {
                                                const areaLabel = t(`focusAreas.${area.name as 'reading'}` as const) || area.name;
                                                return isEditMode ? (
                                                    <Button
                                                        key={area.id}
                                                        type="button"
                                                        variant="ghost"
                                                        className="h-auto p-1.5 justify-start text-left text-sm font-medium animate-jiggle bg-accent/50 hover:bg-accent"
                                                        onClick={() => setEditingFocusArea(area)}
                                                    >
                                                        {areaLabel}
                                                    </Button>
                                                ) : (
                                                    <div key={area.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={area.id}
                                                            checked={selectedFocusAreas.has(area.name)}
                                                            onCheckedChange={() => handleFocusAreaChange(area.name)}
                                                        />
                                                        <label
                                                            htmlFor={area.id}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                        {areaLabel}
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                     )}
                                </ScrollArea>
                            </div>
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={generateSupportMutation.isPending || !nativeLanguage.trim() || selectedFocusAreas.size === 0}
                            >
                              {generateSupportMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Sparkles className="mr-2 h-4 w-4" />
                              )}
                              {t('form.generateButton')}
                            </Button>
                        </>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>
            {generateSupportMutation.isPending && (
                <Card>
                     <CardHeader>
                        <CardTitle>{t('generatingTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Separator />
                        <Skeleton className="h-32 w-full" />
                    </CardContent>
                </Card>
            )}
          </div>
          <div className="overflow-y-auto">
            <Card>
                <CardHeader>
                    <CardTitle>{t('history.title')}</CardTitle>
                    <CardDescription>{t('history.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {!selectedStudentId ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                            <Languages className="mx-auto h-12 w-12 text-gray-400" />
                            <h4 className="mt-4 text-lg font-semibold">{t('history.selectStudentPrompt.title')}</h4>
                            <p className="mt-2 text-sm">{t('history.selectStudentPrompt.description')}</p>
                        </div>
                    ) : isLoadingHistory ? (
                        <div className="space-y-4">
                          <Skeleton className="h-40 w-full" />
                          <Skeleton className="h-40 w-full" />
                        </div>
                    ) : supportHistory.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full space-y-4">
                        {supportHistory.map((item: LanguageSupportDTO) => (
                            <AccordionItem value={item.id} key={item.id} className="border rounded-lg bg-muted/30">
                            <div className="flex justify-between items-center p-4">
                                <AccordionTrigger className="flex-1 p-0 hover:no-underline">
                                    <div className="text-left">
                                        <h4 className="font-semibold text-lg">{getGuideTitle(item.teacherGuide)}</h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          {item.focusAreas.map(area => (
                                              <Badge key={area} variant="secondary">{t(`focusAreas.${area as 'reading'}` as const) || area}</Badge>
                                          ))}
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                {deleteSupportMutation.isPending && deleteSupportMutation.variables === item.id ? (
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Button variant="ghost" size="icon" className="ml-2 text-destructive hover:text-destructive" onClick={() => setDeletingSupportId(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <AccordionContent className="px-4 pb-4 pt-0">
                                <div className="pt-4 space-y-4">
                                    <Card className="bg-background">
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-base">{t('history.teacherGuide')}</CardTitle>
                                                 {item.studentMaterialTranslation && (
                                                    <Button variant="outline" size="sm" onClick={() => openTranslationDialog(item)}>
                                                        <Languages className="mr-2 h-4 w-4" />
                                                        {t('history.showTranslation')}
                                                    </Button>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                                            <ReactMarkdown>{item.teacherGuide.replace(/^###\s*(.*)\n*/, '')}</ReactMarkdown>
                                        </CardContent>
                                    </Card>
                                     <Card className="bg-background">
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-base">{t('history.studentMaterial')}</CardTitle>
                                                {item.materialType === 'worksheet' && (
                                                    <Button variant="outline" size="sm" onClick={() => handleDownload(item.studentMaterial, getGuideTitle(item.teacherGuide))}>
                                                        <FileDown className="mr-2 h-4 w-4" />
                                                        {tCommon('download')}
                                                    </Button>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                                             <ReactMarkdown>{item.studentMaterial}</ReactMarkdown>
                                        </CardContent>
                                        {item.audioUrl && (
                                            <CardFooter>
                                                <audio controls src={`/api/audio/${item.audioUrl}`} className="w-full h-10" />
                                            </CardFooter>
                                        )}
                                    </Card>
                                    <Separator />
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">{t('history.feedbackTitle')}</h4>
                                        {item.feedback ? (
                                        <p className="text-sm italic text-muted-foreground">"{item.feedback}"</p>
                                        ) : (
                                        <div className="flex items-center gap-2">
                                            <Textarea
                                            placeholder={t('history.feedbackPlaceholder')}
                                            value={feedbackValues[item.id] || ''}
                                            onChange={e => setFeedbackValues(prev => ({ ...prev, [item.id]: e.target.value }))}
                                            rows={2}
                                            />
                                            <Button size="icon" onClick={() => handleAddFeedback(item.id)} disabled={addFeedbackMutation.isPending}>
                                            <Send />
                                            </Button>
                                        </div>
                                        )}
                                    </div>
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
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
        <AlertDialog open={!!deletingSupportId} onOpenChange={() => setDeletingSupportId(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>{t('history.deleteDialog.title')}</AlertDialogTitle>
                  <AlertDialogDescription>{t('history.deleteDialog.description')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDeletingSupportId(null)}>{tCommon('back')}</AlertDialogCancel>
                  <AlertDialogAction onClick={() => { if (deletingSupportId) { deleteSupportMutation.mutate(deletingSupportId); } }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={deleteSupportMutation.isPending}>
                      {deleteSupportMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Delete'}
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
      <TranslationDialog
        isOpen={translationDialogState.isOpen}
        onClose={() => setTranslationDialogState(prev => ({ ...prev, isOpen: false }))}
        title={translationDialogState.title}
        studentMaterial={translationDialogState.studentMaterial}
        translation={translationDialogState.translation}
      />
       <AddFocusAreaDialog 
            isOpen={isAddFocusAreaDialogOpen}
            onClose={() => setIsAddFocusAreaDialogOpen(false)}
            existingFocusAreas={availableFocusAreas.map(fa => fa.name)}
        />
        <EditFocusAreaDialog
            isOpen={!!editingFocusArea}
            onClose={() => setEditingFocusArea(null)}
            focusArea={editingFocusArea?.name || null}
            onUpdate={(oldName, newName) => {
                const areaToUpdate = availableFocusAreas.find(fa => fa.name === oldName);
                if(areaToUpdate) {
                    updateFocusAreaMutation.mutate({ id: areaToUpdate.id, name: newName });
                }
            }}
            onDelete={(nameToDelete) => {
                 const areaToDelete = availableFocusAreas.find(fa => fa.name === nameToDelete);
                if(areaToDelete) {
                    deleteFocusAreaMutation.mutate(areaToDelete.id);
                }
            }}
        />
    </DashboardLayout>
  );
}

export default withAuth(LanguageSupportPage, ['teacher']);
