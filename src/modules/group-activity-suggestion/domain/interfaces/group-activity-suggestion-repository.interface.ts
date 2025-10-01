
import { CreateGroupActivitySuggestionDTO } from "../../application/dtos/create-group-activity-suggestion.dto";
import { GroupActivitySuggestion } from "../group-activity-suggestion.entity";

export interface IGroupActivitySuggestionRepository {
    create(data: CreateGroupActivitySuggestionDTO): Promise<GroupActivitySuggestion>;
    findAll(): Promise<GroupActivitySuggestion[]>;
    delete(id: string): Promise<void>;
}
