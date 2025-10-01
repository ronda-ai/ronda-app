
import { CoachSuggestion } from "../../domain/coach-suggestion.entity";
import { CoachSuggestionDTO } from "../dtos/coach-suggestion.dto";

export class CoachSuggestionMapper {
    public static toDTO(suggestion: CoachSuggestion): CoachSuggestionDTO {
        return {
            id: suggestion.id,
            studentId: suggestion.studentId.toString(),
            title: suggestion.title,
            positiveAspects: suggestion.positiveAspects,
            areasForImprovement: suggestion.areasForImprovement,
            suggestion: suggestion.suggestion,
            deepeningQuestion: suggestion.deepeningQuestion,
            createdAt: suggestion.createdAt.toISOString(),
        };
    }
}
