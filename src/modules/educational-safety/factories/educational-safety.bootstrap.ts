
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createEducationalSafetyService } from './educational-safety-service.factory';
import { createSafetyRiskMapRepository } from './safety-risk-map-repository.factory';
import { createSafetyProtocolRepository } from './safety-protocol-repository.factory';
import { createCrisisScenarioRepository } from './crisis-scenario-repository.factory';

export function bootstrapEducationalSafetyModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.SafetyRiskMapRepository, createSafetyRiskMapRepository);
  container.register(SERVICE_KEYS.SafetyProtocolRepository, createSafetyProtocolRepository);
  container.register(SERVICE_KEYS.CrisisScenarioRepository, createCrisisScenarioRepository);

  // Services
  container.register(SERVICE_KEYS.EducationalSafetyService, createEducationalSafetyService);
}
