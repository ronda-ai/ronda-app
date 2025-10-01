import { ISupportPlanRepository } from "../../../domain/interfaces/support-plan-repository.interface";
import { CreateSupportPlanDTO } from "../../../application/dtos/create-support-plan.dto";
import { SupportPlan } from "../../../domain/support-plan.entity";

export class SupabaseSupportPlanRepository implements ISupportPlanRepository {
    async create(data: CreateSupportPlanDTO): Promise<SupportPlan> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<SupportPlan | null> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<SupportPlan[]> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: Partial<Omit<SupportPlan, "id" | "studentId" | "createdAt" | "updatedAt">>): Promise<SupportPlan | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
