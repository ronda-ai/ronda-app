
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IndividualRelationshipStrategyService } from "../application/individual-relationship-strategy.service";
import { IIndividualRelationshipStrategyRepository } from "../domain/interfaces/individual-relationship-strategy-repository.interface";
import { IIndividualRelationshipStrategyService } from '../domain/interfaces/individual-relationship-strategy-service.interface';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _serviceInstance: IIndividualRelationshipStrategyService;

export function createIndividualRelationshipStrategyService(): IIndividualRelationshipStrategyService {
    if(!_serviceInstance){
        const repository = container.resolve<IIndividualRelationshipStrategyRepository>(SERVICE_KEYS.IndividualRelationshipStrategyRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _serviceInstance = new IndividualRelationshipStrategyService(repository, anonymizationService);
    }
    return _serviceInstance;
}
