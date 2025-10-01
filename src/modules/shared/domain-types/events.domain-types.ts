

import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { ChallengeHistoryDTO } from "@/modules/challenge/application/dtos/challenge-history.dto";
import { SupportPlanDTO } from "@/modules/support-plan/application/dtos/support-plan.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { TestSubmissionDTO } from "@/modules/test-submission/application/dtos/test-submission.dto";
import { GenerateSafetyProtocolOutput } from '@/ai/flows/generate-safety-protocol';
import { GenerateSafetyRiskMapOutput } from '@/ai/flows/generate-safety-risk-map';
import { CrisisScenario } from '@/modules/educational-safety/domain/educational-safety.entity';
import { QuestionAnalysisOutput } from '@/modules/teacher-lab/application/dtos/question-analysis.dto';
import { ReflectionGuidanceOutput } from "@/modules/teacher-lab/application/dtos/reflection-guidance.dto";

export enum SystemEvent {
  // Student-related events
  STUDENT_CREATED = 'student.created',
  STUDENT_UPDATED = 'student.updated',
  STUDENT_DELETED = 'student.deleted',

  // Attendance-related events
  ATTENDANCE_MARKED = 'attendance.marked',

  // Challenge-related events
  CHALLENGE_ACCEPTED = 'challenge.accepted',
  CHALLENGE_REJECTED = 'challenge.rejected',
  CHALLENGE_EVALUATED = 'challenge.evaluated',

  // Participation-related events
  PARTICIPATION_ADDED = 'participation.added',
  PARTICIPATION_REMOVED = 'participation.removed',

  // AI Suggestion/Plan events
  SUPPORT_PLAN_CREATED = 'support_plan.created',
  COACH_SUGGESTION_GENERATED = 'coach_suggestion.generated',
  FEAR_MANAGEMENT_SUGGESTION_GENERATED = 'fear_management_suggestion.generated',
  OBSERVATION_LOGGED = 'observation.logged',

  // Collaborative Story events
  CHAPTER_CREATED = 'chapter.created',
  
  // Language Support events
  LANGUAGE_SUPPORT_MATERIAL_CREATED = 'language_support_material.created',
  
  // Test events
  TEST_SUBMITTED = 'test.submitted',

  // Educational Safety events
  SAFETY_RISK_MAP_GENERATED = 'safety.risk_map.generated',
  SAFETY_PROTOCOL_GENERATED = 'safety.protocol.generated',
  CRISIS_SCENARIO_CREATED = 'crisis_scenario.created',

  // Teacher Lab Events
  PEDAGOGICAL_MENU_GENERATED = 'teacher_lab.pedagogical_menu.generated',
  QUESTION_ANALYSIS_GENERATED = 'teacher_lab.question_analysis.generated',
  REFLECTION_GUIDANCE_PROVIDED = 'teacher_lab.reflection_guidance.provided',
}

// --- PAYLOAD INTERFACES ---

export interface StudentCreatedPayload {
  student: StudentDTO;
}

export interface StudentUpdatedPayload {
  studentId: string;
  updatedFields: Partial<StudentDTO>;
}

export interface StudentDeletedPayload {
  studentId: string;
}

export interface AttendanceMarkedPayload {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'justified';
}

export interface ChallengeAcceptedPayload {
  studentIds: string[];
  challenge: Omit<ChallengeHistoryDTO, 'id' | 'studentId'>;
}

export interface ChallengeRejectedPayload {
  studentIds: string[];
  challenge: Omit<ChallengeHistoryDTO, 'id' | 'studentId'>;
}

export interface ChallengeEvaluatedPayload {
  challengeId: string;
  studentId: string;
  rating: 'needs-support' | 'met-expectations' | 'exceeded-expectations';
  feedback?: string;
  mood?: string;
}

export interface ParticipationAddedPayload {
  studentId: string;
}

export interface ParticipationRemovedPayload {
  studentId: string;
}

