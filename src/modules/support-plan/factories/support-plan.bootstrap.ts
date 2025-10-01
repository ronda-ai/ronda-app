
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createSupportPlanRepository } from './support-plan-repository.factory';
import { createSupportPlanService } from './support-plan-service.factory';

export function bootstrapSupportPlanModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.SupportPlanRepository, createSupportPlanRepository);
  
  // Services
  container.register(SERVICE_KEYS.SupportPlanService, createSupportPlanService);
}
