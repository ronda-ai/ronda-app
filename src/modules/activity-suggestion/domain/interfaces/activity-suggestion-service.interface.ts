
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateActivitySuggestionDTO } from "../../application/dtos/create-activity-suggestion.dto";
import { ActivitySuggestionDTO } from "../../application/dtos/activity-suggestion.dto";

export interface IActivitySuggestionService {
    createSuggestion(dto: CreateActivitySuggestionDTO): Promise<ActivitySuggestionDTO>;
    generateAndCreateSuggestion(student: StudentDTO, language: string): Promise<ActivitySuggestionDTO>;
}
