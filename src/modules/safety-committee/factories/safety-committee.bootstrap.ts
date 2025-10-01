import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createSafetyCommitteeRepository } from './safety-committee-repository.factory';
import { createSafetyCommitteeService } from './safety-committee-service.factory';

export function bootstrapSafetyCommitteeModule(): void {
  container.register(SERVICE_KEYS.SafetyCommitteeRepository, createSafetyCommitteeRepository);
  container.register(SERVICE_KEYS.SafetyCommitteeService, createSafetyCommitteeService);
}
