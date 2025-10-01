import { IFearManagementSuggestionRepository } from "../../../domain/interfaces/fear-management-suggestion-repository.interface";
import { CreateFearManagementSuggestionDTO } from "../../../application/dtos/create-fear-management-suggestion.dto";
import { FearManagementSuggestion } from "../../../domain/fear-management-suggestion.entity";

export class SupabaseFearManagementSuggestionRepository implements IFearManagementSuggestionRepository {
    findById(id: string): Promise<FearManagementSuggestion | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Partial<Omit<FearManagementSuggestion, "id" | "studentId" | "createdAt">>): Promise<FearManagementSuggestion | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateFearManagementSuggestionDTO): Promise<FearManagementSuggestion> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<FearManagementSuggestion[]> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
