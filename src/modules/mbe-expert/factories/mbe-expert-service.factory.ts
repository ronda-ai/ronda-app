
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IMbeExpertRepository } from '../domain/interfaces/mbe-expert-repository.interface';
import { IMbeExpertService } from '../domain/interfaces/mbe-expert-service.interface';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";
import { MbeExpertService } from '../application/mbe-expert.service';

let _serviceInstance: IMbeExpertService;

export function createMbeExpertService(): IMbeExpertService {
    if(!_serviceInstance){
        const repository = container.resolve<IMbeExpertRepository>(SERVICE_KEYS.MbeExpertRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _serviceInstance = new MbeExpertService(repository, anonymizationService);
    }
    return _serviceInstance;
}
