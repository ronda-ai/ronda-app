
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createExportService } from './export-service.factory';

export function bootstrapExportModule(): void {
  // Services
  container.register(SERVICE_KEYS.ExportService, createExportService);
}
