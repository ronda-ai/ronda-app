
import { MongooseActivityAdaptationRepository } from "../infrastructure/persistence/mongoose/activity-adaptation.repository";
import { IActivityAdaptationRepository } from '../domain/interfaces/activity-adaptation-repository.interface';
import { ActivityAdaptationEncryptionRepository } from '../infrastructure/persistence/mongoose/activity-adaptation-encryption.repository';
import { EncryptionService } from '@/services/encryption.service';

let _activityAdaptationRepositoryInstance: IActivityAdaptationRepository;

export function createActivityAdaptationRepository(): IActivityAdaptationRepository {
    if(!_activityAdaptationRepositoryInstance){
        const mongooseRepository = new MongooseActivityAdaptationRepository();
        const encryptionService = new EncryptionService();
        _activityAdaptationRepositoryInstance = new ActivityAdaptationEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _activityAdaptationRepositoryInstance;
}
