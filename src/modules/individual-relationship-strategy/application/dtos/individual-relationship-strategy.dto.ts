

export type IndividualStrategyStepStatus = 'pending' | 'completed' | 'skipped';

export interface StrategyStepDTO {
    text: string;
    status: IndividualStrategyStepStatus;
    feedback?: string;
}

export type StrategyStatus = 'not_started' | 'in_progress' | 'successful' | 'partially_successful' | 'did_not_work' | 'needs_adjustment';

export interface IndividualRelationshipStrategyDTO {
    id: string;
    studentId: string;
    title: string;
    rationale: string;
    steps: StrategyStepDTO[];
    focus: string;
    customPrompt?: string;
    status: StrategyStatus;
    feedback?: string;
    createdAt: string;
}
