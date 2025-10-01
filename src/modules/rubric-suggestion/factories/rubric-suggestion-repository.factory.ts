
import { MongooseRubricSuggestionRepository } from "../infrastructure/persistence/mongoose/rubric-suggestion.repository";
import { IRubricSuggestionRepository } from '../domain/interfaces/rubric-suggestion-repository.interface';

let _rubricSuggestionRepositoryInstance: IRubricSuggestionRepository;

export function createRubricSuggestionRepository(): IRubricSuggestionRepository {
    if(!_rubricSuggestionRepositoryInstance){
        _rubricSuggestionRepositoryInstance = new MongooseRubricSuggestionRepository();
    }
    return _rubricSuggestionRepositoryInstance;
}
