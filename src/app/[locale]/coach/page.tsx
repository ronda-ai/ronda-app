
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  User,
  Users,
  UserSearch,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { useStudentData } from '../_hooks/useStudentData';
import { useStudentDetails } from './_hooks/useStudentDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CoachStudentSelector from './_components/CoachStudentSelector';
import CoachSuggestionTab from './_components/CoachSuggestionTab';
import SupportPlanTab from './_components/SupportPlanTab';
import FearManagementTab from './_components/FearManagementTab';
import ConcernAnalysisTab from './_components/ConcernAnalysisTab';
import QualitiesSuggestionTab from './_components/QualitiesSuggestionTab';
import MoodAnalysisTab from './_components/MoodAnalysisTab';
import { Separator } from '@/components/ui/separator';
import FearManagementDialog from '@/components/FearManagementDialog';
import { useFearManagement } from './_hooks/useFearManagement';


function CoachPage() {
  const tCoach = useScopedI18n('coach');
  const tHome = useScopedI18n('home');
  const locale = useCurrentLocale();

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isStudentSelectorOpen, setIsStudentSelectorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('classroom');
  const [fearDialogState, setFearDialogState] = useState<{ isOpen: boolean; fear: string | null }>({ isOpen: false, fear: null });
  
  const { students, isLoadingStudents } = useStudentData();
  const selectedStudent = useMemo(() => students.find(s => s.id === selectedStudentId) || null, [students, selectedStudentId]);
  const { observations, challengeHistory } = useStudentDetails(selectedStudentId);
  const {
    fearManagementSuggestions,
    generateTargetedFearSuggestion,
  } = useFearManagement(selectedStudent, locale);


  const handleSelectStudent = (id: string | null) => {
    setSelectedStudentId(id);
    setIsStudentSelectorOpen(false);
  };
  
  const handleFearDialogChange = (isOpen: boolean, fear: string | null) => {
    setFearDialogState({ isOpen, fear });
  };
  
  const handleAnalysisDeleted = () => {
    // This function will be passed to the MoodAnalysisTab to refetch data after a deletion.
    // In a real app, you might trigger a refetch using queryClient.invalidateQueries.
    console.log("Analysis deleted, refetching data would happen here.");
  }

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-hidden p-4 md:p-8 relative">
        <Tabs defaultValue="classroom" onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="classroom"><Users className="mr-2 h-4 w-4" />{tCoach('tabs.classroom')}</TabsTrigger>
            <TabsTrigger value="individual"><User className="mr-2 h-4 w-4" />{tCoach('tabs.individual')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classroom" className="flex-1 overflow-y-auto mt-6">
            <div className="max-w-4xl mx-auto space-y-8">
              <MoodAnalysisTab selectedStudent={null} onAnalysisDeleted={handleAnalysisDeleted} />
            </div>
          </TabsContent>

          <TabsContent value="individual" className="flex-1 overflow-y-auto mt-6">
            {selectedStudent ? (
              <div className="space-y-8 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-2xl">{selectedStudent.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-3xl">{selectedStudent.name}</CardTitle>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedStudent.age && (
                              <Badge variant="outline">{selectedStudent.age} {tHome('yearsOld')}</Badge>
                            )}
                            {selectedStudent.qualities.length > 0 &&
                              selectedStudent.qualities.map((quality, i) => (
                                <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800">
                                  <Sparkles className="mr-1 h-3 w-3" />{quality}
                                </Badge>
                              ))}
                          </div>
                        </div>
                    </div>
                    {(selectedStudent.fears && selectedStudent.fears.length > 0 || selectedStudent.notes) && <Separator className="my-4"/>}
                     <CardContent className='p-0 pt-4 space-y-4'>
                       {selectedStudent.fears && selectedStudent.fears.length > 0 && (
                             <div className="flex flex-wrap gap-2 items-center">
                                <ShieldAlert className="h-4 w-4 text-destructive"/>
                                {selectedStudent.fears.map((fear, i) => (
                                    <Button key={i} variant="destructive" size="sm" className='opacity-80 h-auto' onClick={() => handleFearDialogChange(true, fear)}>
                                        {fear}
                                    </Button>
                                ))}
                            </div>
                        )}
                         {selectedStudent.notes && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Info className="h-4 w-4 mt-0.5 shrink-0"/>
                            <p className="italic">{`"${selectedStudent.notes}"`}</p>
                          </div>
                        )}
                    </CardContent>
                  </CardHeader>
                </Card>

                <Tabs defaultValue="coach-suggestion" className="w-full">
                   <TabsList className="flex flex-wrap h-auto justify-start">
                    <TabsTrigger value="coach-suggestion">{tCoach('coachSuggestion.title')}</TabsTrigger>
                    <TabsTrigger value="support-plan">{tCoach('supportPlan.title')}</TabsTrigger>
                    <TabsTrigger value="fear-management">{tCoach('fearManagement.title')}</TabsTrigger>
                    <TabsTrigger value="concern-analysis">{tCoach('concernAnalysis.title')}</TabsTrigger>
                    <TabsTrigger value="mood-analysis-student">{tCoach('moodAnalysis.title')}</TabsTrigger>
                    <TabsTrigger value="qualities-suggestion">{tCoach('qualitiesSuggestion.title')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="coach-suggestion" className="mt-6">
                    <CoachSuggestionTab selectedStudent={selectedStudent} allStudents={students} observations={observations} />
                  </TabsContent>
                  <TabsContent value="support-plan" className="mt-6">
                    <SupportPlanTab selectedStudent={selectedStudent} allStudents={students} observations={observations} challengeHistory={challengeHistory} />
                  </TabsContent>
                  <TabsContent value="fear-management" className="mt-6">
                    <FearManagementTab 
                        selectedStudent={selectedStudent}
                    />
                  </TabsContent>
                  <TabsContent value="concern-analysis" className="mt-6">
                    <ConcernAnalysisTab selectedStudent={selectedStudent} allStudents={students} observations={observations} challengeHistory={challengeHistory} />
                  </TabsContent>
                  <TabsContent value="mood-analysis-student" className="mt-6">
                    <MoodAnalysisTab selectedStudent={selectedStudent} onAnalysisDeleted={handleAnalysisDeleted} />
                  </TabsContent>
                  <TabsContent value="qualities-suggestion" className="mt-6">
                    <QualitiesSuggestionTab selectedStudent={selectedStudent} />
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <User className="w-16 h-16 mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold">{tCoach('noStudentSelected.title')}</h3>
                <p>{tCoach('noStudentSelected.description')}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {activeTab === 'individual' && (
          <div className="absolute bottom-8 right-8">
            <Button className="rounded-full w-16 h-16 shadow-lg" onClick={() => setIsStudentSelectorOpen(true)}>
              <UserSearch className="h-8 w-8" />
            </Button>
          </div>
        )}
      </div>
      
      <CoachStudentSelector
        isOpen={isStudentSelectorOpen}
        onClose={() => setIsStudentSelectorOpen(false)}
        students={students.filter(s => !s.isAbsent)}
        onSelectStudent={handleSelectStudent}
      />
      <FearManagementDialog
        isOpen={fearDialogState.isOpen}
        onClose={() => handleFearDialogChange(false, null)}
        student={selectedStudent}
        fear={fearDialogState.fear}
        suggestions={fearManagementSuggestions.filter(s => s.targetedFear === fearDialogState.fear)}
        onGenerateSuggestion={(fear) => generateTargetedFearSuggestion.mutate({ student: selectedStudent!, fear })}
        isGenerating={generateTargetedFearSuggestion.isPending}
      />
    </DashboardLayout>
  );
}

export default withAuth(CoachPage, ['teacher']);
