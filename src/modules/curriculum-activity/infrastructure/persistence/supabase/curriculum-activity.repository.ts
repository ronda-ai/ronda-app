import { ICurriculumActivityRepository } from "../../../domain/interfaces/curriculum-activity-repository.interface";
import { CreateCurriculumActivityDTO } from "../../../application/dtos/create-curriculum-activity.dto";
import { CurriculumActivity } from "../../../domain/curriculum-activity.entity";

export class SupabaseCurriculumActivityRepository implements ICurriculumActivityRepository {
    async create(data: CreateCurriculumActivityDTO): Promise<CurriculumActivity> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<CurriculumActivity[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<CurriculumActivity | null> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: Partial<CurriculumActivity>): Promise<CurriculumActivity | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
