
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { AIConfigurationService } from "../application/ai-configuration.service";
import { IAIConfigurationRepository } from "../domain/interfaces/ai-configuration-repository.interface";
import { IAIConfigurationService } from '../domain/interfaces/ai-configuration-service.interface';

let _aiConfigurationServiceInstance: IAIConfigurationService;

export function createAIConfigurationService(): IAIConfigurationService {
    if(!_aiConfigurationServiceInstance){
        const repository = container.resolve<IAIConfigurationRepository>(SERVICE_KEYS.AIConfigurationRepository);
        _aiConfigurationServiceInstance = new AIConfigurationService(repository);
    }
    return _aiConfigurationServiceInstance;
}
