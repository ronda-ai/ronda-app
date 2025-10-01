import { ICoachSuggestionRepository } from "../../../domain/interfaces/coach-suggestion-repository.interface";
import { CreateCoachSuggestionDTO } from "../../../application/dtos/create-coach-suggestion.dto";
import { CoachSuggestion } from "../../../domain/coach-suggestion.entity";

export class SupabaseCoachSuggestionRepository implements ICoachSuggestionRepository {
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateCoachSuggestionDTO): Promise<CoachSuggestion> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<CoachSuggestion[]> {
        throw new Error("Method not implemented.");
    }
}
