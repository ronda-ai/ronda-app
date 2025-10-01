
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { InstanceStatusService } from "../application/instance-status.service";
import { IInstanceStatusRepository } from "../domain/interfaces/instance-status-repository.interface";
import { IInstanceStatusService } from "../domain/interfaces/instance-status-service.interface";

let _instanceStatusService: IInstanceStatusService;

export function createInstanceStatusService(): IInstanceStatusService {
    if (!_instanceStatusService) {
        const repository = container.resolve<IInstanceStatusRepository>(SERVICE_KEYS.InstanceStatusRepository);
        _instanceStatusService = new InstanceStatusService(repository);
    }
    return _instanceStatusService;
}
