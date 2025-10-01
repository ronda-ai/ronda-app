
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { QualitiesSuggestionService } from "../application/qualities-suggestion.service";
import { IQualitiesSuggestionRepository } from "../domain/interfaces/qualities-suggestion-repository.interface";
import { IQualitiesSuggestionService } from '../domain/interfaces/qualities-suggestion-service.interface';

let _qualitiesSuggestionServiceInstance: IQualitiesSuggestionService;

export function createQualitiesSuggestionService(): IQualitiesSuggestionService {
    if(!_qualitiesSuggestionServiceInstance){
        const repository = container.resolve<IQualitiesSuggestionRepository>(SERVICE_KEYS.QualitiesSuggestionRepository);
        _qualitiesSuggestionServiceInstance = new QualitiesSuggestionService(repository);
    }
    return _qualitiesSuggestionServiceInstance;
}
