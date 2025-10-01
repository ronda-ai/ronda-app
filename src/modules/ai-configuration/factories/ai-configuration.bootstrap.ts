
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createAIConfigurationRepository } from './ai-configuration-repository.factory';
import { createAIConfigurationService } from './ai-configuration-service.factory';

export function bootstrapAIConfigurationModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.AIConfigurationRepository, createAIConfigurationRepository);
  
  // Services
  container.register(SERVICE_KEYS.AIConfigurationService, createAIConfigurationService);
}
