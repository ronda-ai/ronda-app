
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateSupportPlanDTO } from "../../application/dtos/create-support-plan.dto";
import { SupportPlanDTO, SupportPlanStepDTO } from "../../application/dtos/support-plan.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";

export interface ISupportPlanService {
    createSupportPlan(dto: CreateSupportPlanDTO): Promise<SupportPlanDTO>;
    getSupportPlansForStudent(studentId: string): Promise<SupportPlanDTO[]>;
    addFeedbackToPlan(planId: string, feedback: string): Promise<SupportPlanDTO | null>;
    updateStepDetails(planId: string, stepIndex: number, details: Partial<SupportPlanStepDTO>): Promise<SupportPlanDTO | null>;
    deleteSupportPlan(planId: string): Promise<void>;
    generateAndCreateSupportPlan(input: {
        student: StudentDTO,
        allStudents: StudentDTO[],
        previousPlans?: SupportPlanDTO[],
        observations: ObservationDTO[],
        language: string
    }): Promise<SupportPlanDTO>;
}
