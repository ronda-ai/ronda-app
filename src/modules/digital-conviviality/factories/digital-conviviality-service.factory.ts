import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { DigitalConvivialityService } from "../application/digital-conviviality.service";
import { IDigitalConvivialityService } from "../domain/interfaces/digital-conviviality-service.interface";
import { IDigitalConvivialityActivityRepository } from '../domain/interfaces/digital-conviviality-activity-repository.interface';
import { IDigitalConflictScenarioRepository } from '../domain/interfaces/digital-conflict-scenario-repository.interface';
import { IDigitalPactRepository } from '../domain/interfaces/digital-pact-repository.interface';

let _serviceInstance: IDigitalConvivialityService;

export function createDigitalConvivialityService(): IDigitalConvivialityService {
    if(!_serviceInstance){
        const activityRepository = container.resolve<IDigitalConvivialityActivityRepository>(SERVICE_KEYS.DigitalConvivialityActivityRepository);
        const scenarioRepository = container.resolve<IDigitalConflictScenarioRepository>(SERVICE_KEYS.DigitalConflictScenarioRepository);
        const pactRepository = container.resolve<IDigitalPactRepository>(SERVICE_KEYS.DigitalPactRepository);
        _serviceInstance = new DigitalConvivialityService(activityRepository, scenarioRepository, pactRepository);
    }
    return _serviceInstance;
}
