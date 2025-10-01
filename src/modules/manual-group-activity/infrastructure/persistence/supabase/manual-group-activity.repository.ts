import { IManualGroupActivityRepository } from "../../../domain/interfaces/manual-group-activity-repository.interface";
import { CreateManualGroupActivityDTO } from "../../../application/dtos/create-manual-group-activity.dto";
import { UpdateManualGroupActivityDTO } from "../../../application/dtos/update-manual-group-activity.dto";
import { ManualGroupActivity } from "../../../domain/manual-group-activity.entity";

export class SupabaseManualGroupActivityRepository implements IManualGroupActivityRepository {
    findById(id: string): Promise<ManualGroupActivity | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateManualGroupActivityDTO): Promise<ManualGroupActivity> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<ManualGroupActivity[]> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: UpdateManualGroupActivityDTO): Promise<ManualGroupActivity | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
