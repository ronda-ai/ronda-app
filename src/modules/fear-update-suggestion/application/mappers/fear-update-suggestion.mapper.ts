
import { FearUpdateSuggestion } from "../../domain/fear-update-suggestion.entity";
import { FearUpdateSuggestionDTO } from "../dtos/fear-update-suggestion.dto";

export class FearUpdateSuggestionMapper {
    public static toDTO(suggestion: FearUpdateSuggestion): FearUpdateSuggestionDTO {
        return {
            id: suggestion.id,
            studentId: suggestion.studentId.toString(),
            fearToUpdate: suggestion.fearToUpdate,
            updateProposal: suggestion.updateProposal,
            originalSuggestionId: suggestion.originalSuggestionId.toString(),
            createdAt: suggestion.createdAt.toISOString(),
            hasUpdate: true, // We assume if a record is created, an update is proposed.
        };
    }
}
