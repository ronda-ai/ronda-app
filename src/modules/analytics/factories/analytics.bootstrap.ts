
import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { createAnalyticsService } from './analytics-service.factory';

export function bootstrapAnalyticsModule(): void {
  // Services
  container.register(SERVICE_KEYS.AnalyticsService, createAnalyticsService);
}
