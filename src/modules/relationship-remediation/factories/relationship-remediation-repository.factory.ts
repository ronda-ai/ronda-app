
import { MongooseRelationshipRemediationRepository } from "../infrastructure/persistence/mongoose/relationship-remediation.repository";
import { IRelationshipRemediationRepository } from '../domain/interfaces/relationship-remediation-repository.interface';
import { RelationshipRemediationEncryptionRepository } from '../infrastructure/persistence/mongoose/relationship-remediation-encryption.repository';
import { EncryptionService } from '@/services/encryption.service';

let _relationshipRemediationRepositoryInstance: IRelationshipRemediationRepository;

export function createRelationshipRemediationRepository(): IRelationshipRemediationRepository {
    if(!_relationshipRemediationRepositoryInstance){
        const mongooseRepository = new MongooseRelationshipRemediationRepository();
        const encryptionService = new EncryptionService();
        _relationshipRemediationRepositoryInstance = new RelationshipRemediationEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _relationshipRemediationRepositoryInstance;
}

