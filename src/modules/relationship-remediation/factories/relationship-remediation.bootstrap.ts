
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createRelationshipRemediationRepository } from './relationship-remediation-repository.factory';
import { createRelationshipRemediationService } from './relationship-remediation-service.factory';

export function bootstrapRelationshipRemediationModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.RelationshipRemediationRepository, createRelationshipRemediationRepository);
  
  // Services
  container.register(SERVICE_KEYS.RelationshipRemediationService, createRelationshipRemediationService);
}
