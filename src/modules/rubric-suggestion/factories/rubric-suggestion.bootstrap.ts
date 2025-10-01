
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createRubricSuggestionRepository } from './rubric-suggestion-repository.factory';
import { createRubricSuggestionService } from './rubric-suggestion-service.factory';

export function bootstrapRubricSuggestionModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.RubricSuggestionRepository, createRubricSuggestionRepository);
  
  // Services
  container.register(SERVICE_KEYS.RubricSuggestionService, createRubricSuggestionService);
}
