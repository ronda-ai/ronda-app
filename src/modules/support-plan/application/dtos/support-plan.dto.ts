
export type SupportPlanStepStatus = 'pending' | 'achieved' | 'partially-achieved' | 'not-achieved' | 'discarded';

export interface SupportPlanStepDTO {
    text: string;
    status: SupportPlanStepStatus;
    feedback?: string;
}

export interface SupportPlanDTO {
    id: string;
    studentId: string;
    steps: SupportPlanStepDTO[];
    teacherFeedback?: string;
    createdAt: string; // Using string for serialization
    updatedAt: string;
}

    