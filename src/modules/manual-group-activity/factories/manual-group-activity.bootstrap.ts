
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createManualGroupActivityRepository } from './manual-group-activity-repository.factory';
import { createManualGroupActivityService } from './manual-group-activity-service.factory';

export function bootstrapManualGroupActivityModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.ManualGroupActivityRepository, createManualGroupActivityRepository);
  
  // Services
  container.register(SERVICE_KEYS.ManualGroupActivityService, createManualGroupActivityService);
}
