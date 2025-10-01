
'use client';

import React from 'react';
import StudentList from '@/components/StudentList';
import ClassroomWheel from '@/components/ClassroomWheel';
import SelectionDialog from '@/components/SelectionDialog';
import StudentSelectionDialog from '@/components/StudentSelectionDialog';
import Confetti from '@/components/Confetti';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { useStudentData } from './_hooks/useStudentData';
import { useClassroomWheel } from './_hooks/useClassroomWheel';

function HomePage() {
  const {
    students,
    isLoadingStudents,
    addStudent,
    removeStudent,
    updateStudentMutation,
    updateParticipation,
  } = useStudentData();

  const {
    mode,
    setMode,
    isSpinning,
    isStudentSelectionOpen,
    selection,
    acceptChallengeMutation,
    generateChallengeMutation,
    handleSpin,
    handleOpenSelect,
    handleManualSelection,
    handleDialogClose,
    handleRetryChallenge,
    handleAcceptChallenge,
    handleRejectChallenge,
    rejectChallengeMutation
  } = useClassroomWheel(students);

  const availableStudents = students.filter(s => !s.isAbsent);

  return (
    <DashboardLayout
      sidebarContent={
        <StudentList
          students={students}
          isLoading={isLoadingStudents}
          onRemoveStudent={removeStudent}
          onUpdateParticipation={({ id, change }) =>
            updateParticipation.mutate({ id, change })
          }
          onUpdateStudent={(id, data) =>
            updateStudentMutation.mutate({ id, data })
          }
          updateStudentMutation={updateStudentMutation}
        />
      }
    >
      <Confetti />
      <div className="container mx-auto flex items-center justify-center flex-1">
        <ClassroomWheel
          students={availableStudents}
          mode={mode}
          onModeChange={setMode}
          isSpinning={isSpinning}
          onSpin={handleSpin}
          onSelect={handleOpenSelect}
        />
      </div>

      <SelectionDialog
        isOpen={!!selection}
        onClose={handleDialogClose}
        selection={selection}
        onRetry={handleRetryChallenge}
        onAccept={handleAcceptChallenge}
        onReject={handleRejectChallenge}
        isAccepting={acceptChallengeMutation.isPending}
        isRetrying={generateChallengeMutation.isPending}
        isRejecting={rejectChallengeMutation.isPending}
      />
      <StudentSelectionDialog
        isOpen={isStudentSelectionOpen}
        onClose={() => handleDialogClose()}
        students={availableStudents}
        onSelect={handleManualSelection}
        selectionLimit={
          mode === 'personalized-multiple' ? 3 : mode === 'pair' ? 2 : 1
        }
      />
    </DashboardLayout>
  );
}

export default withAuth(HomePage, ['teacher']);
