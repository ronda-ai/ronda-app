
import { dbConnect } from "@/lib/mongodb";
import { IActivityAdaptationRepository } from "../../../domain/interfaces/activity-adaptation-repository.interface";
import { CreateActivityAdaptationDTO } from "../../../application/dtos/create-activity-adaptation.dto";
import { ActivityAdaptation } from "../../../domain/activity-adaptation.entity";
import ActivityAdaptationModel, { IActivityAdaptationDocument } from "./activity-adaptation.schema";
import mongoose from "mongoose";

export class MongooseActivityAdaptationRepository implements IActivityAdaptationRepository {

    private toDomain(doc: IActivityAdaptationDocument): ActivityAdaptation {
        return new ActivityAdaptation(
            doc._id.toString(),
            doc.originalActivity,
            doc.suggestions,
            doc.createdAt,
            doc.updatedAt
        );
    }
    
    async create(data: CreateActivityAdaptationDTO): Promise<ActivityAdaptation> {
        await dbConnect();
        const newAdaptation = await ActivityAdaptationModel.create(data);
        return this.toDomain(newAdaptation);
    }

    async findAll(): Promise<ActivityAdaptation[]> {
        await dbConnect();
        const adaptations = await ActivityAdaptationModel.find().sort({ createdAt: -1 }).exec();
        return adaptations.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await ActivityAdaptationModel.findByIdAndDelete(id).exec();
    }
}
