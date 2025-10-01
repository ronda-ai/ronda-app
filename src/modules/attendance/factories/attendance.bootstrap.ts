
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createAttendanceRepository } from './attendance-repository.factory';
import { createAttendanceService } from './attendance-service.factory';

export function bootstrapAttendanceModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.AttendanceRepository, createAttendanceRepository);
  
  // Services
  container.register(SERVICE_KEYS.AttendanceService, createAttendanceService);
}
