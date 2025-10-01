
import { CreateImprovedObservationDTO } from "../../application/dtos/create-improved-observation.dto";
import { ImprovedObservation } from "../improved-observation.entity";

// This repository is a placeholder for now, as we are not persisting the improved observations.
export interface IImprovedObservationRepository {
    create(data: CreateImprovedObservationDTO): Promise<ImprovedObservation>;
}
