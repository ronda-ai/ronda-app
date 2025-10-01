
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createFocusAreaRepository } from './focus-area-repository.factory';
import { createFocusAreaService } from './focus-area-service.factory';

export function bootstrapFocusAreaModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.FocusAreaRepository, createFocusAreaRepository);
  
  // Services
  container.register(SERVICE_KEYS.FocusAreaService, createFocusAreaService);
}
