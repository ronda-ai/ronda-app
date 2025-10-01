
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createMbeExpertRepository } from './mbe-expert-repository.factory';
import { createMbeExpertService } from './mbe-expert-service.factory';

export function bootstrapMbeExpertModule(): void {
  container.register(SERVICE_KEYS.MbeExpertRepository, createMbeExpertRepository);
  container.register(SERVICE_KEYS.MbeExpertService, createMbeExpertService);
}
