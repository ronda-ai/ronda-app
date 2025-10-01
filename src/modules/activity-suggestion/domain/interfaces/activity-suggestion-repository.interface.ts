
import { CreateActivitySuggestionDTO } from "../../application/dtos/create-activity-suggestion.dto";
import { ActivitySuggestion } from "../activity-suggestion.entity";

export interface IActivitySuggestionRepository {
    create(data: CreateActivitySuggestionDTO): Promise<ActivitySuggestion>;
}
