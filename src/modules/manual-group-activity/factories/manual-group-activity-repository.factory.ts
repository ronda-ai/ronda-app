
import { MongooseManualGroupActivityRepository } from '../infrastructure/persistence/mongoose/manual-group-activity.repository';
import { IManualGroupActivityRepository } from '../domain/interfaces/manual-group-activity-repository.interface';
import { ManualGroupActivityEncryptionRepository } from '../infrastructure/persistence/mongoose/manual-group-activity-encryption.repository';
import { EncryptionService } from '@/services/encryption.service';

let _manualGroupActivityRepositoryInstance: IManualGroupActivityRepository;

export function createManualGroupActivityRepository(): IManualGroupActivityRepository {
    if(!_manualGroupActivityRepositoryInstance){
        const mongooseRepository = new MongooseManualGroupActivityRepository();
        const encryptionService = new EncryptionService();
        _manualGroupActivityRepositoryInstance = new ManualGroupActivityEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _manualGroupActivityRepositoryInstance;
}
