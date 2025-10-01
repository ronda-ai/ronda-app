
'use client';

import React from 'react';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { usePbl } from './_hooks/usePbl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectPlanner from './_components/ProjectPlanner';
import TeamFormer from './_components/TeamFormer';
import ScaffoldingGenerator from './_components/ScaffoldingGenerator';
import { useScopedI18n } from '@/locales/client';
import ProjectEvaluator from './_components/ProjectEvaluator';

function PblPage() {
  const tPbl = useScopedI18n('pbl');
  const hooks = usePbl();
  const { projectHistory } = hooks;

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <Tabs defaultValue="phase1" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="phase1">{tPbl('tabs.phase1')}</TabsTrigger>
            <TabsTrigger value="phase2" disabled={projectHistory.length === 0}>{tPbl('tabs.phase2')}</TabsTrigger>
            <TabsTrigger value="phase3">{tPbl('tabs.phase3')}</TabsTrigger>
            <TabsTrigger value="phase4" disabled={projectHistory.length === 0}>{tPbl('tabs.phase4')}</TabsTrigger>
          </TabsList>

          <TabsContent value="phase1" className="mt-6">
            <ProjectPlanner hooks={hooks} />
          </TabsContent>

          <TabsContent value="phase2" className="mt-6">
            <TeamFormer hooks={hooks} />
          </TabsContent>
          
          <TabsContent value="phase3" className="mt-6">
            <ScaffoldingGenerator hooks={hooks} />
          </TabsContent>

          <TabsContent value="phase4" className="mt-6">
            <ProjectEvaluator hooks={hooks} />
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
}

export default withAuth(PblPage, ['teacher']);
