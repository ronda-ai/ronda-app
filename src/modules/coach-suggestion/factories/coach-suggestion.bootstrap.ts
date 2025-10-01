
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createCoachSuggestionRepository } from './coach-suggestion-repository.factory';
import { createCoachSuggestionService } from './coach-suggestion-service.factory';

export function bootstrapCoachSuggestionModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.CoachSuggestionRepository, createCoachSuggestionRepository);
  
  // Services
  container.register(SERVICE_KEYS.CoachSuggestionService, createCoachSuggestionService);
}
