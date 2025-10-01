
import { CreateFearUpdateSuggestionDTO } from "../../application/dtos/create-fear-update-suggestion.dto";
import { FearUpdateSuggestion } from "../fear-update-suggestion.entity";

export interface IFearUpdateSuggestionRepository {
    create(data: CreateFearUpdateSuggestionDTO): Promise<FearUpdateSuggestion>;
}
