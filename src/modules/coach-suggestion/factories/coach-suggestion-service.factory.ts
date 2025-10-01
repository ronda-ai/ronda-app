
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { CoachSuggestionService } from "../application/coach-suggestion.service";
import { ICoachSuggestionRepository } from "../domain/interfaces/coach-suggestion-repository.interface";
import { ICoachSuggestionService } from '../domain/interfaces/coach-suggestion-service.interface';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';

let _coachSuggestionServiceInstance: ICoachSuggestionService;

export function createCoachSuggestionService(): ICoachSuggestionService {
    if(!_coachSuggestionServiceInstance){
        const repository = container.resolve<ICoachSuggestionRepository>(SERVICE_KEYS.CoachSuggestionRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _coachSuggestionServiceInstance = new CoachSuggestionService(repository, anonymizationService);
    }
    return _coachSuggestionServiceInstance;
}
