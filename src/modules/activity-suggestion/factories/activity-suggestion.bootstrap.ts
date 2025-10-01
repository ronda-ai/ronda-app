
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createActivitySuggestionRepository } from './activity-suggestion-repository.factory';
import { createActivitySuggestionService } from './activity-suggestion-service.factory';

export function bootstrapActivitySuggestionModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.ActivitySuggestionRepository, createActivitySuggestionRepository);
  
  // Services
  container.register(SERVICE_KEYS.ActivitySuggestionService, createActivitySuggestionService);
}
