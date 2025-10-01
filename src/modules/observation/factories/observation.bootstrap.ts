
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createObservationRepository } from './observation-repository.factory';
import { createObservationService } from './observation-service.factory';

export function bootstrapObservationModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.ObservationRepository, createObservationRepository);
  
  // Services
  container.register(SERVICE_KEYS.ObservationService, createObservationService);
}
