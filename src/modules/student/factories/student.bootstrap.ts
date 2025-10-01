
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createStudentRepository } from './student-repository.factory';
import { createStudentService } from './student-service.factory';

export function bootstrapStudentModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.StudentRepository, createStudentRepository);
  
  // Services
  container.register(SERVICE_KEYS.StudentService, createStudentService);
}
