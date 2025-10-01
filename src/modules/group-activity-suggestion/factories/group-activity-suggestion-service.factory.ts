
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { GroupActivitySuggestionService } from "../application/group-activity-suggestion.service";
import { IGroupActivitySuggestionRepository } from "../domain/interfaces/group-activity-suggestion-repository.interface";
import { IGroupActivitySuggestionService } from '../domain/interfaces/group-activity-suggestion-service.interface';

let _groupActivitySuggestionServiceInstance: IGroupActivitySuggestionService;

export function createGroupActivitySuggestionService(): IGroupActivitySuggestionService {
    if(!_groupActivitySuggestionServiceInstance){
        const repository = container.resolve<IGroupActivitySuggestionRepository>(SERVICE_KEYS.GroupActivitySuggestionRepository);
        _groupActivitySuggestionServiceInstance = new GroupActivitySuggestionService(repository);
    }
    return _groupActivitySuggestionServiceInstance;
}
