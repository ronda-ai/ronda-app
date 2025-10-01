

import { CreateRubricSuggestionDTO } from "../../application/dtos/create-rubric-suggestion.dto";
import { RubricSuggestion } from "../rubric-suggestion.entity";

export interface IRubricSuggestionRepository {
    create(data: CreateRubricSuggestionDTO): Promise<RubricSuggestion>;
    findAll(): Promise<RubricSuggestion[]>;
    findById(id: string): Promise<RubricSuggestion | null>;
    update(id: string, data: Partial<RubricSuggestion>): Promise<RubricSuggestion | null>;
    delete(id: string): Promise<void>;
}
