
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createQualitiesSuggestionRepository } from './qualities-suggestion-repository.factory';
import { createQualitiesSuggestionService } from './qualities-suggestion-service.factory';

export function bootstrapQualitiesSuggestionModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.QualitiesSuggestionRepository, createQualitiesSuggestionRepository);
  
  // Services
  container.register(SERVICE_KEYS.QualitiesSuggestionService, createQualitiesSuggestionService);
}
