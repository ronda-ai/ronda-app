
import { MongooseActivitySuggestionRepository } from "../infrastructure/persistence/mongoose/activity-suggestion.repository";
import { IActivitySuggestionRepository } from '../domain/interfaces/activity-suggestion-repository.interface';

let _activitySuggestionRepositoryInstance: IActivitySuggestionRepository;

export function createActivitySuggestionRepository(): IActivitySuggestionRepository {
    if(!_activitySuggestionRepositoryInstance){
        _activitySuggestionRepositoryInstance = new MongooseActivitySuggestionRepository();
    }
    return _activitySuggestionRepositoryInstance;
}
