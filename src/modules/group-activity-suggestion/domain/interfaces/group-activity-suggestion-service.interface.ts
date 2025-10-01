
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateGroupActivitySuggestionDTO } from "../../application/dtos/create-group-activity-suggestion.dto";
import { GroupActivitySuggestionDTO } from "../../application/dtos/group-activity-suggestion.dto";

export interface IGroupActivitySuggestionService {
    createSuggestion(dto: CreateGroupActivitySuggestionDTO): Promise<GroupActivitySuggestionDTO>;
    getAllSuggestions(): Promise<GroupActivitySuggestionDTO[]>;
    deleteSuggestion(id: string): Promise<void>;
    generateAndCreateSuggestion(students: StudentDTO[], language: string): Promise<GroupActivitySuggestionDTO>;
    generateSuggestionForManualGroup(students: StudentDTO[], language: string): Promise<GroupActivitySuggestionDTO>;
}
