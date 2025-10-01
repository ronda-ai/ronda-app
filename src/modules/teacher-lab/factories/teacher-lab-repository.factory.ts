
import { MongooseTeacherLabRepository } from "../infrastructure/persistence/mongoose/teacher-lab.repository";
import { ITeacherLabRepository } from '../domain/interfaces/teacher-lab-repository.interface';
import { TeacherLabEncryptionRepository } from '../infrastructure/persistence/mongoose/teacher-lab-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _repositoryInstance: ITeacherLabRepository;

export function createTeacherLabRepository(): ITeacherLabRepository {
    if(!_repositoryInstance){
        const mongooseRepository = new MongooseTeacherLabRepository();
        const encryptionService = new EncryptionService();
        _repositoryInstance = new TeacherLabEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _repositoryInstance;
}
