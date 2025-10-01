
import { MongooseSafetyCommitteeRepository } from "../infrastructure/persistence/mongoose/safety-committee.repository";
import { ISafetyCommitteeRepository } from '../domain/interfaces/safety-committee-repository.interface';
import { SafetyCommitteeEncryptionRepository } from '../infrastructure/persistence/mongoose/safety-committee-encryption.repository';
import { EncryptionService } from '@/services/encryption.service';

let _repositoryInstance: ISafetyCommitteeRepository;

export function createSafetyCommitteeRepository(): ISafetyCommitteeRepository {
    if(!_repositoryInstance){
        const mongooseRepository = new MongooseSafetyCommitteeRepository();
        const encryptionService = new EncryptionService();
        _repositoryInstance = new SafetyCommitteeEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _repositoryInstance;
}
