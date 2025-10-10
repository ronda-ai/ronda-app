
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Save,
  Loader2,
  BrainCircuit,
  Pencil,
  Search,
  Palette,
  Sparkles,
} from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import withAuth from '@/components/withAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { useClassroom } from './_hooks/useClassroom';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import EditStudentDialog from '@/components/EditStudentDialog';
import AskAIExpertDialog from './_components/AskAIExpertDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import ThemeGallery from './_components/ThemeGallery';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { themes } from '@/config/themes';
import MoreThemesDialog from './_components/MoreThemesDialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function ClassroomPage() {
  const tClassroom = useScopedI18n('classroom');
  const tAIConfig = useScopedI18n('home.aiConfig');
  const tStudentList = useScopedI18n('studentList');
  
  const {
    config,
    setConfig,
    isLoadingConfig,
    saveConfigMutation,
    handleConfigChange,
    handlePluginChange,
    handleThemeSelection,
    students,
    isLoadingStudents,
    updateStudentMutation,
    searchTerm,
    setSearchTerm,
    filteredStudents,
    editingStudent,
    setEditingStudent,
    askingAIStudent,
    setAskingAIStudent,
    aiQuestion,
    setAiQuestion,
    aiAnswer,
    setAiAnswer,
    askAIExpertMutation,
    handleAskAI,
    isThemeGalleryOpen,
    setIsThemeGalleryOpen,
  } = useClassroom();
  
  const pluginOptions = [
      { value: 'googleai', label: 'Google AI (Gemini)' },
      { value: 'openai', label: 'OpenAI (GPT)' },
      { value: 'deepseek', label: 'DeepSeek' },
      { value: 'xai', label: 'xAI (Grok)' },
      { value: 'ollama', label: 'Ollama / Other' },
  ];

  const modelOptions: Record<string, { value: string, label: string }[]> = {
    googleai: [
      { value: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite' },
      { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
      { value: 'gemini-2.5-flash-pro', label: 'Gemini 2.5 Flash Pro' },
      { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite' },
    ],
    openai: [
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    ],
    deepseek: [
        { value: 'deepseek-chat', label: 'DeepSeek Chat' },
        { value: 'deepseek-coder', label: 'DeepSeek Coder' },
    ],
    xai: [
        { value: 'grok-3-mini', label: 'Grok 3 Mini' },
    ],
    ollama: [],
  }

  const handleSaveStudent = (id: string, data: Partial<StudentDTO>) => {
    updateStudentMutation.mutate({ id, data });
  };
  
  const handleOpenAIExpertDialog = (student: StudentDTO) => {
    setAskingAIStudent(student);
    setAiQuestion('');
    setAiAnswer('');
  }
  
  const displayedThemes = themes.slice(0, 4);
  const moreThemes = themes.slice(4);

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{tClassroom('form.title')}</CardTitle>
                    <CardDescription>{tClassroom('form.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingConfig ? (
                        <div className="space-y-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <div className="flex justify-end">
                                <Skeleton className="h-10 w-24" />
                            </div>
                        </div>
                    ) : (
                    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg font-medium">{tClassroom('form.title')}</AccordionTrigger>
                            <AccordionContent className="pt-4 mx-2">
                                 <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="plugin">{tAIConfig('plugin.title')}</Label>
                                            <Select value={config.plugin || 'googleai'} onValueChange={handlePluginChange}>
                                                <SelectTrigger id="plugin">
                                                    <SelectValue placeholder={tAIConfig('plugin.placeholder')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {pluginOptions.map(opt => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="model">{tAIConfig('model.title')}</Label>
                                            {config.plugin === 'ollama' ? (
                                                <Input
                                                    id="model"
                                                    value={config.modelName || ''}
                                                    onChange={e => handleConfigChange('modelName', e.target.value)}
                                                    placeholder={tAIConfig('model.customPlaceholder')}
                                                />
                                            ) : (
                                                <Select value={config.modelName || ''} onValueChange={(v) => handleConfigChange('modelName', v)}>
                                                    <SelectTrigger id="model">
                                                        <SelectValue placeholder={tAIConfig('model.placeholder')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(modelOptions[config.plugin || 'googleai'] || []).map(opt => (
                                                        <SelectItem key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                    </div>

                                    {config.plugin === 'ollama' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="ollamaBaseUrl">{tAIConfig('ollamaBaseUrl.title')}</Label>
                                            <Input
                                            id="ollamaBaseUrl"
                                            value={config.ollamaBaseUrl || ''}
                                            onChange={e => handleConfigChange('ollamaBaseUrl', e.target.value)}
                                            placeholder={tAIConfig('ollamaBaseUrl.placeholder')}
                                            />
                                        </div>
                                    )}
                                    
                                    <Separator />
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="className">{tClassroom('form.className')}</Label>
                                            <Input
                                            id="className"
                                            value={config.className || ''}
                                            onChange={e => handleConfigChange('className', e.target.value)}
                                            placeholder={tClassroom('form.classNamePlaceholder')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="analysisLevel">{tClassroom('form.analysisLevel')}</Label>
                                            <Select value={config.analysisLevel || 'medium'} onValueChange={(v) => handleConfigChange('analysisLevel', v)}>
                                                <SelectTrigger id="analysisLevel">
                                                    <SelectValue placeholder={tClassroom('form.analysisLevelPlaceholder')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="low">{tClassroom('form.analysisLevels.low')}</SelectItem>
                                                    <SelectItem value="medium">{tClassroom('form.analysisLevels.medium')}</SelectItem>
                                                    <SelectItem value="high">{tClassroom('form.analysisLevels.high')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="ageOrGrade">{tAIConfig('ageOrGrade')}</Label>
                                            <Input
                                            id="ageOrGrade"
                                            value={config.ageOrGrade || ''}
                                            onChange={e => handleConfigChange('ageOrGrade', e.target.value)}
                                            placeholder={tAIConfig('ageOrGradePlaceholder')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country">{tAIConfig('country')}</Label>
                                            <Input
                                            id="country"
                                            value={config.country || ''}
                                            onChange={e => handleConfigChange('country', e.target.value)}
                                            placeholder={tAIConfig('countryPlaceholder')}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="classInterests">{tClassroom('form.classInterests')}</Label>
                                        <Input
                                        id="classInterests"
                                        value={Array.isArray(config.classInterests) ? config.classInterests.join(', ') : ''}
                                        onChange={e => handleConfigChange('classInterests', e.target.value.split(',').map(s => s.trim()))}
                                        placeholder={tClassroom('form.classInterestsPlaceholder')}
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                             <AccordionTrigger className="text-lg font-medium"> <Palette className="mr-2 h-5 w-5" /> {tClassroom('theme.title')}</AccordionTrigger>
                             <AccordionContent className="pt-4 mx-2">
                                <div>
                                    <ThemeGallery onSelectTheme={handleThemeSelection} currentThemeName={config.theme?.name} themes={displayedThemes} />
                                    <div className="mt-4 text-center">
                                        <Button variant="outline" onClick={() => setIsThemeGalleryOpen(true)}>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            {tClassroom('theme.moreThemes')}
                                        </Button>
                                    </div>
                                </div>
                             </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                     )}
                    <div className="flex justify-end mt-6">
                        <Button onClick={() => saveConfigMutation.mutate(config)} disabled={saveConfigMutation.isPending}>
                        {saveConfigMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {tAIConfig('saveButton')}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{tClassroom('studentList.title')}</CardTitle>
                    <CardDescription>{tClassroom('studentList.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder={tClassroom('studentList.searchPlaceholder')} 
                                className="pl-8 w-full"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                             />
                        </div>
                        <ScrollArea className="h-96">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
                                {isLoadingStudents ? (
                                    Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
                                ) : filteredStudents.length > 0 ? (
                                    filteredStudents.map(student => (
                                        <Card key={student.id} className="p-4 flex flex-col justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p className="font-semibold">{student.name}</p>
                                                    <p className="text-xs text-muted-foreground">{student.age} {tStudentList('yearsOld')}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-1 mt-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenAIExpertDialog(student)}>
                                                    <BrainCircuit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingStudent(student)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-10">
                                        <p>{tClassroom('studentList.noResults')}</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
      <EditStudentDialog
        student={editingStudent}
        students={students}
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleSaveStudent}
      />
      <AskAIExpertDialog
        isOpen={!!askingAIStudent}
        onClose={() => setAskingAIStudent(null)}
        student={askingAIStudent}
        question={aiQuestion}
        setQuestion={setAiQuestion}
        answer={aiAnswer}
        isLoading={askAIExpertMutation.isPending}
        onAsk={handleAskAI}
       />
       <MoreThemesDialog
        isOpen={isThemeGalleryOpen}
        onClose={() => setIsThemeGalleryOpen(false)}
        onSelectTheme={handleThemeSelection}
        currentThemeName={config.theme?.name}
        themes={moreThemes}
       />
    </DashboardLayout>
  );
}

export default withAuth(ClassroomPage, ['teacher']);
