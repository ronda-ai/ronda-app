
import { MongooseGroupActivitySuggestionRepository } from "../infrastructure/persistence/mongoose/group-activity-suggestion.repository";
import { IGroupActivitySuggestionRepository } from '../domain/interfaces/group-activity-suggestion-repository.interface';

let _groupActivitySuggestionRepositoryInstance: IGroupActivitySuggestionRepository;

export function createGroupActivitySuggestionRepository(): IGroupActivitySuggestionRepository {
    if(!_groupActivitySuggestionRepositoryInstance){
        _groupActivitySuggestionRepositoryInstance = new MongooseGroupActivitySuggestionRepository();
    }
    return _groupActivitySuggestionRepositoryInstance;
}
