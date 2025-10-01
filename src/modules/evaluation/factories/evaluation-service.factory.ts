
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { EvaluationService } from "../application/evaluation.service";
import { IChallengeRepository } from "@/modules/challenge/domain/interfaces/challenge-repository.interface";
import { IEvaluationService } from '../domain/interfaces/evaluation-service.interface';

let _evaluationServiceInstance: IEvaluationService;

export function createEvaluationService(): IEvaluationService {
    if(!_evaluationServiceInstance){
        const challengeRepository = container.resolve<IChallengeRepository>(SERVICE_KEYS.ChallengeRepository);
        _evaluationServiceInstance = new EvaluationService(challengeRepository);
    }
    return _evaluationServiceInstance;
}
