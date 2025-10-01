
import { MongooseQualitiesSuggestionRepository } from "../infrastructure/persistence/mongoose/qualities-suggestion.repository";
import { IQualitiesSuggestionRepository } from '../domain/interfaces/qualities-suggestion-repository.interface';

let _qualitiesSuggestionRepositoryInstance: IQualitiesSuggestionRepository;

export function createQualitiesSuggestionRepository(): IQualitiesSuggestionRepository {
    if(!_qualitiesSuggestionRepositoryInstance){
        _qualitiesSuggestionRepositoryInstance = new MongooseQualitiesSuggestionRepository();
    }
    return _qualitiesSuggestionRepositoryInstance;
}
