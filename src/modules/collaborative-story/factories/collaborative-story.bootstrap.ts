
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createCollaborativeStoryRepository } from './collaborative-story-repository.factory';
import { createCollaborativeStoryService } from './collaborative-story-service.factory';
import { CollaborativeStoryEventHandler } from '../application/collaborative-story-event-handler';

export function bootstrapCollaborativeStoryModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.CollaborativeStoryRepository, createCollaborativeStoryRepository);
  
  // Services
  container.register(SERVICE_KEYS.CollaborativeStoryService, createCollaborativeStoryService);
  
  // Event Handlers
  new CollaborativeStoryEventHandler();
}
