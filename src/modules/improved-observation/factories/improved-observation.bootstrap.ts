
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createImprovedObservationRepository } from './improved-observation-repository.factory';
import { createImprovedObservationService } from './improved-observation-service.factory';

export function bootstrapImprovedObservationModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.ImprovedObservationRepository, createImprovedObservationRepository);
  
  // Services
  container.register(SERVICE_KEYS.ImprovedObservationService, createImprovedObservationService);
}
