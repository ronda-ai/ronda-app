
import { MongooseSafetyProtocolRepository } from "../infrastructure/persistence/mongoose/safety-protocol.repository";
import { ISafetyProtocolRepository } from "../domain/interfaces/safety-protocol-repository.interface";
import { SafetyProtocolEncryptionRepository } from '../infrastructure/persistence/mongoose/safety-protocol-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _repositoryInstance: ISafetyProtocolRepository;

export function createSafetyProtocolRepository(): ISafetyProtocolRepository {
    if(!_repositoryInstance){
        const mongooseRepository = new MongooseSafetyProtocolRepository();
        const encryptionService = new EncryptionService();
        _repositoryInstance = new SafetyProtocolEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _repositoryInstance;
}
