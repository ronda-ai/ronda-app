
import { ImprovedObservation } from "../../domain/improved-observation.entity";

export type CreateImprovedObservationDTO = Omit<ImprovedObservation, 'id' | 'createdAt' | 'updatedAt'>;
