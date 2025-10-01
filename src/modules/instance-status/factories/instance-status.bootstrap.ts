
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createInstanceStatusRepository } from './instance-status-repository.factory';
import { createInstanceStatusService } from './instance-status-service.factory';

export function bootstrapInstanceStatusModule(): void {
  container.register(SERVICE_KEYS.InstanceStatusRepository, createInstanceStatusRepository);
  container.register(SERVICE_KEYS.InstanceStatusService, createInstanceStatusService);
}
