
'use client';

import React from 'react';
import { Shield, FileText, Bot, ShieldQuestion, Users, Group } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEducationalSafety } from './_hooks/useEducationalSafety';
import RiskDiagnosticTab from './_components/RiskDiagnosticTab';
import ProtocolGeneratorTab from './_components/ProtocolGeneratorTab';
import CrisisSimulationTab from './_components/CrisisSimulationTab';
import SafetyCommitteesTab from './_components/SafetyCommitteesTab';
import BrigadeFormationTab from './_components/BrigadeFormationTab';

function SafetyLabPage() {
  const t = useScopedI18n('safetyLab');
  const hooks = useEducationalSafety();

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
           <Tabs defaultValue="diagnosis" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="diagnosis">
                  <ShieldQuestion className="mr-2 h-4 w-4" />
                  {t('tabs.diagnosis')}
                </TabsTrigger>
                <TabsTrigger value="protocols">
                  <FileText className="mr-2 h-4 w-4" />
                  {t('tabs.protocols')}
                </TabsTrigger>
                 <TabsTrigger value="simulations">
                  <Bot className="mr-2 h-4 w-4" />
                  {t('tabs.simulations')}
                </TabsTrigger>
                 <TabsTrigger value="brigade-formation">
                  <Group className="mr-2 h-4 w-4" />
                  {t('tabs.brigadeFormation')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diagnosis" className="mt-6">
                <RiskDiagnosticTab hooks={hooks} />
              </TabsContent>

              <TabsContent value="protocols" className="mt-6">
                <ProtocolGeneratorTab hooks={hooks} />
              </TabsContent>

              <TabsContent value="simulations" className="mt-6">
                <CrisisSimulationTab hooks={hooks} />
              </TabsContent>
              
               <TabsContent value="brigade-formation" className="mt-6 space-y-8">
                <BrigadeFormationTab hooks={hooks} />
                <SafetyCommitteesTab hooks={hooks} />
              </TabsContent>
            </Tabs>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default withAuth(SafetyLabPage, ['teacher']);

    