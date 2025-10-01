
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createMoodTrendAnalysisRepository } from './mood-trend-analysis-repository.factory';
import { createMoodTrendAnalysisService } from './mood-trend-analysis-service.factory';

export function bootstrapMoodTrendAnalysisModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.MoodTrendAnalysisRepository, createMoodTrendAnalysisRepository);
  
  // Services
  container.register(SERVICE_KEYS.MoodTrendAnalysisService, createMoodTrendAnalysisService);
}
