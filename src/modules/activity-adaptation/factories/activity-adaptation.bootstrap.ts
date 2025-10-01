
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createActivityAdaptationRepository } from './activity-adaptation-repository.factory';
import { createActivityAdaptationService } from './activity-adaptation-service.factory';

export function bootstrapActivityAdaptationModule(): void {
  // Repositories
    container.register(SERVICE_KEYS.ActivityAdaptationRepository, createActivityAdaptationRepository);
      
        // Services
          container.register(SERVICE_KEYS.ActivityAdaptationService, createActivityAdaptationService);
          }
          