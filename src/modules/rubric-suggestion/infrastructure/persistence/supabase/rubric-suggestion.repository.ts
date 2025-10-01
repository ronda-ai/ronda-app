import { IRubricSuggestionRepository } from "../../../domain/interfaces/rubric-suggestion-repository.interface";
import { CreateRubricSuggestionDTO } from "../../../application/dtos/create-rubric-suggestion.dto";
import { RubricSuggestion } from "../../../domain/rubric-suggestion.entity";

export class SupabaseRubricSuggestionRepository implements IRubricSuggestionRepository {
    findById(id: string): Promise<RubricSuggestion | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Partial<RubricSuggestion>): Promise<RubricSuggestion | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateRubricSuggestionDTO): Promise<RubricSuggestion> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<RubricSuggestion[]> {
        throw new Error("Method not implemented.");
    }
}
