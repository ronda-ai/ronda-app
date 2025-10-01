
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ParticipationService } from "../application/participation.service";
import { IParticipationRepository } from "../domain/interfaces/participation-repository.interface";
import { IParticipationService } from '../domain/interfaces/participation-service.interface';

let _participationServiceInstance: IParticipationService;

export function createParticipationService(): IParticipationService {
    if(!_participationServiceInstance){
        const repository = container.resolve<IParticipationRepository>(SERVICE_KEYS.ParticipationRepository);
        _participationServiceInstance = new ParticipationService(repository);
    }
    return _participationServiceInstance;
}
