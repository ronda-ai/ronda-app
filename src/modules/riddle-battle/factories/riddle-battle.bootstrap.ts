
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createRiddleBattleRepository } from './riddle-battle-repository.factory';
import { createRiddleBattleService } from './riddle-battle-service.factory';

export function bootstrapRiddleBattleModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.RiddleBattleRepository, createRiddleBattleRepository);
  
  // Services
  container.register(SERVICE_KEYS.RiddleBattleService, createRiddleBattleService);
}
