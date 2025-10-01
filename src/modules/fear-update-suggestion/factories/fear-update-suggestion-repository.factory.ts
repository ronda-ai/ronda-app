
import { MongooseFearUpdateSuggestionRepository } from "../infrastructure/persistence/mongoose/fear-update-suggestion.repository";
import { IFearUpdateSuggestionRepository } from '../domain/interfaces/fear-update-suggestion-repository.interface';

let _fearUpdateSuggestionRepositoryInstance: IFearUpdateSuggestionRepository;

export function createFearUpdateSuggestionRepository(): IFearUpdateSuggestionRepository {
    if(!_fearUpdateSuggestionRepositoryInstance){
        _fearUpdateSuggestionRepositoryInstance = new MongooseFearUpdateSuggestionRepository();
    }
    return _fearUpdateSuggestionRepositoryInstance;
}
