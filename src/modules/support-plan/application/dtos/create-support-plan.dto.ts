
import { SupportPlanStepDTO } from "./support-plan.dto";

export interface CreateSupportPlanDTO {
    studentId: string;
    steps: Pick<SupportPlanStepDTO, 'text' | 'status'>[];
    teacherFeedback?: string;
}
