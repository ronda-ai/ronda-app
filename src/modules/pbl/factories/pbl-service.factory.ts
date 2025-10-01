

import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { PblService } from "../application/pbl.service";
import { IPblRepository, ITeamFormationRepository } from "../domain/interfaces/pbl-repository.interface";
import { IPblService } from '../domain/interfaces/pbl-service.interface';
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _serviceInstance: IPblService;

export function createPblService(): IPblService {
    if(!_serviceInstance){
        const projectRepository = container.resolve<IPblRepository>(SERVICE_KEYS.PblRepository);
        const teamFormationRepository = container.resolve<ITeamFormationRepository>(SERVICE_KEYS.TeamFormationRepository);
        const aiConfigService = container.resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _serviceInstance = new PblService(projectRepository, teamFormationRepository, aiConfigService, studentService, anonymizationService);
    }
    return _serviceInstance;
}
