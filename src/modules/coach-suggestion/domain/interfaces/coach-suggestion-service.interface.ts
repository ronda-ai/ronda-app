
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CoachSuggestionDTO } from "../../application/dtos/coach-suggestion.dto";
import { CreateCoachSuggestionDTO } from "../../application/dtos/create-coach-suggestion.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";

export interface ICoachSuggestionService {
    createCoachSuggestion(dto: CreateCoachSuggestionDTO): Promise<CoachSuggestionDTO>;
    getCoachSuggestionsForStudent(studentId: string): Promise<CoachSuggestionDTO[]>;
    deleteSuggestion(id: string): Promise<void>;
    generateAndCreateSuggestion(input: {
        student: StudentDTO,
        allStudents: StudentDTO[],
        observations: ObservationDTO[],
        language: string
    }): Promise<CoachSuggestionDTO>;
}
