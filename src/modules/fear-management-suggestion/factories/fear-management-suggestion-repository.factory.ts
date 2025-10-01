
import { MongooseFearManagementSuggestionRepository } from "../infrastructure/persistence/mongoose/fear-management-suggestion.repository";
import { IFearManagementSuggestionRepository } from '../domain/interfaces/fear-management-suggestion-repository.interface';
import { FearManagementSuggestionEncryptionRepository } from '../infrastructure/persistence/mongoose/fear-management-suggestion-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _fearManagementSuggestionRepositoryInstance: IFearManagementSuggestionRepository;

export function createFearManagementSuggestionRepository(): IFearManagementSuggestionRepository {
    if(!_fearManagementSuggestionRepositoryInstance){
        const mongooseRepository = new MongooseFearManagementSuggestionRepository();
        const encryptionService = new EncryptionService();
        _fearManagementSuggestionRepositoryInstance = new FearManagementSuggestionEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _fearManagementSuggestionRepositoryInstance;
}
