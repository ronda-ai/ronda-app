
import { DigitalPact } from '../../domain/digital-conviviality.entity';

export type CreateDigitalPactDTO = Omit<DigitalPact, 'id' | 'createdAt' | 'updatedAt'>;
