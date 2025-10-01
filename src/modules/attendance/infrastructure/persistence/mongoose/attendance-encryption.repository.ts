
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { SetAttendanceDTO } from '../../../application/dtos/set-attendance.dto';
import { Attendance } from '../../../domain/attendance.entity';
import { IAttendanceRepository } from '../../../domain/interfaces/attendance-repository.interface';

// This repository acts as a pass-through decorator to maintain architectural consistency.
// The Attendance entity currently has no fields that require encryption.
export class AttendanceEncryptionRepository implements IAttendanceRepository {
  constructor(
    private readonly decoratedRepository: IAttendanceRepository,
    private readonly encryptionService: IEncryptionService // Kept for consistency, though not used here.
  ) {}

  async set(data: SetAttendanceDTO): Promise<Attendance> {
    return this.decoratedRepository.set(data);
  }

  async setBulk(data: SetAttendanceDTO[]): Promise<void> {
    return this.decoratedRepository.setBulk(data);
  }

  async findByDate(date: Date): Promise<Attendance[]> {
    return this.decoratedRepository.findByDate(date);
  }

  async findByStudentAndDate(studentId: string, date: Date): Promise<Attendance | null> {
    return this.decoratedRepository.findByStudentAndDate(studentId, date);
  }

  async findByMonth(month: number, year: number): Promise<Attendance[]> {
    return this.decoratedRepository.findByMonth(month, year);
  }

  async findByDateRange(startDate: Date, endDate: Date, studentIds?: string[]): Promise<Attendance[]> {
    return this.decoratedRepository.findByDateRange(startDate, endDate, studentIds);
  }
}
