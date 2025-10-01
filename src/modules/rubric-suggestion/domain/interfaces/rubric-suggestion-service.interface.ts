

import { TestBlock } from "@/modules/test/domain/test.entity";
import { CreateRubricSuggestionDTO } from "../../application/dtos/create-rubric-suggestion.dto";
import { RubricSuggestionDTO } from "../../application/dtos/rubric-suggestion.dto";

export interface IRubricSuggestionService {
    createSuggestion(dto: CreateRubricSuggestionDTO, language: string, blocks?: TestBlock[]): Promise<RubricSuggestionDTO>;
    getAllSuggestions(): Promise<RubricSuggestionDTO[]>;
    deleteSuggestion(id: string): Promise<void>;
}
