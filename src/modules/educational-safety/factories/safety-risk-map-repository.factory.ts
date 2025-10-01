
import { MongooseSafetyRiskMapRepository } from "../infrastructure/persistence/mongoose/safety-risk-map.repository";
import { ISafetyRiskMapRepository } from "../domain/interfaces/safety-risk-map-repository.interface";
import { SafetyRiskMapEncryptionRepository } from '../infrastructure/persistence/mongoose/safety-risk-map-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _repositoryInstance: ISafetyRiskMapRepository;

export function createSafetyRiskMapRepository(): ISafetyRiskMapRepository {
    if(!_repositoryInstance){
        const mongooseRepository = new MongooseSafetyRiskMapRepository();
        const encryptionService = new EncryptionService();
        _repositoryInstance = new SafetyRiskMapEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _repositoryInstance;
}
