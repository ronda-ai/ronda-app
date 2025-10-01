

import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { TeacherLabService } from "../application/teacher-lab.service";
import { ITeacherLabService } from '../domain/interfaces/teacher-lab-service.interface';
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";
import { ITeacherLabRepository } from '../domain/interfaces/teacher-lab-repository.interface';

let _serviceInstance: ITeacherLabService;

export function createTeacherLabService(): ITeacherLabService {
    if(!_serviceInstance){
        const repository = container.resolve<ITeacherLabRepository>(SERVICE_KEYS.TeacherLabRepository);
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        const aiConfigService = container.resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _serviceInstance = new TeacherLabService(repository, studentService, aiConfigService, anonymizationService);
    }
    return _serviceInstance;
}
