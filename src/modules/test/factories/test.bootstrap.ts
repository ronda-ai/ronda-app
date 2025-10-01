
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createTestRepository } from './test-repository.factory';
import { createTestService } from './test-service.factory';

export function bootstrapTestModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.TestRepository, createTestRepository);
  
  // Services
  container.register(SERVICE_KEYS.TestService, createTestService);
}
