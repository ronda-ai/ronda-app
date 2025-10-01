import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createTestSubmissionRepository } from './test-submission-repository.factory';
import { createTestSubmissionService } from './test-submission-service.factory';

export function bootstrapTestSubmissionModule(): void {
  container.register(
    SERVICE_KEYS.TestSubmissionRepository,
    createTestSubmissionRepository
  );
  container.register(
    SERVICE_KEYS.TestSubmissionService,
    createTestSubmissionService
  );
}
