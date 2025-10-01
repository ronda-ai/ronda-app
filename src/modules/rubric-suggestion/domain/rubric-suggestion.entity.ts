

import { ScoringSection } from "../application/dtos/rubric-suggestion.dto";

interface RubricCriterion {
    criterion: string;
    excellent: string;
    satisfactory: string;
    needsImprovement: string;
}

export class RubricSuggestion {
    constructor(
        public id: any,
        public activityDescription: string,
        public criteria: RubricCriterion[],
        public createdAt: Date,
        public updatedAt: Date,
        public suggestedScoring?: ScoringSection[],
    ) {}
}
