import { IPersonalizedActivityRepository } from "../../../domain/interfaces/personalized-activity-repository.interface";
import { CreatePersonalizedActivityDTO } from "../../../application/dtos/create-personalized-activity.dto";
import { PersonalizedActivity } from "../../../domain/personalized-activity.entity";

export class SupabasePersonalizedActivityRepository implements IPersonalizedActivityRepository {
    findAll(): Promise<PersonalizedActivity[]> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreatePersonalizedActivityDTO): Promise<PersonalizedActivity> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<PersonalizedActivity[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<PersonalizedActivity | null> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: Partial<Omit<PersonalizedActivity, "id" | "studentId" | "createdAt" | "updatedAt">>): Promise<PersonalizedActivity | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
