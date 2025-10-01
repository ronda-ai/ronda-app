
import { MongooseAIConfigurationRepository } from "../infrastructure/persistence/mongoose/ai-configuration.repository";
import { IAIConfigurationRepository } from '../domain/interfaces/ai-configuration-repository.interface';
import { AIConfigurationEncryptionRepository } from '../infrastructure/persistence/mongoose/ai-configuration-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _aiConfigurationRepositoryInstance: IAIConfigurationRepository;

export function createAIConfigurationRepository(): IAIConfigurationRepository {
    if(!_aiConfigurationRepositoryInstance){
        const mongooseRepository = new MongooseAIConfigurationRepository();
        const encryptionService = new EncryptionService();
        _aiConfigurationRepositoryInstance = new AIConfigurationEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _aiConfigurationRepositoryInstance;
}
