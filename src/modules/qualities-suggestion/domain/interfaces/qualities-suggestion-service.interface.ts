
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { QualitiesSuggestionDTO } from "../../application/dtos/qualities-suggestion.dto";
import { CreateQualitiesSuggestionDTO } from "../../application/dtos/create-qualities-suggestion.dto";

export interface IQualitiesSuggestionService {
    createQualitiesSuggestion(dto: CreateQualitiesSuggestionDTO): Promise<QualitiesSuggestionDTO>;
    getQualitiesSuggestionsForStudent(studentId: string): Promise<QualitiesSuggestionDTO[]>;
    generateAndCreateSuggestion(student: StudentDTO, language: string): Promise<{ suggestions: string[] }>;
}
