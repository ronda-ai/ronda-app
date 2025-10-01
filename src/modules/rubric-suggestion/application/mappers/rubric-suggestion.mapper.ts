
import { RubricSuggestion } from "../../domain/rubric-suggestion.entity";
import { RubricSuggestionDTO } from "../dtos/rubric-suggestion.dto";

export class RubricSuggestionMapper {
    public static toDTO(suggestion: RubricSuggestion): RubricSuggestionDTO {
        return {
            id: suggestion.id,
            activityDescription: suggestion.activityDescription,
            criteria: suggestion.criteria,
            suggestedScoring: suggestion.suggestedScoring || [],
            createdAt: suggestion.createdAt.toISOString(),
        };
    }
}
