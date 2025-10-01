'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import withAuth from '@/components/withAuth';
import { useScopedI18n } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, Lightbulb, Microscope, Users, BookOpenCheck, BrainCircuit as BrainCircuitIcon } from 'lucide-react';
import { useTeacherLab } from './_hooks/useTeacherLab';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClassPlanningTab from './_components/ClassPlanningTab';
import ClassroomClimateTab from './_components/ClassroomClimateTab';
import TeachingStrategiesTab from './_components/TeachingStrategiesTab';
import ProfessionalDevelopmentTab from './_components/ProfessionalDevelopmentTab';
import MbeExpertTab from './_components/MbeExpertTab';


function TeacherLabPage() {
    const t = useScopedI18n('teacherLab');
    const tNav = useScopedI18n('nav');
    const hooks = useTeacherLab();

    const {
        classroomPulse,
        isLoadingPulse,
        handleGeneratePulse,
    } = hooks;

    return (
        <DashboardLayout>
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
                        <p className="mt-4 text-lg text-muted-foreground">{t('tagline')}</p>
                    </div>
                    
                    <Tabs defaultValue="pulse" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="pulse"><Sparkles className="mr-2 h-4 w-4"/>{t('tabs.pulse')}</TabsTrigger>
                            <TabsTrigger value="domainA"><GraduationCap className="mr-2 h-4 w-4"/>{t('tabs.domainA')}</TabsTrigger>
                            <TabsTrigger value="domainB"><Users className="mr-2 h-4 w-4"/>{t('tabs.domainB')}</TabsTrigger>
                            <TabsTrigger value="domainC"><BookOpenCheck className="mr-2 h-4 w-4"/>{t('tabs.domainC')}</TabsTrigger>
                             <TabsTrigger value="domainD"><BrainCircuitIcon className="mr-2 h-4 w-4"/>{t('tabs.domainD')}</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="pulse" className="mt-6">
                             <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>{t('classroomPulse.title')}</CardTitle>
                                            <CardDescription>{t('classroomPulse.description')}</CardDescription>
                                        </div>
                                        <Button onClick={handleGeneratePulse} disabled={isLoadingPulse}>
                                            {isLoadingPulse ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                                            {t('classroomPulse.button')}
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {isLoadingPulse ? (
                                        <Skeleton className="h-40 w-full" />
                                    ) : classroomPulse ? (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Alert variant="default" className="border-green-300 bg-green-50">
                                                <AlertTitle className="font-semibold text-green-800">{t('classroomPulse.strengths')}</AlertTitle>
                                                <AlertDescription>
                                                    <ul className="list-disc pl-5 space-y-2 mt-2 text-green-700">
                                                        {classroomPulse.strengths.map((item, index) => (
                                                            <li key={index}>
                                                                {item.description} <span className="font-semibold">({item.mbeCriterion})</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AlertDescription>
                                            </Alert>
                                             <Alert variant="destructive" className="border-amber-300 bg-amber-50">
                                                <AlertTitle className="font-semibold text-amber-800">{t('classroomPulse.challenges')}</AlertTitle>
                                                <AlertDescription>
                                                     <ul className="list-disc pl-5 space-y-2 mt-2 text-amber-700">
                                                        {classroomPulse.challenges.map((item, index) => (
                                                            <li key={index}>
                                                                {item.description} <span className="font-semibold">({item.mbeCriterion})</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AlertDescription>
                                            </Alert>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                            <p>{t('classroomPulse.noData')}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="domainA" className="mt-6">
                           <Tabs defaultValue="planning-copilot" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="planning-copilot">{t('planningCopilot.title')}</TabsTrigger>
                                </TabsList>
                                <TabsContent value="planning-copilot" className="mt-6">
                                    <ClassPlanningTab hooks={hooks} />
                                </TabsContent>
                            </Tabs>
                        </TabsContent>
                        
                        <TabsContent value="domainB" className="mt-6">
                           <Tabs defaultValue="climate-simulator" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="climate-simulator">{t('classroomClimate.title')}</TabsTrigger>
                                </TabsList>
                                <TabsContent value="climate-simulator" className="mt-6">
                                     <ClassroomClimateTab hooks={hooks} />
                                </TabsContent>
                           </Tabs>
                        </TabsContent>

                        <TabsContent value="domainC" className="mt-6">
                            <Tabs defaultValue="question-analysis" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="question-analysis">{t('questionAnalysis.title')}</TabsTrigger>
                                    <TabsTrigger value="audio-analysis">{t('audioAnalysis.title')}</TabsTrigger>
                                </TabsList>
                                <TabsContent value="question-analysis" className="mt-6">
                                    <TeachingStrategiesTab hooks={hooks} />
                                </TabsContent>
                                <TabsContent value="audio-analysis" className="mt-6">
                                    <TeachingStrategiesTab hooks={hooks} />
                                </TabsContent>
                            </Tabs>
                        </TabsContent>

                        <TabsContent value="domainD" className="mt-6">
                             <Tabs defaultValue="reflection-assistant" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="reflection-assistant">{t('reflectionAssistant.title')}</TabsTrigger>
                                    <TabsTrigger value="mbe-expert">{t('tabs.mbeExpert')}</TabsTrigger>
                                </TabsList>
                                <TabsContent value="reflection-assistant" className="mt-6">
                                    <ProfessionalDevelopmentTab hooks={hooks} />
                                </TabsContent>
                                <TabsContent value="mbe-expert" className="mt-6">
                                    <MbeExpertTab hooks={hooks} />
                                </TabsContent>
                            </Tabs>
                        </TabsContent>

                    </Tabs>
                </div>
            </main>
        </DashboardLayout>
    );
}

export default withAuth(TeacherLabPage, ['teacher']);
