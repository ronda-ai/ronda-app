
import { MongooseAttendanceRepository } from "../infrastructure/persistence/mongoose/attendance.repository";
import { IAttendanceRepository } from '../domain/interfaces/attendance-repository.interface';
import { AttendanceEncryptionRepository } from '../infrastructure/persistence/mongoose/attendance-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _attendanceRepositoryInstance: IAttendanceRepository;

export function createAttendanceRepository(): IAttendanceRepository {
    if(!_attendanceRepositoryInstance){
        const mongooseRepository = new MongooseAttendanceRepository();
        const encryptionService = new EncryptionService();
        _attendanceRepositoryInstance = new AttendanceEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _attendanceRepositoryInstance;
}
