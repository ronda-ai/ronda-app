
import { MongooseSupportPlanRepository } from "../infrastructure/persistence/mongoose/support-plan.repository";
import { ISupportPlanRepository } from '../domain/interfaces/support-plan-repository.interface';
import { SupportPlanEncryptionRepository } from '../infrastructure/persistence/mongoose/support-plan-encryption.repository';
import { EncryptionService } from '@/services/encryption.service';

let _supportPlanRepositoryInstance: ISupportPlanRepository;

export function createSupportPlanRepository(): ISupportPlanRepository {
    if(!_supportPlanRepositoryInstance){
        const mongooseRepository = new MongooseSupportPlanRepository();
        const encryptionService = new EncryptionService();
        _supportPlanRepositoryInstance = new SupportPlanEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _supportPlanRepositoryInstance;
}
