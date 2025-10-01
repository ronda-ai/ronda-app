
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Users,
    User,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudentSelector } from './_hooks/useStudentSelector';
import { useRelationshipRemediation } from './_hooks/useRelationshipRemediation';
import StrategyGenerator from './_components/StrategyGenerator';
import StrategyHistory from './_components/StrategyHistory';
import StrategyDetailsDialog from './_components/StrategyDetailsDialog';
import StepEvaluationDialog from '@/components/StepEvaluationDialog';
import { RemediationStepStatus } from '@/modules/relationship-remediation/application/dtos/relationship-remediation.dto';
import IndividualStrategyDetailsDialog from './_components/IndividualStrategyDetailsDialog';

function RelationshipDynamicsPage() {
  const t = useScopedI18n('coach.relationshipLab');
  const tRelations = useScopedI18n('relations');
  const locale = useCurrentLocale();

  const {
    allStudents,
    isLoadingStudents,
    selectedStudents,
    setSelectedStudents,
    generateSuggestionMutation,
    studentOptions,
    selectedStudentOptions,
  } = useStudentSelector();

  const {
    history,
    isLoadingHistory,
    individualHistory,
    isLoadingIndividualHistory,
    focus,
    setFocus,
    customPrompt,
    setCustomPrompt,
    evaluationState,
    handleEvaluationChange,
    handleUpdateRemediation,
    updateRemediationMutation,
    updateIndividualStrategyMutation,
    generateRemediationMutation,
    generateIndividualStrategyMutation,
    handleSubmit,
    selectedRemediation,
    setSelectedRemediation,
    selectedIndividualStrategy,
    setSelectedIndividualStrategy,
    evaluatingStep,
    setEvaluatingStep,
    handleSaveStepEvaluation,
    updateStepDetailsMutation,
    updateIndividualStepDetailsMutation,
    adjustPrompt,
    setAdjustPrompt,
    isAdjusting,
    setIsAdjusting,
    handleAdjustStrategy,
    strategyToDelete,
    setStrategyToDelete,
    deleteIndividualStrategyMutation,
    deletingStrategyId,
    remediationToDelete,
    setRemediationToDelete,
    deleteRemediationMutation,
    deletingRemediationId,
    isIndividualMode,
    adjustIndividualStrategyMutation,
  } = useRelationshipRemediation(allStudents, selectedStudents, locale);


  const [activeTab, setActiveTab] = React.useState('multi-student');

  React.useEffect(() => {
    // Clear form and selection when switching tabs
    setSelectedStudents([]);
    setFocus('');
    setCustomPrompt('');
  }, [activeTab, setSelectedStudents, setFocus, setCustomPrompt]);


  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <Tabs defaultValue="multi-student" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="multi-student"><Users className="mr-2 h-4 w-4"/>{t('tabs.multiStudent')}</TabsTrigger>
            <TabsTrigger value="single-student"><User className="mr-2 h-4 w-4"/>{t('tabs.singleStudent')}</TabsTrigger>
          </TabsList>
          
          <div className="max-w-7xl mx-auto mt-6">
              <TabsContent value="multi-student">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-3">
                        <StrategyGenerator
                            isIndividualMode={false}
                            isLoadingStudents={isLoadingStudents}
                            selectedStudents={selectedStudents}
                            setSelectedStudents={setSelectedStudents}
                            studentOptions={studentOptions}
                            selectedStudentOptions={selectedStudentOptions}
                            focus={focus}
                            setFocus={setFocus}
                            customPrompt={customPrompt}
                            setCustomPrompt={setCustomPrompt}
                            handleSubmit={handleSubmit}
                            generateSuggestionMutation={generateSuggestionMutation}
                            generateMutation={generateRemediationMutation}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <StrategyHistory 
                            isIndividualMode={false}
                            selectedStudents={selectedStudents}
                            isLoadingHistory={isLoadingHistory}
                            isLoadingIndividualHistory={isLoadingIndividualHistory}
                            history={history}
                            individualHistory={individualHistory}
                            setSelectedRemediation={setSelectedRemediation}
                            setEvaluatingStep={setEvaluatingStep}
                            evaluationState={evaluationState}
                            handleEvaluationChange={handleEvaluationChange}
                            handleUpdateRemediation={handleUpdateRemediation}
                            updateRemediationMutation={updateRemediationMutation}
                            remediationToDelete={remediationToDelete}
                            setRemediationToDelete={setRemediationToDelete}
                            deleteRemediationMutation={deleteRemediationMutation as any}
                            deletingRemediationId={deletingRemediationId}
                        />
                    </div>
                </div>
              </TabsContent>

              <TabsContent value="single-student">
                 <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                      <div className="md:col-span-3">
                          <StrategyGenerator
                              isIndividualMode={true}
                              isLoadingStudents={isLoadingStudents}
                              selectedStudents={selectedStudents}
                              setSelectedStudents={setSelectedStudents}
                              studentOptions={studentOptions}
                              selectedStudentOptions={selectedStudentOptions}
                              focus={focus}
                              setFocus={setFocus}
                              customPrompt={customPrompt}
                              setCustomPrompt={setCustomPrompt}
                              handleSubmit={handleSubmit}
                              generateSuggestionMutation={generateSuggestionMutation}
                              generateMutation={generateIndividualStrategyMutation}
                          />
                      </div>
                      <div className="md:col-span-2">
                          <StrategyHistory 
                              isIndividualMode={true}
                              selectedStudents={selectedStudents}
                              isLoadingHistory={isLoadingHistory}
                              isLoadingIndividualHistory={isLoadingIndividualHistory}
                              history={history}
                              individualHistory={individualHistory}
                              setStrategyToDelete={setStrategyToDelete}
                              strategyToDelete={strategyToDelete}
                              setSelectedIndividualStrategy={setSelectedIndividualStrategy}
                              deleteIndividualStrategyMutation={deleteIndividualStrategyMutation}
                              setEvaluatingStep={setEvaluatingStep}
                              evaluationState={evaluationState}
                              handleEvaluationChange={handleEvaluationChange}
                              handleUpdateRemediation={handleUpdateRemediation}
                              updateIndividualStrategyMutation={updateIndividualStrategyMutation}
                              deletingStrategyId={deletingStrategyId}
                          />
                      </div>
                  </div>
              </TabsContent>
          </div>
        </Tabs>
      </main>

      <StrategyDetailsDialog
        selectedRemediation={selectedRemediation}
        setSelectedRemediation={setSelectedRemediation}
        adjustPrompt={adjustPrompt}
        setAdjustPrompt={setAdjustPrompt}
        isAdjusting={isAdjusting}
        handleAdjustStrategy={handleAdjustStrategy}
        setEvaluatingStep={setEvaluatingStep}
      />
      
      <IndividualStrategyDetailsDialog
        selectedStrategy={selectedIndividualStrategy}
        setSelectedStrategy={setSelectedIndividualStrategy}
        adjustPrompt={adjustPrompt}
        setAdjustPrompt={setAdjustPrompt}
        isAdjusting={adjustIndividualStrategyMutation.isPending}
        handleAdjustStrategy={() => {
            if (selectedIndividualStrategy) {
                setIsAdjusting(true);
                adjustIndividualStrategyMutation.mutate({
                    existingStrategy: selectedIndividualStrategy,
                    customPrompt: adjustPrompt
                })
            }
        }}
        setEvaluatingStep={setEvaluatingStep}
      />
      
      <StepEvaluationDialog
        isOpen={!!evaluatingStep}
        onClose={() => setEvaluatingStep(null)}
        onSave={(status, feedback) => handleSaveStepEvaluation(status as RemediationStepStatus, feedback)}
        isSaving={updateStepDetailsMutation.isPending || updateIndividualStepDetailsMutation.isPending}
        evaluationData={evaluatingStep as any}
        isIndividualMode={isIndividualMode}
      />
    </DashboardLayout>
  );
}

export default withAuth(RelationshipDynamicsPage, ['teacher']);
