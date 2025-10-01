
import { MongooseStudentRepository } from "../infrastructure/persistence/mongoose/student.repository";
import { IStudentRepository } from '../domain/interfaces/student-repository.interface';
import { StudentEncryptionRepository } from '../infrastructure/persistence/mongoose/student-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _studentRepositoryInstance: IStudentRepository;

export function createStudentRepository(): IStudentRepository {
    if(!_studentRepositoryInstance){
        const mongooseRepository = new MongooseStudentRepository();
        const encryptionService = new EncryptionService();
        // Decorate the Mongoose repository with the encryption repository
        _studentRepositoryInstance = new StudentEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _studentRepositoryInstance;
}
