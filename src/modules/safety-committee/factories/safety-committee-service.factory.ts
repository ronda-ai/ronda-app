
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { SafetyCommitteeService } from "../application/safety-committee.service";
import { ISafetyCommitteeRepository } from "../domain/interfaces/safety-committee-repository.interface";
import { ISafetyCommitteeService } from '../domain/interfaces/safety-committee-service.interface';
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _serviceInstance: ISafetyCommitteeService;

export function createSafetyCommitteeService(): ISafetyCommitteeService {
    if(!_serviceInstance){
        const repository = container.resolve<ISafetyCommitteeRepository>(SERVICE_KEYS.SafetyCommitteeRepository);
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _serviceInstance = new SafetyCommitteeService(repository, studentService, anonymizationService);
    }
    return _serviceInstance;
}
