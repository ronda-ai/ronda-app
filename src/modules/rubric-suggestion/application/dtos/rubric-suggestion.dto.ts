

export interface RubricCriterion {
    criterion: string;
    excellent: string;
    satisfactory: string;
    needsImprovement: string;
}

export interface ScoringSection {
    section: string;
    points: string;
    description: string;
}

export interface RubricSuggestionDTO {
    id: string;
    activityDescription: string;
    criteria: RubricCriterion[];
    suggestedScoring: ScoringSection[];
    createdAt: string;
}
