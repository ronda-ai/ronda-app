
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createGroupActivitySuggestionRepository } from './group-activity-suggestion-repository.factory';
import { createGroupActivitySuggestionService } from './group-activity-suggestion-service.factory';

export function bootstrapGroupActivitySuggestionModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.GroupActivitySuggestionRepository, createGroupActivitySuggestionRepository);
  
  // Services
  container.register(SERVICE_KEYS.GroupActivitySuggestionService, createGroupActivitySuggestionService);
}
