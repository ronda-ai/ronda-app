
import { MongooseCurriculumActivityRepository } from "../infrastructure/persistence/mongoose/curriculum-activity.repository";
import { ICurriculumActivityRepository } from '../domain/interfaces/curriculum-activity-repository.interface';
import { CurriculumActivityEncryptionRepository } from '../infrastructure/persistence/mongoose/curriculum-activity-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _curriculumActivityRepositoryInstance: ICurriculumActivityRepository;

export function createCurriculumActivityRepository(): ICurriculumActivityRepository {
    if(!_curriculumActivityRepositoryInstance){
        const mongooseRepository = new MongooseCurriculumActivityRepository();
        const encryptionService = new EncryptionService();
        _curriculumActivityRepositoryInstance = new CurriculumActivityEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _curriculumActivityRepositoryInstance;
}
