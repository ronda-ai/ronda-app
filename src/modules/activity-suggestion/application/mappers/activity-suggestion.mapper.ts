

import { ActivitySuggestion } from "../../domain/activity-suggestion.entity";
import { ActivitySuggestionDTO } from "../dtos/activity-suggestion.dto";

export class ActivitySuggestionMapper {
    public static toDTO(suggestion: ActivitySuggestion): ActivitySuggestionDTO {
        return {
            id: suggestion.id,
            studentId: suggestion.studentId.toString(),
            topics: suggestion.topics,
            themes: suggestion.themes,
            createdAt: suggestion.createdAt.toISOString(),
        };
    }
}
