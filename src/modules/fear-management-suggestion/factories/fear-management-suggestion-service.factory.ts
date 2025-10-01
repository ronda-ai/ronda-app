
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { FearManagementSuggestionService } from "../application/fear-management-suggestion.service";
import { IFearManagementSuggestionRepository } from "../domain/interfaces/fear-management-suggestion-repository.interface";
import { IFearManagementSuggestionService } from '../domain/interfaces/fear-management-suggestion-service.interface';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _fearManagementSuggestionServiceInstance: IFearManagementSuggestionService;

export function createFearManagementSuggestionService(): IFearManagementSuggestionService {
    if(!_fearManagementSuggestionServiceInstance){
        const repository = container.resolve<IFearManagementSuggestionRepository>(SERVICE_KEYS.FearManagementSuggestionRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _fearManagementSuggestionServiceInstance = new FearManagementSuggestionService(repository, anonymizationService);
    }
    return _fearManagementSuggestionServiceInstance;
}
