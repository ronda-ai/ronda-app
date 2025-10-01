

// src/services/bootstrap.ts

import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { bootstrapActivityAdaptationModule } from '@/modules/activity-adaptation/factories/activity-adaptation.bootstrap';
import { bootstrapActivitySuggestionModule } from '@/modules/activity-suggestion/factories/activity-suggestion.bootstrap';
import { bootstrapAIConfigurationModule } from '@/modules/ai-configuration/factories/ai-configuration.bootstrap';
import { bootstrapAnalyticsModule } from '@/modules/analytics/factories/analytics.bootstrap';
import { bootstrapAnonymizationModule } from '@/modules/anonymization/factories/anonymization.bootstrap';
import { bootstrapAttendanceModule} from '@/modules/attendance/factories/attendance.bootstrap';
import { bootstrapChallengeModule } from '@/modules/challenge/factories/challenge.bootstrap';
import { bootstrapCoachSuggestionModule } from '@/modules/coach-suggestion/factories/coach-suggestion.bootstrap';
import { bootstrapCollaborativeStoryModule } from '@/modules/collaborative-story/factories/collaborative-story.bootstrap';
import { bootstrapConcernAnalysisModule } from '@/modules/concern-analysis/factories/concern-analysis.bootstrap';
import { bootstrapCurriculumActivityModule } from '@/modules/curriculum-activity/factories/curriculum-activity.bootstrap';
import { bootstrapDebateModule } from '@/modules/debate/factories/debate.bootstrap';
import { bootstrapDigitalConvivialityModule } from '@/modules/digital-conviviality/factories/digital-conviviality.bootstrap';
import { bootstrapEducationalSafetyModule } from '@/modules/educational-safety/factories/educational-safety.bootstrap';
import { bootstrapEvaluationModule } from '@/modules/evaluation/factories/evaluation.bootstrap';
import { bootstrapExportModule } from '@/modules/export/factories/export.bootstrap';
import { bootstrapExpertAdviceModule } from '@/modules/expert-advice/factories/expert-advice.bootstrap';
import { bootstrapFearManagementSuggestionModule } from '@/modules/fear-management-suggestion/factories/fear-management-suggestion.bootstrap';
import { bootstrapFearUpdateSuggestionModule } from '@/modules/fear-update-suggestion/factories/fear-update-suggestion.bootstrap';
import { bootstrapFocusAreaModule } from '@/modules/focus-area/factories/focus-area.bootstrap';
import { bootstrapGroupActivitySuggestionModule } from '@/modules/group-activity-suggestion/factories/group-activity-suggestion.bootstrap';
import { bootstrapImprovedObservationModule } from '@/modules/improved-observation/factories/improved-observation.bootstrap';
import { bootstrapIndividualRelationshipStrategyModule } from '@/modules/individual-relationship-strategy/factories/individual-relationship-strategy.bootstrap';
import { bootstrapInstanceStatusModule } from '@/modules/instance-status/factories/instance-status.bootstrap';
import { bootstrapLanguageSupportModule } from '@/modules/language-support/factories/language-support.bootstrap';
import { bootstrapLightningRoundModule } from '@/modules/lightning-round/factories/lightning-round.bootstrap';
import { bootstrapManualGroupActivityModule } from '@/modules/manual-group-activity/factories/manual-group-activity.bootstrap';
import { bootstrapMoodTrendAnalysisModule } from '@/modules/mood-trend-analysis/factories/mood-trend-analysis.bootstrap';
import { bootstrapObservationModule } from '@/modules/observation/factories/observation.bootstrap';
import { bootstrapParticipationModule } from '@/modules/participation/factories/participation.bootstrap';
import { bootstrapPersonalizedActivityModule } from '@/modules/personalized-activity/factories/personalized-activity.bootstrap';
import { bootstrapPblModule } from '@/modules/pbl/factories/pbl.bootstrap';
import { bootstrapQualitiesSuggestionModule } from '@/modules/qualities-suggestion/factories/qualities-suggestion.bootstrap';
import { bootstrapRelationshipRemediationModule } from '@/modules/relationship-remediation/factories/relationship-remediation.bootstrap';
import { bootstrapRiddleBattleModule } from '@/modules/riddle-battle/factories/riddle-battle.bootstrap';
import { bootstrapRubricSuggestionModule } from '@/modules/rubric-suggestion/factories/rubric-suggestion.bootstrap';
import { bootstrapSafetyCommitteeModule } from '@/modules/safety-committee/factories/safety-committee.bootstrap';
import { bootstrapStudentModule } from '@/modules/student/factories/student.bootstrap';
import { bootstrapSupportPlanModule } from '@/modules/support-plan/factories/support-plan.bootstrap';
import { bootstrapTestModule } from '@/modules/test/factories/test.bootstrap';
import { bootstrapTestAnalysisModule } from '@/modules/test-analysis/factories/test-analysis.bootstrap';
import { bootstrapTestSubmissionModule } from '@/modules/test-submission/factories/test-submission.bootstrap';
import { bootstrapStorageModule } from '@/modules/storage/factories/storage.bootstrap';
import { bootstrapSkillModule } from '@/modules/skill/factories/skill.bootstrap';
import { bootstrapTeacherLabModule } from '@/modules/teacher-lab/factories/teacher-lab.bootstrap';
import { bootstrapMbeExpertModule } from '@/modules/mbe-expert/factories/mbe-expert.bootstrap';

