
import { CreateFearManagementSuggestionDTO } from "../../application/dtos/create-fear-management-suggestion.dto";
import { FearManagementSuggestion } from "../fear-management-suggestion.entity";

export interface IFearManagementSuggestionRepository {
    create(data: CreateFearManagementSuggestionDTO): Promise<FearManagementSuggestion>;
    findByStudentId(studentId: string): Promise<FearManagementSuggestion[]>;
    findById(id: string): Promise<FearManagementSuggestion | null>;
    update(id: string, data: Partial<Omit<FearManagementSuggestion, 'id' | 'studentId' | 'createdAt'>>): Promise<FearManagementSuggestion | null>;
    delete(id: string): Promise<void>;
}
