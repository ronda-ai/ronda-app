

import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createPblRepository, createTeamFormationRepository } from './pbl-repository.factory';
import { createPblService } from './pbl-service.factory';

export function bootstrapPblModule(): void {
  container.register(SERVICE_KEYS.PblRepository, createPblRepository);
  container.register(SERVICE_KEYS.TeamFormationRepository, createTeamFormationRepository);
  container.register(SERVICE_KEYS.PblService, createPblService);
}
    