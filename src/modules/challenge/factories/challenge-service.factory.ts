
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ChallengeService } from "../application/challenge.service";
import { IChallengeRepository } from "../domain/interfaces/challenge-repository.interface";
import { IChallengeService } from '../domain/interfaces/challenge-service.interface';

let _challengeServiceInstance: IChallengeService;

export function createChallengeService(): IChallengeService {
    if(!_challengeServiceInstance){
        const repository = container.resolve<IChallengeRepository>(SERVICE_KEYS.ChallengeRepository);
        _challengeServiceInstance = new ChallengeService(repository);
    }
    return _challengeServiceInstance;
}
