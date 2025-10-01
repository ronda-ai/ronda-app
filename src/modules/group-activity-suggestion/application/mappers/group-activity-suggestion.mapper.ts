
import { GroupActivitySuggestion } from "../../domain/group-activity-suggestion.entity";
import { GroupActivitySuggestionDTO } from "../dtos/group-activity-suggestion.dto";

export class GroupActivitySuggestionMapper {
    public static toDTO(suggestion: GroupActivitySuggestion): GroupActivitySuggestionDTO {
        return {
            id: suggestion.id,
            teacherTip: suggestion.teacherTip,
            suggestedGroups: suggestion.suggestedGroups,
            suggestedSkills: suggestion.suggestedSkills,
            suggestedThemes: suggestion.suggestedThemes,
            createdAt: suggestion.createdAt.toISOString(),
        };
    }
}

    