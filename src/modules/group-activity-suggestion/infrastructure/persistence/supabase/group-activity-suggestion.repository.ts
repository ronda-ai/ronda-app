import { IGroupActivitySuggestionRepository } from "../../../domain/interfaces/group-activity-suggestion-repository.interface";
import { CreateGroupActivitySuggestionDTO } from "../../../application/dtos/create-group-activity-suggestion.dto";
import { GroupActivitySuggestion } from "../../../domain/group-activity-suggestion.entity";

export class SupabaseGroupActivitySuggestionRepository implements IGroupActivitySuggestionRepository {
    async create(data: CreateGroupActivitySuggestionDTO): Promise<GroupActivitySuggestion> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<GroupActivitySuggestion[]> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
