import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createStorageRepository } from './storage-repository.factory';
import { createStorageService } from './storage-service.factory';

export function bootstrapStorageModule(): void {
  // Repositories
  container.register(SERVICE_KEYS.StorageRepository, createStorageRepository);
  
  // Services
  container.register(SERVICE_KEYS.StorageService, createStorageService);
}
