
import { CreateCoachSuggestionDTO } from "../../application/dtos/create-coach-suggestion.dto";
import { CoachSuggestion } from "../coach-suggestion.entity";

export interface ICoachSuggestionRepository {
    create(data: CreateCoachSuggestionDTO): Promise<CoachSuggestion>;
    findByStudentId(studentId: string): Promise<CoachSuggestion[]>;
    delete(id: string): Promise<void>;
}
