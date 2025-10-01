
import { CreateSupportPlanDTO } from "../../application/dtos/create-support-plan.dto";
import { SupportPlan } from "../support-plan.entity";

export interface ISupportPlanRepository {
    create(data: CreateSupportPlanDTO): Promise<SupportPlan>;
    findById(id: string): Promise<SupportPlan | null>;
    findByStudentId(studentId: string): Promise<SupportPlan[]>;
    update(id: string, data: Partial<Omit<SupportPlan, 'id'|'studentId'|'createdAt'|'updatedAt'>>): Promise<SupportPlan | null>;
    delete(id: string): Promise<void>;
}
