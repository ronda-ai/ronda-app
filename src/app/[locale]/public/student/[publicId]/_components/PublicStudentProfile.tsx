
'use client';

import React, { useState } from 'react';
import { usePublicStudentProfile } from '../_hooks/usePublicStudentProfile';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Palette, ListOrdered, BookOpenCheck, Activity, Heart } from 'lucide-react';
import PublicLayout from '@/components/PublicLayout';
import MoreThemesDialog from '@/app/[locale]/classroom/_components/MoreThemesDialog';
import { Button } from '@/components/ui/button';
import { themes } from '@/config/themes';
import QualitiesCard from './QualitiesCard';
import RelationsCard from './RelationsCard';
import DetailsCard from './DetailsCard';
import HistorySection from './HistorySection';

import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { ChallengeHistoryDTO } from '@/modules/challenge/application/dtos/challenge-history.dto';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChallengeHistoryCard from './ChallengeHistoryCard';

const PublicStudentProfile = ({ publicId }: { publicId: string }) => {
    const { student, isLoading, error, isThemeGalleryOpen, setIsThemeGalleryOpen, handleThemeSelection } = usePublicStudentProfile(publicId);
    const t = useScopedI18n('publicProfile');
    const tClassroom = useScopedI18n('classroom.theme');
    const locale = useCurrentLocale();

    if (isLoading) {
        return (
            <PublicLayout>
                <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
                    <Skeleton className="h-40 w-full" />
                    <div className="mt-8 space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </PublicLayout>
        );
    }

    if (error || !student) {
        return (
            <PublicLayout>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-destructive">Error</h2>
                    <p className="text-muted-foreground">{t('error')}</p>
                </div>
            </PublicLayout>
        );
    }
    
    return (
        <PublicLayout>
            <div className="w-full max-w-6xl mx-auto">
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Avatar className="h-24 w-24 text-4xl">
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center md:text-left">
                                <CardTitle className="text-4xl font-bold text-card-foreground">{student.name}</CardTitle>
                                <CardDescription className="text-lg text-muted-foreground mt-1">{t('tagline')}</CardDescription>
                            </div>
                            <Button variant="outline" onClick={() => setIsThemeGalleryOpen(true)}>
                                <Palette className="mr-2 h-4 w-4" />
                                {tClassroom('title')}
                            </Button>
                        </div>
                    </CardHeader>
                </Card>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <QualitiesCard student={student} />
                    <RelationsCard student={student} />
                </div>

                <DetailsCard student={student} />

                 <Tabs defaultValue="challengeHistory" className="mt-8">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                        <TabsTrigger value="challengeHistory" className="break-words">{t('challengeHistory')}</TabsTrigger>
                        <TabsTrigger value="supportPlans" className="break-words">{t('supportPlans')}</TabsTrigger>
                        <TabsTrigger value="observations" className="break-words">{t('observations')}</TabsTrigger>
                        <TabsTrigger value="personalizedActivities" className="break-words">{t('personalizedActivities')}</TabsTrigger>
                        <TabsTrigger value="fearManagement" className="break-words">{t('fearManagementSuggestions')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="challengeHistory">
                         <HistorySection<ChallengeHistoryDTO>
                            title={t('challengeHistory')}
                            icon={ListOrdered}
                            items={student.challengeHistory}
                            noItemsMessage={t('noData')}
                            renderItem={(item) => (
                                <ChallengeHistoryCard challengeItem={item} />
                            )}
                        />
                    </TabsContent>
                     <TabsContent value="supportPlans">
                        <HistorySection
                            title={t('supportPlans')}
                            icon={BookOpenCheck}
                            items={student.supportPlans}
                            noItemsMessage={t('noData')}
                            renderItem={(plan) => (
                                <div className="p-4 border rounded-md bg-blue-50/50">
                                    <p className="text-xs text-blue-600 mb-2">Plan from {format(new Date(plan.createdAt), 'PP', { locale: locale === 'es' ? es : undefined })}</p>
                                    <ul className="space-y-2 list-disc list-inside">
                                        {plan.steps.map((step, i) => <li key={i} className="text-blue-800">{step.text}</li>)}
                                    </ul>
                                    {plan.teacherFeedback && <p className="text-sm italic text-blue-700 mt-3 pt-3 border-t">"{plan.teacherFeedback}"</p>}
                                </div>
                            )}
                        />
                    </TabsContent>
                    <TabsContent value="observations">
                        <HistorySection
                            title={t('observations')}
                            icon={ListOrdered}
                            items={student.observations}
                            noItemsMessage={t('noData')}
                            renderItem={(obs) => (
                                <div className="p-3 border rounded-md bg-gray-50 text-gray-700">{obs.observation}</div>
                            )}
                        />
                    </TabsContent>
                    <TabsContent value="personalizedActivities">
                         <HistorySection
                            title={t('personalizedActivities')}
                            icon={Activity}
                            items={student.personalizedActivities}
                            noItemsMessage={t('noData')}
                            renderItem={(activity) => (
                               <div className="p-4 border rounded-md bg-green-50/50">
                                    <p className="font-semibold text-green-800">{activity.topic}</p>
                                    <ul className="mt-2 space-y-1 list-disc list-inside">
                                        {activity.activities.map((step, i) => <li key={i} className="text-green-700">{step.title}</li>)}
                                    </ul>
                                </div>
                            )}
                        />
                    </TabsContent>
                    <TabsContent value="fearManagement">
                        <HistorySection
                            title={t('fearManagementSuggestions')}
                            icon={Heart}
                            items={student.fearManagementSuggestions}
                            noItemsMessage={t('noData')}
                            renderItem={(sugg) => (
                                <div className="p-4 border rounded-md bg-yellow-50/50 text-yellow-800">
                                    <p className="font-semibold">{sugg.title}</p>
                                    <p className="text-sm italic mt-1">"{sugg.rationale}"</p>
                                </div>
                            )}
                        />
                    </TabsContent>
                </Tabs>
            </div>
            <MoreThemesDialog
                isOpen={isThemeGalleryOpen}
                onClose={() => setIsThemeGalleryOpen(false)}
                onSelectTheme={handleThemeSelection}
                currentThemeName={student.publicTheme}
                themes={themes}
            />
        </PublicLayout>
    );
}
export default PublicStudentProfile;
