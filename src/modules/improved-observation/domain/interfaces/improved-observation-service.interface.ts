
import { ImprovedObservationDTO } from "../../application/dtos/improved-observation.dto";

export interface IImprovedObservationService {
    getImprovedObservation(
        observationText: string, 
        studentName: string | undefined, 
        language: string,
        ageOrGrade?: string,
        subject?: string,
        country?: string
    ): Promise<ImprovedObservationDTO>;
}
