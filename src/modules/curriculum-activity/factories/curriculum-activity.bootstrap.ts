

import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createCurriculumActivityRepository } from './curriculum-activity-repository.factory';
import { createCurriculumActivityService } from './curriculum-activity-service.factory';

export function bootstrapCurriculumActivityModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.CurriculumActivityRepository, createCurriculumActivityRepository);
  
  // Services
  container.register(SERVICE_KEYS.CurriculumActivityService, createCurriculumActivityService);
}
