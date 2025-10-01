

'use client';

import React from 'react';
import {
  Swords,
  BookHeart,
  Zap,
  Scale,
} from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RiddleBattleTab from './_components/RiddleBattleTab';
import LightningRoundTab from './_components/LightningRoundTab';
import CollaborativeStoryTab from './_components/CollaborativeStoryTab';
import DebateGeneratorTab from './_components/DebateGeneratorTab';


function PlaygroundPage() {
  const t = useScopedI18n('playground');

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
            <Tabs defaultValue="riddle-battle" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="riddle-battle">
                        <Swords className="mr-2" />
                        {t('riddleBattle.title')}
                    </TabsTrigger>
                     <TabsTrigger value="debate-generator">
                        <Scale className="mr-2" />
                        {t('debateGenerator.title')}
                    </TabsTrigger>
                    <TabsTrigger value="lightning-round">
                        <Zap className="mr-2" />
                        {t('lightningRound.title')}
                    </TabsTrigger>
                    <TabsTrigger value="collaborative-story">
                        <BookHeart className="mr-2" />
                        {t('collaborativeStory.title')}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="riddle-battle" className="mt-6">
                    <RiddleBattleTab />
                </TabsContent>
                
                 <TabsContent value="debate-generator" className="mt-6">
                    <DebateGeneratorTab />
                </TabsContent>

                <TabsContent value="lightning-round" className="mt-6">
                     <LightningRoundTab />
                </TabsContent>

                <TabsContent value="collaborative-story" className="mt-6">
                    <CollaborativeStoryTab />
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default withAuth(PlaygroundPage, ['teacher']);

    
