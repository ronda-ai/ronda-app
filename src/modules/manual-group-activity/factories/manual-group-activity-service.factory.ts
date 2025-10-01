
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ManualGroupActivityService } from '../application/manual-group-activity.service';
import { IManualGroupActivityRepository } from '../domain/interfaces/manual-group-activity-repository.interface';
import { IManualGroupActivityService } from '../domain/interfaces/manual-group-activity-service.interface';
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

let _manualGroupActivityServiceInstance: IManualGroupActivityService;

export function createManualGroupActivityService(): IManualGroupActivityService {
    if(!_manualGroupActivityServiceInstance){
        const repository = container.resolve<IManualGroupActivityRepository>(SERVICE_KEYS.ManualGroupActivityRepository);
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        const aiConfigService = container.resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
        _manualGroupActivityServiceInstance = new ManualGroupActivityService(repository, studentService, anonymizationService, aiConfigService);
    }
    return _manualGroupActivityServiceInstance;
}
