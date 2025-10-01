
'use client';

import React from 'react';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { useIndividualActivities } from './_hooks/useIndividualActivities';
import StudentSelector from './_components/StudentSelector';
import ActivityGenerator from './_components/ActivityGenerator';
import ActivityHistory from './_components/ActivityHistory';
import StepEvaluationDialog from '@/components/StepEvaluationDialog';
import { PersonalizedActivityStepStatus } from '@/modules/personalized-activity/application/dtos/personalized-activity.dto';
import ResourceDemocratizerDialog from '@/components/ResourceDemocratizerDialog';
import AddSkillDialog from '@/components/AddSkillDialog';
import EditSkillDialog from '@/components/EditSkillDialog';

function IndividualActivitiesPage() {
  const hooks = useIndividualActivities();
  const { 
    selectedStudentId,
    evaluatingStep, 
    setEvaluatingStep, 
    handleSaveStepEvaluation,
    updateStepDetailsMutation,
    isAddSkillDialogOpen,
    setIsAddSkillDialogOpen,
    editingSkill,
    setEditingSkill,
    availableSkills,
    adaptingPlan,
    setAdaptingPlan
  } = hooks;

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
            <StudentSelector
                students={hooks.students}
                isLoadingStudents={hooks.isLoadingStudents}
                selectedStudentId={hooks.selectedStudentId}
                handleSelectStudent={hooks.handleSelectStudent}
            />

            {selectedStudentId && (
                <>
                    <ActivityGenerator hooks={hooks} />
                    <ActivityHistory hooks={hooks} />
                </>
            )}
        </div>
      </main>

      <AddSkillDialog 
          isOpen={isAddSkillDialogOpen}
          onClose={() => setIsAddSkillDialogOpen(false)}
          existingSkills={availableSkills.map(s => s.name)}
      />
      <EditSkillDialog
          isOpen={!!editingSkill}
          onClose={() => setEditingSkill(null)}
          skill={editingSkill}
      />
      <StepEvaluationDialog
        isOpen={!!evaluatingStep}
        onClose={() => setEvaluatingStep(null)}
        onSave={(status, feedback) => handleSaveStepEvaluation(status as PersonalizedActivityStepStatus, feedback)}
        isSaving={updateStepDetailsMutation.isPending}
        evaluationData={evaluatingStep as any}
        isPersonalizedActivity={true}
      />
      <ResourceDemocratizerDialog
        isOpen={!!adaptingPlan}
        onClose={() => setAdaptingPlan(null)}
        activityPlan={adaptingPlan}
      />
    </DashboardLayout>
  );
}

export default withAuth(IndividualActivitiesPage, ['teacher']);
