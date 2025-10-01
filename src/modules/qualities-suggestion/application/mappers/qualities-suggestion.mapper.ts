
import { QualitiesSuggestion } from "../../domain/qualities-suggestion.entity";
import { QualitiesSuggestionDTO } from "../dtos/qualities-suggestion.dto";

export class QualitiesSuggestionMapper {
    public static toDTO(suggestion: QualitiesSuggestion): QualitiesSuggestionDTO {
        return {
            id: suggestion.id,
            studentId: suggestion.studentId.toString(),
            suggestions: suggestion.suggestions,
            createdAt: suggestion.createdAt.toISOString(),
        };
    }
}
