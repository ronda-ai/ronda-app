
import { SupportPlan } from "../../domain/support-plan.entity";
import { SupportPlanDTO } from "../dtos/support-plan.dto";

export class SupportPlanMapper {
    public static toDTO(plan: SupportPlan): SupportPlanDTO {
        return {
            id: plan.id,
            studentId: plan.studentId.toString(),
            steps: plan.steps.map(step => ({
                text: step.text,
                status: step.status,
                feedback: step.feedback,
            })),
            teacherFeedback: plan.teacherFeedback,
            createdAt: plan.createdAt.toISOString(),
            updatedAt: plan.updatedAt.toISOString(),
        };
    }
}

    