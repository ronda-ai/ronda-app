
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { CreateDigitalConvivialityActivityDTO } from "../../../application/dtos/create-digital-conviviality-activity.dto";
import { DigitalConvivialityActivity } from "../../../domain/digital-conviviality.entity";
import { getDigitalConvivialityActivityModel, IDigitalConvivialityActivityDocument } from "./digital-conviviality-activity.schema";
import { IDigitalConvivialityActivityRepository } from "../../../domain/interfaces/digital-conviviality-activity-repository.interface";

export class MongooseDigitalConvivialityActivityRepository implements IDigitalConvivialityActivityRepository {

    private toDomain(doc: IDigitalConvivialityActivityDocument): DigitalConvivialityActivity {
        return new DigitalConvivialityActivity(
            doc._id.toString(),
            doc.title,
            doc.introduction,
            doc.materials,
            doc.pedagogicalObjectives,
            doc.steps,
            doc.studentInstructions,
            doc.activityType,
            doc.createdAt,
            doc.updatedAt
        );
    }

    async create(data: CreateDigitalConvivialityActivityDTO): Promise<DigitalConvivialityActivity> {
        await dbConnect();
        const DigitalConvivialityActivityModel = getDigitalConvivialityActivityModel();
        const newActivity = await DigitalConvivialityActivityModel.create(data);
        return this.toDomain(newActivity);
    }

    async findAll(): Promise<DigitalConvivialityActivity[]> {
        await dbConnect();
        const DigitalConvivialityActivityModel = getDigitalConvivialityActivityModel();
        const activities = await DigitalConvivialityActivityModel.find().sort({ createdAt: -1 }).limit(20).exec();
        return activities.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        const DigitalConvivialityActivityModel = getDigitalConvivialityActivityModel();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await DigitalConvivialityActivityModel.findByIdAndDelete(id).exec();
    }
}
