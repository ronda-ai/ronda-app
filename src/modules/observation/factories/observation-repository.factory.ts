
import { MongooseObservationRepository } from "../infrastructure/persistence/mongoose/observation.repository";
import { IObservationRepository } from '../domain/interfaces/observation-repository.interface';
import { ObservationEncryptionRepository } from '../infrastructure/persistence/mongoose/observation-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _observationRepositoryInstance: IObservationRepository;

export function createObservationRepository(): IObservationRepository {
    if(!_observationRepositoryInstance){
        const mongooseRepository = new MongooseObservationRepository();
        const encryptionService = new EncryptionService();
        _observationRepositoryInstance = new ObservationEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _observationRepositoryInstance;
}
