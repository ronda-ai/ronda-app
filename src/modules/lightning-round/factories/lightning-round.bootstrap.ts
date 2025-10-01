
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createLightningRoundRepository } from './lightning-round-repository.factory';
import { createLightningRoundService } from './lightning-round-service.factory';

export function bootstrapLightningRoundModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.LightningRoundRepository, createLightningRoundRepository);
  
  // Services
  container.register(SERVICE_KEYS.LightningRoundService, createLightningRoundService);
}
