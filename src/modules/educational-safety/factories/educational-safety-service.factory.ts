
import { EducationalSafetyService } from '../application/educational-safety.service';
import { IEducationalSafetyService } from '../domain/interfaces/educational-safety-service.interface';
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { ISafetyRiskMapRepository } from '../domain/interfaces/safety-risk-map-repository.interface';
import { ISafetyProtocolRepository } from '../domain/interfaces/safety-protocol-repository.interface';
import { ICrisisScenarioRepository } from '../domain/interfaces/crisis-scenario-repository.interface';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';

let _serviceInstance: IEducationalSafetyService;

export function createEducationalSafetyService(): IEducationalSafetyService {
    if (!_serviceInstance) {
        const riskMapRepository = container.resolve<ISafetyRiskMapRepository>(SERVICE_KEYS.SafetyRiskMapRepository);
        const protocolRepository = container.resolve<ISafetyProtocolRepository>(SERVICE_KEYS.SafetyProtocolRepository);
        const scenarioRepository = container.resolve<ICrisisScenarioRepository>(SERVICE_KEYS.CrisisScenarioRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _serviceInstance = new EducationalSafetyService(riskMapRepository, protocolRepository, scenarioRepository, anonymizationService);
    }
    return _serviceInstance;
}
