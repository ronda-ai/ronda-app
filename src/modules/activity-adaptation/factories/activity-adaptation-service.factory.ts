
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ActivityAdaptationService } from "../application/activity-adaptation.service";
import { IActivityAdaptationRepository } from "../domain/interfaces/activity-adaptation-repository.interface";
import { IActivityAdaptationService } from '../domain/interfaces/activity-adaptation-service.interface';

let _activityAdaptationServiceInstance: IActivityAdaptationService;

export function createActivityAdaptationService(): IActivityAdaptationService {
    if(!_activityAdaptationServiceInstance){
        const repository = container.resolve<IActivityAdaptationRepository>(SERVICE_KEYS.ActivityAdaptationRepository);
        _activityAdaptationServiceInstance = new ActivityAdaptationService(repository);
    }
    return _activityAdaptationServiceInstance;
}
