

import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createParticipationRepository } from './participation-repository.factory';
import { createParticipationService } from './participation-service.factory';
import { ParticipationEventHandler } from '../application/participation-event-handler';

export function bootstrapParticipationModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.ParticipationRepository, createParticipationRepository);
  
  // Services
  container.register(SERVICE_KEYS.ParticipationService, createParticipationService);
  
  // Event Handlers
  new ParticipationEventHandler();
}
