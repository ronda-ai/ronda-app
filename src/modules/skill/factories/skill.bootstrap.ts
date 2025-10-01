
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createSkillRepository } from './skill-repository.factory';
import { createSkillService } from './skill-service.factory';

export function bootstrapSkillModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.SkillRepository, createSkillRepository);
  
  // Services
  container.register(SERVICE_KEYS.SkillService, createSkillService);
}