let servicesInitialized = false;

export function initializeServices(): void {
  if (servicesInitialized) {
    return;
  }
  
  // --- Bootstrap all modules ---
  // The order is important here. Modules without dependencies or providing
  // repositories should come first.
  bootstrapStorageModule();
  bootstrapAnonymizationModule();
  bootstrapAIConfigurationModule();
  bootstrapSkillModule();
  bootstrapFocusAreaModule();
  
  // Modules that depend on the above
  bootstrapCurriculumActivityModule();
  bootstrapStudentModule();
  bootstrapParticipationModule();
  bootstrapChallengeModule();
  bootstrapEvaluationModule();
  bootstrapCoachSuggestionModule();
  bootstrapCollaborativeStoryModule();
  bootstrapConcernAnalysisModule();
  bootstrapDebateModule();
  bootstrapDigitalConvivialityModule();
  bootstrapEducationalSafetyModule();
  bootstrapExportModule();
  bootstrapExpertAdviceModule();
  bootstrapFearManagementSuggestionModule();
  bootstrapFearUpdateSuggestionModule();
  bootstrapGroupActivitySuggestionModule();
  bootstrapImprovedObservationModule();
  bootstrapIndividualRelationshipStrategyModule();
  bootstrapInstanceStatusModule();
  bootstrapLanguageSupportModule();
  bootstrapLightningRoundModule();
  bootstrapManualGroupActivityModule();
  bootstrapMoodTrendAnalysisModule();
  bootstrapObservationModule();
  bootstrapPersonalizedActivityModule();
  bootstrapPblModule();
  bootstrapQualitiesSuggestionModule();
  bootstrapRelationshipRemediationModule();
  bootstrapRiddleBattleModule();
  bootstrapRubricSuggestionModule();
  bootstrapSafetyCommitteeModule();
  bootstrapStudentModule();
  bootstrapSupportPlanModule();
  bootstrapTestModule();
  bootstrapTestAnalysisModule();
  bootstrapTestSubmissionModule();
  bootstrapActivityAdaptationModule();
  bootstrapActivitySuggestionModule();
  bootstrapTeacherLabModule();
  bootstrapMbeExpertModule();
  
  servicesInitialized = true;
}

// Optional: A resolve function for convenience, though direct container usage is also fine.
export function resolve<T>(key: string): T {
  if (!servicesInitialized) {
    initializeServices();
  }
  return container.resolve<T>(key);
}
