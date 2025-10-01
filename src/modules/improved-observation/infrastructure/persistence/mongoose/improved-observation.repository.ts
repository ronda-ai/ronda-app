
import { IImprovedObservationRepository } from "../../../domain/interfaces/improved-observation-repository.interface";
import { CreateImprovedObservationDTO } from "../../../application/dtos/create-improved-observation.dto";
import { ImprovedObservation } from "../../../domain/improved-observation.entity";

// This is a mock repository as we are not persisting improved observations.
export class MongooseImprovedObservationRepository implements IImprovedObservationRepository {

    async create(data: CreateImprovedObservationDTO): Promise<ImprovedObservation> {
        // Mock implementation, does not interact with the database.
        return new ImprovedObservation(
            Date.now().toString(),
            data.originalObservation,
            data.improvedObservation,
            new Date(),
            new Date()
        );
    }
}
