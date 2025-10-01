
'use client';

import React from 'react';
import {
  MessageCircleHeart,
  ShieldAlert,
  FileText,
} from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import DashboardLayout from '@/components/DashboardLayout';
import withAuth from '@/components/withAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DigitalCitizenshipActivitiesTab from './_components/DigitalCitizenshipActivitiesTab';
import DigitalConflictSimulationTab from './_components/DigitalConflictSimulationTab';
import DigitalPactTab from './_components/DigitalPactTab';


function DigitalConvivialityPage() {
    const t = useScopedI18n('playground.digitalConviviality');

    return (
        <DashboardLayout>
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <Tabs defaultValue="activities" className="h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="activities">
                                <MessageCircleHeart className="mr-2 h-4 w-4" />
                                {t('activities.title')}
                            </TabsTrigger>
                            <TabsTrigger value="simulations">
                                <ShieldAlert className="mr-2 h-4 w-4" />
                                {t('conflictSimulation.title')}
                            </TabsTrigger>
                            <TabsTrigger value="pacts">
                                <FileText className="mr-2 h-4 w-4" />
                                {t('pact.title')}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="activities" className="mt-6">
                            <DigitalCitizenshipActivitiesTab />
                        </TabsContent>
                        
                        <TabsContent value="simulations" className="mt-6">
                            <DigitalConflictSimulationTab />
                        </TabsContent>

                        <TabsContent value="pacts" className="mt-6">
                            <DigitalPactTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default withAuth(DigitalConvivialityPage, ['teacher']);
