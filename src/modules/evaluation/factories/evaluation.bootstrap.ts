
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createEvaluationService } from './evaluation-service.factory';

export function bootstrapEvaluationModule(): void {
  // Services
  container.register(SERVICE_KEYS.EvaluationService, createEvaluationService);
}
