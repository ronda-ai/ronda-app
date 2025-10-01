
import { MongoosePersonalizedActivityRepository } from "../infrastructure/persistence/mongoose/personalized-activity.repository";
import { IPersonalizedActivityRepository } from '../domain/interfaces/personalized-activity-repository.interface';
import { PersonalizedActivityEncryptionRepository } from '../infrastructure/persistence/mongoose/personalized-activity-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _personalizedActivityRepositoryInstance: IPersonalizedActivityRepository;

export function createPersonalizedActivityRepository(): IPersonalizedActivityRepository {
    if(!_personalizedActivityRepositoryInstance){
        const mongooseRepository = new MongoosePersonalizedActivityRepository();
        const encryptionService = new EncryptionService();
        _personalizedActivityRepositoryInstance = new PersonalizedActivityEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _personalizedActivityRepositoryInstance;
}
