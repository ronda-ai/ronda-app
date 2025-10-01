import { CreateDigitalConvivialityActivityDTO } from "../../application/dtos/create-digital-conviviality-activity.dto";
import { DigitalConvivialityActivity } from "../digital-conviviality.entity";

export interface IDigitalConvivialityActivityRepository {
    create(data: CreateDigitalConvivialityActivityDTO): Promise<DigitalConvivialityActivity>;
    findAll(): Promise<DigitalConvivialityActivity[]>;
    delete(id: string): Promise<void>;
}
