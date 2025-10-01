
export type FearManagementStepStatus = 'pending' | 'completed' | 'skipped';

export interface FearManagementStepDTO {
    text: string;
    status: FearManagementStepStatus;
    feedback?: string;
}

export interface FearManagementSuggestionDTO {
    id: string;
    studentId: string;
    targetedFear: string;
    title: string;
    rationale: string;
    steps: FearManagementStepDTO[];
    deepeningQuestion: string;
    teacherFeedback?: string;
    createdAt: string;
}