export interface SupportPlanCreatedPayload {
  plan: SupportPlanDTO;
}

export interface CoachSuggestionGeneratedPayload {
  studentId: string;
  suggestion: string;
}

export interface FearManagementSuggestionGeneratedPayload {
  studentId: string;
  suggestion: string;
  targetedFear: string;
}

export interface ObservationLoggedPayload {
    observation: ObservationDTO;
}

export interface ChapterCreatedPayload {
    storyId: string;
    chapterIndex: number;
    text: string;
    allowDialogues: boolean;
    narratorVoice?: string;
}

export interface LanguageSupportMaterialCreatedPayload {
    supportId: string;
    text: string;
    language: string;
}

export interface TestSubmittedPayload {
    submission: TestSubmissionDTO;
}

export interface SafetyRiskMapGeneratedPayload {
    result: GenerateSafetyRiskMapOutput;
}

export interface SafetyProtocolGeneratedPayload {
    result: GenerateSafetyProtocolOutput;
}

export interface CrisisScenarioCreatedPayload {
    scenario: CrisisScenario;
}

export interface PedagogicalMenuGeneratedPayload {
    objective: string;
    approaches: any[]; // Define more specifically if needed
}

export interface QuestionAnalysisGeneratedPayload {
    result: QuestionAnalysisOutput;
}

export interface ReflectionGuidanceProvidedPayload {
    result: ReflectionGuidanceOutput;
}


// This interface maps each event type to its payload structure.
export interface SystemEventPayloads {
  [SystemEvent.STUDENT_CREATED]: StudentCreatedPayload;
  [SystemEvent.STUDENT_UPDATED]: StudentUpdatedPayload;
  [SystemEvent.STUDENT_DELETED]: StudentDeletedPayload;
  [SystemEvent.ATTENDANCE_MARKED]: AttendanceMarkedPayload;
  [SystemEvent.CHALLENGE_ACCEPTED]: ChallengeAcceptedPayload;
  [SystemEvent.CHALLENGE_REJECTED]: ChallengeRejectedPayload;
  [SystemEvent.CHALLENGE_EVALUATED]: ChallengeEvaluatedPayload;
  [SystemEvent.PARTICIPATION_ADDED]: ParticipationAddedPayload;
  [SystemEvent.PARTICIPATION_REMOVED]: ParticipationRemovedPayload;
  [SystemEvent.SUPPORT_PLAN_CREATED]: SupportPlanCreatedPayload;
  [SystemEvent.COACH_SUGGESTION_GENERATED]: CoachSuggestionGeneratedPayload;
  [SystemEvent.FEAR_MANAGEMENT_SUGGESTION_GENERATED]: FearManagementSuggestionGeneratedPayload;
  [SystemEvent.OBSERVATION_LOGGED]: ObservationLoggedPayload;
  [SystemEvent.CHAPTER_CREATED]: ChapterCreatedPayload;
  [SystemEvent.LANGUAGE_SUPPORT_MATERIAL_CREATED]: LanguageSupportMaterialCreatedPayload;
  [SystemEvent.TEST_SUBMITTED]: TestSubmittedPayload;
  [SystemEvent.SAFETY_RISK_MAP_GENERATED]: SafetyRiskMapGeneratedPayload;
  [SystemEvent.SAFETY_PROTOCOL_GENERATED]: SafetyProtocolGeneratedPayload;
  [SystemEvent.CRISIS_SCENARIO_CREATED]: CrisisScenarioCreatedPayload;
  [SystemEvent.PEDAGOGICAL_MENU_GENERATED]: PedagogicalMenuGeneratedPayload;
  [SystemEvent.QUESTION_ANALYSIS_GENERATED]: QuestionAnalysisGeneratedPayload;
  [SystemEvent.REFLECTION_GUIDANCE_PROVIDED]: ReflectionGuidanceProvidedPayload;
}
