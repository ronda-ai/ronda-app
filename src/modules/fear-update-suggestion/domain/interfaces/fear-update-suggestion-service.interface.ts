
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateFearUpdateSuggestionDTO } from "../../application/dtos/create-fear-update-suggestion.dto";
import { FearUpdateSuggestionDTO } from "../../application/dtos/fear-update-suggestion.dto";

export interface IFearUpdateSuggestionService {
    createSuggestion(dto: CreateFearUpdateSuggestionDTO): Promise<FearUpdateSuggestionDTO>;
    processTeacherFeedback(input: { student: Pick<StudentDTO, 'name' | 'fears'>, originalSuggestion: string, teacherFeedback: string, language: string, originalSuggestionId: string }): Promise<Partial<FearUpdateSuggestionDTO> & { hasUpdate: boolean }>;
}
