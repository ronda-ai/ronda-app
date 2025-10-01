
import { FearManagementSuggestion } from "../../domain/fear-management-suggestion.entity";

export type CreateFearManagementSuggestionDTO = Omit<FearManagementSuggestion, 'id' | 'createdAt' | 'updatedAt' | 'studentId' | 'teacherFeedback'> & {
    studentId: string;
};
