
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { MoodTrendAnalysisService } from "../application/mood-trend-analysis.service";
import { IMoodTrendAnalysisRepository } from "../domain/interfaces/mood-trend-analysis-repository.interface";
import { IMoodTrendAnalysisService } from '../domain/interfaces/mood-trend-analysis-service.interface';
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _moodTrendAnalysisServiceInstance: IMoodTrendAnalysisService;

export function createMoodTrendAnalysisService(): IMoodTrendAnalysisService {
    if(!_moodTrendAnalysisServiceInstance){
        const repository = container.resolve<IMoodTrendAnalysisRepository>(SERVICE_KEYS.MoodTrendAnalysisRepository);
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        const challengeService = container.resolve<IChallengeService>(SERVICE_KEYS.ChallengeService);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _moodTrendAnalysisServiceInstance = new MoodTrendAnalysisService(repository, studentService, challengeService, anonymizationService);
    }
    return _moodTrendAnalysisServiceInstance;
}
