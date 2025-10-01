
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createDebateRepository } from './debate-repository.factory';
import { createDebateService } from './debate-service.factory';

export function bootstrapDebateModule(): void {
  container.register(SERVICE_KEYS.DebateRepository, createDebateRepository);
  container.register(SERVICE_KEYS.DebateService, createDebateService);
}
