
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { RubricSuggestionService } from "../application/rubric-suggestion.service";
import { IRubricSuggestionRepository } from "../domain/interfaces/rubric-suggestion-repository.interface";
import { IAIConfigurationService } from '@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface';
import { IRubricSuggestionService } from '../domain/interfaces/rubric-suggestion-service.interface';

let _rubricSuggestionServiceInstance: IRubricSuggestionService;

export function createRubricSuggestionService(): IRubricSuggestionService {
    if(!_rubricSuggestionServiceInstance){
        const repository = container.resolve<IRubricSuggestionRepository>(SERVICE_KEYS.RubricSuggestionRepository);
        const aiConfigurationService = container.resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
        _rubricSuggestionServiceInstance = new RubricSuggestionService(repository, aiConfigurationService);
    }
    return _rubricSuggestionServiceInstance;
}
