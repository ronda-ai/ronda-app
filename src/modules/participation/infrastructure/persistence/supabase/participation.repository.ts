import { IParticipationRepository } from "../../../domain/interfaces/participation-repository.interface";
import { Participation } from "../../../domain/participation.entity";

export class SupabaseParticipationRepository implements IParticipationRepository {
    async create(studentId: any): Promise<Participation> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: any): Promise<Participation[]> {
        throw new Error("Method not implemented.");
    }
    async countByStudentId(studentId: any): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async delete(id: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteByStudentId(studentId: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async countByDateRange(startDate: Date, endDate: Date, studentIds: string[]): Promise<{ id: string; count: number; }[]> {
        throw new Error("Method not implemented.");
    }
}
