
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createPersonalizedActivityRepository } from './personalized-activity-repository.factory';
import { createPersonalizedActivityService } from './personalized-activity-service.factory';

export function bootstrapPersonalizedActivityModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.PersonalizedActivityRepository, createPersonalizedActivityRepository);
  
  // Services
  container.register(SERVICE_KEYS.PersonalizedActivityService, createPersonalizedActivityService);
}
