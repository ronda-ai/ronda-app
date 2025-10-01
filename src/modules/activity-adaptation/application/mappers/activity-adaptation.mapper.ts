
import { ActivityAdaptation } from "../../domain/activity-adaptation.entity";
import { ActivityAdaptationDTO } from "../dtos/activity-adaptation.dto";

export class ActivityAdaptationMapper {
    public static toDTO(adaptation: ActivityAdaptation): ActivityAdaptationDTO {
        return {
            id: adaptation.id,
            originalActivity: adaptation.originalActivity,
            suggestions: adaptation.suggestions,
            createdAt: adaptation.createdAt.toISOString(),
        };
    }
}
