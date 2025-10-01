
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { DebateService } from "../application/debate.service";
import { IDebateRepository } from "../domain/interfaces/debate-repository.interface";
import { IDebateService } from '../domain/interfaces/debate-service.interface';

let _debateServiceInstance: IDebateService;

export function createDebateService(): IDebateService {
    if(!_debateServiceInstance){
        const repository = container.resolve<IDebateRepository>(SERVICE_KEYS.DebateRepository);
        _debateServiceInstance = new DebateService(repository);
    }
    return _debateServiceInstance;
}
