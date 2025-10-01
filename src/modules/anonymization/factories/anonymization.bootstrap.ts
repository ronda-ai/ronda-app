
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createAnonymizationService } from './anonymization-service.factory';

export function bootstrapAnonymizationModule(): void {
  // Services
  container.register(SERVICE_KEYS.AnonymizationService, createAnonymizationService);
}
