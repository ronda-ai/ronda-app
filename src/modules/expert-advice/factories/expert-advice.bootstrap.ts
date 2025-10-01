
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createExpertAdviceService } from './expert-advice-service.factory';

export function bootstrapExpertAdviceModule(): void {
  // Services
  container.register(SERVICE_KEYS.ExpertAdviceService, createExpertAdviceService);
}
