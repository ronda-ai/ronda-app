
export type RemediationStatus = 'not_started' | 'in_progress' | 'successful' | 'partially_successful' | 'did_not_work' | 'needs_adjustment';
export type RemediationStepStatus = 'pending' | 'completed' | 'skipped';

export interface RemediationStep {
    text: string;
    status: RemediationStepStatus;
    feedback?: string;
}

export interface RelationshipRemediationDTO {
    id: string;
    studentIds: string[];
    focus: string;
    customPrompt?: string;
    strategyTitle: string;
    steps: RemediationStep[];
    status: RemediationStatus;
    feedback?: string;
    createdAt: string;
}
