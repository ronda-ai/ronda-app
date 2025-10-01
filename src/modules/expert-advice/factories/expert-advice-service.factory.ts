
import { ExpertAdviceService } from "../application/expert-advice.service";
import { IExpertAdviceService } from '../domain/interfaces/expert-advice-service.interface';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';

let _expertAdviceServiceInstance: IExpertAdviceService;

export function createExpertAdviceService(): IExpertAdviceService {
    if(!_expertAdviceServiceInstance){
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _expertAdviceServiceInstance = new ExpertAdviceService(anonymizationService);
    }
    return _expertAdviceServiceInstance;
}
