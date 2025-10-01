
import { MongooseConcernAnalysisRepository } from "../infrastructure/persistence/mongoose/concern-analysis.repository";
import { IConcernAnalysisRepository } from '../domain/interfaces/concern-analysis-repository.interface';
import { ConcernAnalysisEncryptionRepository } from '../infrastructure/persistence/mongoose/concern-analysis-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _concernAnalysisRepositoryInstance: IConcernAnalysisRepository;

export function createConcernAnalysisRepository(): IConcernAnalysisRepository {
    if(!_concernAnalysisRepositoryInstance){
        const mongooseRepository = new MongooseConcernAnalysisRepository();
        const encryptionService = new EncryptionService();
        _concernAnalysisRepositoryInstance = new ConcernAnalysisEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _concernAnalysisRepositoryInstance;
}
