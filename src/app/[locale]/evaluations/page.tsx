
'use client';

import React from 'react';
import {
  ClipboardCheck,
  Star,
  Sparkles,
  UserCheck,
  Inbox,
  Smile,
  Frown,
  Meh,
  Rocket,
  Drama,
  Bot,
  Ban,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {useScopedI18n} from '@/locales/client';
import EvaluationDialog from '@/components/EvaluationDialog';
import {Badge} from '@/components/ui/badge';
import withAuth from '@/components/withAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { useEvaluations, EvaluatingChallenge } from './_hooks/useEvaluations';

function EvaluationsPage() {
  const tEvaluations = useScopedI18n('evaluations');
  const tRatings = useScopedI18n('evaluations.ratings');
  const tMoods = useScopedI18n('evaluations.moods');

  const {
      isLoadingStudents,
      isLoadingChallenges,
      evaluatingChallenge,
      setEvaluatingChallenge,
      evaluateChallengeMutation,
      handleOpenDialog,
      handleSaveEvaluation,
      studentChallengeMap,
      studentsWithChallenges,
      currentPageByStudent,
      handlePageChange,
      EVALUATIONS_PER_PAGE,
  } = useEvaluations();

  const ratingMap: {
    [key: string]: {icon: React.ElementType; color: string; label: string};
  } = {
    'needs-support': {
      icon: UserCheck,
      color: 'text-red-600',
      label: tRatings('needsSupport'),
    },
    'met-expectations': {
      icon: Sparkles,
      color: 'text-yellow-600',
      label: tRatings('metExpectations'),
    },
    'exceeded-expectations': {
      icon: Star,
      color: 'text-green-600',
      label: tRatings('exceededExpectations'),
    },
  };

  const moodMap: {
    [key: string]: {icon: React.ElementType; color: string; label: string};
  } = {
    enthusiastic: {
      icon: Rocket,
      color: 'text-orange-600',
      label: tMoods('enthusiastic'),
    },
    focused: {icon: Bot, color: 'text-blue-600', label: tMoods('focused')},
    nervous: {icon: Drama, color: 'text-purple-600', label: tMoods('nervous')},
    frustrated: {
      icon: Frown,
      color: 'text-red-600',
      label: tMoods('frustrated'),
    },
    happy: {icon: Smile, color: 'text-green-600', label: tMoods('happy')},
    tired: {icon: Meh, color: 'text-gray-600', label: tMoods('tired')},
  };

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {isLoadingStudents || isLoadingChallenges ? (
              <div className="space-y-6">
                <Skeleton className='h-24 w-full' />
                <Skeleton className='h-24 w-full' />
              </div>
        ): studentsWithChallenges.length > 0 ? (
          <div className="space-y-6">
            {studentsWithChallenges.map(student => {
                const currentPage = currentPageByStudent[student.id] || 0;
                const studentChallenges = studentChallengeMap[student.id] || [];
                const totalPages = Math.ceil(studentChallenges.length / EVALUATIONS_PER_PAGE);
                const paginatedChallenges = studentChallenges.slice(
                    currentPage * EVALUATIONS_PER_PAGE,
                    (currentPage + 1) * EVALUATIONS_PER_PAGE
                );

                return (
                  <div key={student.id} className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <div className="mt-4 space-y-3">
                      {paginatedChallenges.map((item) => {
                        const ratingInfo = item.rating
                          ? ratingMap[item.rating]
                          : null;
                        const IconComponent = ratingInfo ? ratingInfo.icon : null;
                        const moodInfo = item.mood ? moodMap[item.mood] : null;
                        const MoodIconComponent = moodInfo ? moodInfo.icon : null;

                        return (
                          <div
                            key={item.id}
                            className="flex justify-between items-start bg-gray-50 p-3 rounded-md"
                          >
                            <div className="flex-1">
                              <p className="font-semibold">{`"${item.challenge.challenge}"`}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Tip: {`"${item.challenge.tip}"`}
                              </p>
                              {item.status === 'evaluated' && (
                                <div className="mt-3 bg-white p-3 rounded-md border">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {ratingInfo && IconComponent && (
                                      <Badge
                                        variant="outline"
                                        className={ratingInfo.color}
                                      >
                                        <IconComponent className="h-3 w-3 mr-1" />
                                        {ratingInfo.label}
                                      </Badge>
                                    )}
                                    {moodInfo && MoodIconComponent && (
                                      <Badge
                                        variant="outline"
                                        className={moodInfo.color}
                                      >
                                        <MoodIconComponent className="h-3 w-3 mr-1" />
                                        {moodInfo.label}
                                      </Badge>
                                    )}
                                  </div>
                                  {item.feedback && (
                                    <p className="text-sm text-gray-700 mt-2 italic">
                                      {`"${item.feedback}"`}
                                    </p>
                                  )}
                                </div>
                              )}
                              {item.status === 'rejected' && (
                                <div className="mt-3 bg-red-50 p-3 rounded-md border border-red-200">
                                    <Badge variant="destructive">
                                        <Ban className="h-3 w-3 mr-1" />
                                        {tEvaluations('rejectedStatus')}
                                    </Badge>
                                    {item.feedback && (
                                        <p className="text-sm text-red-700 mt-2 italic">
                                        {`"${item.feedback}"`}
                                        </p>
                                    )}
                                 </div>
                              )}
                            </div>
                            <div className="ml-4">
                              {item.status === 'pending' ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleOpenDialog(item)
                                  }
                                >
                                  {tEvaluations('evaluateButton')}
                                </Button>
                              ) : (
                                <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                                  <ClipboardCheck className="w-4 h-4" />
                                  {tEvaluations('evaluatedStatus')}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-end mt-4">
                          <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(student.id, currentPage - 1)}
                              disabled={currentPage === 0}
                          >
                              <ChevronLeft className="h-4 w-4" />
                              {tEvaluations('pagination.previous')}
                          </Button>
                          <span className="text-sm text-muted-foreground mx-4">
                              {tEvaluations('pagination.page', { currentPage: currentPage + 1, totalPages })}
                          </span>
                          <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(student.id, currentPage + 1)}
                              disabled={currentPage >= totalPages - 1}
                          >
                              {tEvaluations('pagination.next')}
                              <ChevronRight className="h-4 w-4" />
                          </Button>
                      </div>
                    )}
                  </div>
                )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Inbox className="w-16 h-16 mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold">
              {tEvaluations('noEvaluations.title')}
            </h3>
            <p>{tEvaluations('noEvaluations.description')}</p>
          </div>
        )}
      </main>
      <EvaluationDialog
        isOpen={!!evaluatingChallenge}
        onClose={() => setEvaluatingChallenge(null)}
        onSave={handleSaveEvaluation}
        isSaving={evaluateChallengeMutation.isPending}
        evaluationData={evaluatingChallenge}
      />
    </DashboardLayout>
  );
}

export default withAuth(EvaluationsPage, ['teacher']);
