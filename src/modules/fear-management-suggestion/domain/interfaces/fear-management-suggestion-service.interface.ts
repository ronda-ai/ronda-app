
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateFearManagementSuggestionDTO } from "../../application/dtos/create-fear-management-suggestion.dto";
import { FearManagementSuggestionDTO, FearManagementStepDTO } from "../../application/dtos/fear-management-suggestion.dto";

export interface IFearManagementSuggestionService {
    createSuggestion(dto: CreateFearManagementSuggestionDTO): Promise<FearManagementSuggestionDTO>;
    getSuggestionsForStudent(studentId: string): Promise<FearManagementSuggestionDTO[]>;
    deleteSuggestion(suggestionId: string): Promise<void>;
    addFeedback(suggestionId: string, feedback: string): Promise<FearManagementSuggestionDTO | null>;
    generateAndCreateSuggestion(student: StudentDTO, language: string, targetedFear?: string): Promise<FearManagementSuggestionDTO>;
    updateStepDetails(suggestionId: string, stepIndex: number, details: Partial<FearManagementStepDTO>): Promise<FearManagementSuggestionDTO | null>;
}
