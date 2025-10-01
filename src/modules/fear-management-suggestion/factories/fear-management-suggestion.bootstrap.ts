
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createFearManagementSuggestionRepository } from './fear-management-suggestion-repository.factory';
import { createFearManagementSuggestionService } from './fear-management-suggestion-service.factory';

export function bootstrapFearManagementSuggestionModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.FearManagementSuggestionRepository, createFearManagementSuggestionRepository);
  
  // Services
  container.register(SERVICE_KEYS.FearManagementSuggestionService, createFearManagementSuggestionService);
}
