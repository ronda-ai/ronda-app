
import { AnonymizationService } from '../application/anonymization.service';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';

let _anonymizationServiceInstance: IAnonymizationService;

export function createAnonymizationService(): IAnonymizationService {
    if(!_anonymizationServiceInstance){
        _anonymizationServiceInstance = new AnonymizationService();
    }
    return _anonymizationServiceInstance;
}
