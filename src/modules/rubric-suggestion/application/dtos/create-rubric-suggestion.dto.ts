

import { RubricSuggestion } from "../../domain/rubric-suggestion.entity";
import { ScoringSection } from './rubric-suggestion.dto';

export type CreateRubricSuggestionDTO = Partial<Omit<RubricSuggestion, 'id' | 'createdAt' | 'updatedAt'>> & {
    id?: any;
    suggestedScoring?: ScoringSection[];
};
