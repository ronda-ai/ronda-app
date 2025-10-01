
import { dbConnect } from "@/lib/mongodb";
import { IPersonalizedActivityRepository } from "../../../domain/interfaces/personalized-activity-repository.interface";
import { CreatePersonalizedActivityDTO } from "../../../application/dtos/create-personalized-activity.dto";
import { PersonalizedActivity } from "../../../domain/personalized-activity.entity";
import PersonalizedActivityModel, { IPersonalizedActivityDocument } from "./personalized-activity.schema";
import mongoose from "mongoose";

export class MongoosePersonalizedActivityRepository implements IPersonalizedActivityRepository {

    private toDomain(doc: IPersonalizedActivityDocument): PersonalizedActivity {
        return new PersonalizedActivity(
            doc._id.toString(),
            doc.studentId,
            doc.topic,
            doc.skills,
            doc.themes,
            doc.activities,
            doc.createdAt,
            doc.updatedAt,
            doc.feedback
        );
    }
    
    async create(data: CreatePersonalizedActivityDTO): Promise<PersonalizedActivity> {
        await dbConnect();
        const newActivity = await PersonalizedActivityModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newActivity);
    }

    async findByStudentId(studentId: string): Promise<PersonalizedActivity[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const activities = await PersonalizedActivityModel.find({ studentId: new mongoose.Types.ObjectId(studentId) })
            .sort({ createdAt: -1 })
            .exec();
        return activities.map(this.toDomain);
    }
    
    async findAll(): Promise<PersonalizedActivity[]> {
        await dbConnect();
        const activities = await PersonalizedActivityModel.find()
            .sort({ createdAt: -1 })
            .exec();
        return activities.map(this.toDomain);
    }

    async findById(id: string): Promise<PersonalizedActivity | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await PersonalizedActivityModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    
    async update(id: string, data: Partial<PersonalizedActivity>): Promise<PersonalizedActivity | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        const doc = await PersonalizedActivityModel.findById(id);
        if (!doc) return null;

        // Apply updates to the document fields
        Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== '_id') {
                (doc as any)[key] = (data as any)[key];
            }
        });

        const updatedDoc = await doc.save();
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await PersonalizedActivityModel.findByIdAndDelete(id).exec();
    }
}
