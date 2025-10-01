
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ObservationService } from "../application/observation.service";
import { IObservationRepository } from "../domain/interfaces/observation-repository.interface";
import { IObservationService } from '../domain/interfaces/observation-service.interface';

let _observationServiceInstance: IObservationService;

export function createObservationService(): IObservationService {
    if(!_observationServiceInstance){
        const repository = container.resolve<IObservationRepository>(SERVICE_KEYS.ObservationRepository);
        _observationServiceInstance = new ObservationService(repository);
    }
    return _observationServiceInstance;
}
