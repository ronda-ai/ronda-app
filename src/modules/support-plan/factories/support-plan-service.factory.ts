
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { SupportPlanService } from "../application/support-plan.service";
import { ISupportPlanRepository } from "../domain/interfaces/support-plan-repository.interface";
import { ISupportPlanService } from '../domain/interfaces/support-plan-service.interface';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _supportPlanServiceInstance: ISupportPlanService;

export function createSupportPlanService(): ISupportPlanService {
    if(!_supportPlanServiceInstance){
        const repository = container.resolve<ISupportPlanRepository>(SERVICE_KEYS.SupportPlanRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _supportPlanServiceInstance = new SupportPlanService(repository, anonymizationService);
    }
    return _supportPlanServiceInstance;
}
