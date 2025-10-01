
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ImprovedObservationService } from "../application/improved-observation.service";
import { IImprovedObservationRepository } from "../domain/interfaces/improved-observation-repository.interface";
import { IImprovedObservationService } from '../domain/interfaces/improved-observation-service.interface';

let _improvedObservationServiceInstance: IImprovedObservationService;

export function createImprovedObservationService(): IImprovedObservationService {
    if(!_improvedObservationServiceInstance){
        const repository = container.resolve<IImprovedObservationRepository>(SERVICE_KEYS.ImprovedObservationRepository);
        _improvedObservationServiceInstance = new ImprovedObservationService(repository);
    }
    return _improvedObservationServiceInstance;
}
