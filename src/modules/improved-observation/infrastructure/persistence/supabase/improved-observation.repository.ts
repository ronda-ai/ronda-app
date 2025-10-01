import { IImprovedObservationRepository } from "../../../domain/interfaces/improved-observation-repository.interface";
import { CreateImprovedObservationDTO } from "../../../application/dtos/create-improved-observation.dto";
import { ImprovedObservation } from "../../../domain/improved-observation.entity";

export class SupabaseImprovedObservationRepository implements IImprovedObservationRepository {
    async create(data: CreateImprovedObservationDTO): Promise<ImprovedObservation> {
        throw new Error("Method not implemented.");
    }
}
