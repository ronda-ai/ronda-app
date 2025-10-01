import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createDigitalConvivialityService } from './digital-conviviality-service.factory';
import { createDigitalConvivialityActivityRepository } from './digital-conviviality-activity-repository.factory';
import { createDigitalConflictScenarioRepository } from './digital-conflict-scenario-repository.factory';
import { createDigitalPactRepository } from './digital-pact-repository.factory';

export function bootstrapDigitalConvivialityModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.DigitalConvivialityActivityRepository, createDigitalConvivialityActivityRepository);
  container.register(SERVICE_KEYS.DigitalConflictScenarioRepository, createDigitalConflictScenarioRepository);
  container.register(SERVICE_KEYS.DigitalPactRepository, createDigitalPactRepository);
  
  // Service
  container.register(SERVICE_KEYS.DigitalConvivialityService, createDigitalConvivialityService);
}
