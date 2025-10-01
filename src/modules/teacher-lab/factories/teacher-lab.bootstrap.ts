

import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createTeacherLabService } from './teacher-lab-service.factory';
import { createTeacherLabRepository } from './teacher-lab-repository.factory';

export function bootstrapTeacherLabModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.TeacherLabRepository, createTeacherLabRepository);

  // Services
  container.register(SERVICE_KEYS.TeacherLabService, createTeacherLabService);
}
