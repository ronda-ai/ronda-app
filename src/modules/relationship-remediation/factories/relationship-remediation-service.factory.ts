
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { RelationshipRemediationService } from "../application/relationship-remediation.service";
import { IRelationshipRemediationRepository } from "../domain/interfaces/relationship-remediation-repository.interface";
import { IRelationshipRemediationService } from '../domain/interfaces/relationship-remediation-service.interface';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';

let _relationshipRemediationServiceInstance: IRelationshipRemediationService;

export function createRelationshipRemediationService(): IRelationshipRemediationService {
    if(!_relationshipRemediationServiceInstance){
        const repository = container.resolve<IRelationshipRemediationRepository>(SERVICE_KEYS.RelationshipRemediationRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _relationshipRemediationServiceInstance = new RelationshipRemediationService(repository, anonymizationService);
    }
    return _relationshipRemediationServiceInstance;
}
