import { IFearUpdateSuggestionRepository } from "../../../domain/interfaces/fear-update-suggestion-repository.interface";
import { CreateFearUpdateSuggestionDTO } from "../../../application/dtos/create-fear-update-suggestion.dto";
import { FearUpdateSuggestion } from "../../../domain/fear-update-suggestion.entity";

export class SupabaseFearUpdateSuggestionRepository implements IFearUpdateSuggestionRepository {
    async create(data: CreateFearUpdateSuggestionDTO): Promise<FearUpdateSuggestion> {
        throw new Error("Method not implemented.");
    }
}
