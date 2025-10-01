
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { FearUpdateSuggestionService } from "../application/fear-update-suggestion.service";
import { IFearUpdateSuggestionRepository } from "../domain/interfaces/fear-update-suggestion-repository.interface";
import { IFearUpdateSuggestionService } from '../domain/interfaces/fear-update-suggestion-service.interface';

let _fearUpdateSuggestionServiceInstance: IFearUpdateSuggestionService;

export function createFearUpdateSuggestionService(): IFearUpdateSuggestionService {
    if(!_fearUpdateSuggestionServiceInstance){
        const repository = container.resolve<IFearUpdateSuggestionRepository>(SERVICE_KEYS.FearUpdateSuggestionRepository);
        _fearUpdateSuggestionServiceInstance = new FearUpdateSuggestionService(repository);
    }
    return _fearUpdateSuggestionServiceInstance;
}
