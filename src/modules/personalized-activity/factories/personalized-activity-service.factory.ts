
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { PersonalizedActivityService } from "../application/personalized-activity.service";
import { IPersonalizedActivityRepository } from "../domain/interfaces/personalized-activity-repository.interface";
import { IPersonalizedActivityService } from '../domain/interfaces/personalized-activity-service.interface';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _personalizedActivityServiceInstance: IPersonalizedActivityService;

export function createPersonalizedActivityService(): IPersonalizedActivityService {
    if(!_personalizedActivityServiceInstance){
        const repository = container.resolve<IPersonalizedActivityRepository>(SERVICE_KEYS.PersonalizedActivityRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _personalizedActivityServiceInstance = new PersonalizedActivityService(repository, anonymizationService);
    }
    return _personalizedActivityServiceInstance;
}
