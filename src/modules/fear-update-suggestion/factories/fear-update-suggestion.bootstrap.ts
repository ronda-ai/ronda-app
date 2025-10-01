
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createFearUpdateSuggestionRepository } from './fear-update-suggestion-repository.factory';
import { createFearUpdateSuggestionService } from './fear-update-suggestion-service.factory';

export function bootstrapFearUpdateSuggestionModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.FearUpdateSuggestionRepository, createFearUpdateSuggestionRepository);
  
  // Services
  container.register(SERVICE_KEYS.FearUpdateSuggestionService, createFearUpdateSuggestionService);
}
