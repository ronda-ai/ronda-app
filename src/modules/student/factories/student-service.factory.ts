
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { StudentService } from "../application/student.service";
import { IStudentRepository } from "../domain/interfaces/student-repository.interface";
import { IParticipationService } from "@/modules/participation/domain/interfaces/participation-service.interface";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { IPersonalizedActivityService } from "@/modules/personalized-activity/domain/interfaces/personalized-activity-service.interface";
import { IObservationService } from "@/modules/observation/domain/interfaces/observation-service.interface";
import { ISupportPlanService } from "@/modules/support-plan/domain/interfaces/support-plan-service.interface";

import { IStudentService } from '../domain/interfaces/student-service.interface';
import { IFearManagementSuggestionService } from "@/modules/fear-management-suggestion/domain/interfaces/fear-management-suggestion-service.interface";

let _studentServiceInstance: IStudentService;

export function createStudentService(): IStudentService {
    if(!_studentServiceInstance){
        // Resolve dependencies from the container
        const studentRepository = container.resolve<IStudentRepository>(SERVICE_KEYS.StudentRepository);
        const participationService = container.resolve<IParticipationService>(SERVICE_KEYS.ParticipationService);
        const challengeService = container.resolve<IChallengeService>(SERVICE_KEYS.ChallengeService);
        const personalizedActivityService = container.resolve<IPersonalizedActivityService>(SERVICE_KEYS.PersonalizedActivityService);
        const observationService = container.resolve<IObservationService>(SERVICE_KEYS.ObservationService);
        const supportPlanService = container.resolve<ISupportPlanService>(SERVICE_KEYS.SupportPlanService);
        const fearManagementSuggestionService = container.resolve<IFearManagementSuggestionService>(SERVICE_KEYS.FearManagementSuggestionService);

        _studentServiceInstance = new StudentService(
            studentRepository,
            participationService,
            challengeService,
            personalizedActivityService,
            observationService,
            supportPlanService,
            fearManagementSuggestionService
        );
    }
    return _studentServiceInstance;
}
