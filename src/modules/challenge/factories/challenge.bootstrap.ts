
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createChallengeRepository } from './challenge-repository.factory';
import { createChallengeService } from './challenge-service.factory';

export function bootstrapChallengeModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.ChallengeRepository, createChallengeRepository);
  
  // Services
  container.register(SERVICE_KEYS.ChallengeService, createChallengeService);
}
