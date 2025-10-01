
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ConcernAnalysisService } from "../application/concern-analysis.service";
import { IConcernAnalysisRepository } from "../domain/interfaces/concern-analysis-repository.interface";
import { IConcernAnalysisService } from '../domain/interfaces/concern-analysis-service.interface';
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _concernAnalysisServiceInstance: IConcernAnalysisService;

export function createConcernAnalysisService(): IConcernAnalysisService {
    if(!_concernAnalysisServiceInstance){
        const repository = container.resolve<IConcernAnalysisRepository>(SERVICE_KEYS.ConcernAnalysisRepository);
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        const challengeService = container.resolve<IChallengeService>(SERVICE_KEYS.ChallengeService);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _concernAnalysisServiceInstance = new ConcernAnalysisService(repository, studentService, challengeService, anonymizationService);
    }
    return _concernAnalysisServiceInstance;
}
