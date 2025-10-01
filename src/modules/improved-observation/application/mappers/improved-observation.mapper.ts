
import { ImprovedObservation } from "../../domain/improved-observation.entity";
import { ImprovedObservationDTO } from "../dtos/improved-observation.dto";

export class ImprovedObservationMapper {
    public static toDTO(observation: ImprovedObservation): ImprovedObservationDTO {
        return {
            id: observation.id,
            originalObservation: observation.originalObservation,
            improvedObservation: observation.improvedObservation,
            createdAt: observation.createdAt.toISOString(),
        };
    }
}
