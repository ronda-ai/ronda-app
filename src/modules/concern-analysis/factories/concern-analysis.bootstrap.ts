
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createConcernAnalysisRepository } from './concern-analysis-repository.factory';
import { createConcernAnalysisService } from './concern-analysis-service.factory';

export function bootstrapConcernAnalysisModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.ConcernAnalysisRepository, createConcernAnalysisRepository);
  
  // Services
  container.register(SERVICE_KEYS.ConcernAnalysisService, createConcernAnalysisService);
}
