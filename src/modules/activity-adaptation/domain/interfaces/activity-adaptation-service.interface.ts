
import { CreateActivityAdaptationDTO } from "../../application/dtos/create-activity-adaptation.dto";
import { ActivityAdaptationDTO } from "../../application/dtos/activity-adaptation.dto";

export interface IActivityAdaptationService {
    createAdaptation(dto: CreateActivityAdaptationDTO, language: string): Promise<ActivityAdaptationDTO>;
    getAllAdaptations(): Promise<ActivityAdaptationDTO[]>;
    deleteAdaptation(id: string): Promise<void>;
}
