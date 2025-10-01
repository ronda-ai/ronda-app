
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createLanguageSupportRepository } from './language-support-repository.factory';
import { createLanguageSupportService } from './language-support-service.factory';
import { LanguageSupportEventHandler } from '../application/language-support-event-handler';

export function bootstrapLanguageSupportModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.LanguageSupportRepository, createLanguageSupportRepository);
  
  // Services
  container.register(SERVICE_KEYS.LanguageSupportService, createLanguageSupportService);

  // Event Handlers
  new LanguageSupportEventHandler();
}
