
import { DigitalConvivialityActivity } from "../../domain/digital-conviviality.entity";
import { DigitalConvivialityActivityDTO } from "../dtos/digital-conviviality-activity.dto";

export class DigitalConvivialityActivityMapper {
    public static toDTO(activity: DigitalConvivialityActivity): DigitalConvivialityActivityDTO {
        return {
            id: activity.id,
            title: activity.title,
            introduction: activity.introduction,
            materials: activity.materials,
            pedagogicalObjectives: activity.pedagogicalObjectives,
            steps: activity.steps,
            studentInstructions: activity.studentInstructions,
            activityType: activity.activityType,
            customPrompt: activity.customPrompt,
            createdAt: activity.createdAt.toISOString(),
        };
    }
}
