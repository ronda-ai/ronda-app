
import { CreateObservationDTO } from "../../application/dtos/create-observation.dto";
import { Observation } from "../observation.entity";

export interface IObservationRepository {
    create(data: CreateObservationDTO): Promise<Observation>;
    findByStudentId(studentId: string): Promise<Observation[]>;
    delete(id: string): Promise<void>;
}
