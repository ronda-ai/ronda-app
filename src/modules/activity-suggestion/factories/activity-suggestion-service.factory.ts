
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ActivitySuggestionService } from "../application/activity-suggestion.service";
import { IActivitySuggestionRepository } from "../domain/interfaces/activity-suggestion-repository.interface";
import { IActivitySuggestionService } from '../domain/interfaces/activity-suggestion-service.interface';

let _activitySuggestionServiceInstance: IActivitySuggestionService;

export function createActivitySuggestionService(): IActivitySuggestionService {
    if(!_activitySuggestionServiceInstance){
        const repository = container.resolve<IActivitySuggestionRepository>(SERVICE_KEYS.ActivitySuggestionRepository);
        _activitySuggestionServiceInstance = new ActivitySuggestionService(repository);
    }
    return _activitySuggestionServiceInstance;
}
