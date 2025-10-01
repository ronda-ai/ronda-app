
import { MongooseCoachSuggestionRepository } from "../infrastructure/persistence/mongoose/coach-suggestion.repository";
import { ICoachSuggestionRepository } from '../domain/interfaces/coach-suggestion-repository.interface';
import { CoachSuggestionEncryptionRepository } from '../infrastructure/persistence/mongoose/coach-suggestion-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _coachSuggestionRepositoryInstance: ICoachSuggestionRepository;

export function createCoachSuggestionRepository(): ICoachSuggestionRepository {
    if(!_coachSuggestionRepositoryInstance){
        const mongooseRepository = new MongooseCoachSuggestionRepository();
        const encryptionService = new EncryptionService();
        _coachSuggestionRepositoryInstance = new CoachSuggestionEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _coachSuggestionRepositoryInstance;
}
