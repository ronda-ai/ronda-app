
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createIndividualRelationshipStrategyRepository } from './individual-relationship-strategy-repository.factory';
import { createIndividualRelationshipStrategyService } from './individual-relationship-strategy-service.factory';

export function bootstrapIndividualRelationshipStrategyModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.IndividualRelationshipStrategyRepository, createIndividualRelationshipStrategyRepository);
  
  // Services
  container.register(SERVICE_KEYS.IndividualRelationshipStrategyService, createIndividualRelationshipStrategyService);
}
