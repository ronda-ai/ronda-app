
import { CreateActivityAdaptationDTO } from "../../application/dtos/create-activity-adaptation.dto";
import { ActivityAdaptation } from "../activity-adaptation.entity";

export interface IActivityAdaptationRepository {
    create(data: CreateActivityAdaptationDTO): Promise<ActivityAdaptation>;
    findAll(): Promise<ActivityAdaptation[]>;
    delete(id: string): Promise<void>;
}
