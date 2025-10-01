
import { FearManagementSuggestion } from "../../domain/fear-management-suggestion.entity";
import { FearManagementSuggestionDTO } from "../dtos/fear-management-suggestion.dto";

export class FearManagementSuggestionMapper {
    public static toDTO(suggestion: FearManagementSuggestion): FearManagementSuggestionDTO {
        return {
            id: suggestion.id,
            studentId: suggestion.studentId.toString(),
            targetedFear: suggestion.targetedFear,
            title: suggestion.title,
            rationale: suggestion.rationale,
            steps: suggestion.steps.map(s => ({ text: s.text, status: s.status, feedback: s.feedback })),
            deepeningQuestion: suggestion.deepeningQuestion,
            teacherFeedback: suggestion.teacherFeedback,
            createdAt: suggestion.createdAt.toISOString(),
        };
    }
}
