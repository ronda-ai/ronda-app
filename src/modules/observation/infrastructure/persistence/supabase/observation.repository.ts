import { IObservationRepository } from "../../../domain/interfaces/observation-repository.interface";
import { CreateObservationDTO } from "../../../application/dtos/create-observation.dto";
import { Observation } from "../../../domain/observation.entity";

export class SupabaseObservationRepository implements IObservationRepository {
    async create(data: CreateObservationDTO): Promise<Observation> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<Observation[]> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
