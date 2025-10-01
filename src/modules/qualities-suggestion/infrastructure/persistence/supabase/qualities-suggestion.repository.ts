import { IQualitiesSuggestionRepository } from "../../../domain/interfaces/qualities-suggestion-repository.interface";
import { CreateQualitiesSuggestionDTO } from "../../../application/dtos/create-qualities-suggestion.dto";
import { QualitiesSuggestion } from "../../../domain/qualities-suggestion.entity";

export class SupabaseQualitiesSuggestionRepository implements IQualitiesSuggestionRepository {
    async create(data: CreateQualitiesSuggestionDTO): Promise<QualitiesSuggestion> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<QualitiesSuggestion[]> {
        throw new Error("Method not implemented.");
    }
}
