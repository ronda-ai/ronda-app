
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { FocusAreaService } from "../application/focus-area.service";
import { IFocusAreaRepository } from "../domain/interfaces/focus-area-repository.interface";
import { IFocusAreaService } from '../domain/interfaces/focus-area-service.interface';
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

let _focusAreaServiceInstance: IFocusAreaService;

export function createFocusAreaService(): IFocusAreaService {
    if(!_focusAreaServiceInstance){
        const repository = container.resolve<IFocusAreaRepository>(SERVICE_KEYS.FocusAreaRepository);
        const aiConfigurationService = container.resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
        _focusAreaServiceInstance = new FocusAreaService(repository, aiConfigurationService);
    }
    return _focusAreaServiceInstance;
}
