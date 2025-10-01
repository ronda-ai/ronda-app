
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createTestAnalysisRepository } from './test-analysis-repository.factory';
import { createTestAnalysisService } from './test-analysis-service.factory';

export function bootstrapTestAnalysisModule(): void {
  container.register(SERVICE_KEYS.TestAnalysisRepository, createTestAnalysisRepository);
  container.register(SERVICE_KEYS.TestAnalysisService, createTestAnalysisService);
}
