

import { dbConnect } from "@/lib/mongodb";
import { ICurriculumActivityRepository } from "../../../domain/interfaces/curriculum-activity-repository.interface";
import { CreateCurriculumActivityDTO } from "../../../application/dtos/create-curriculum-activity.dto";
import { CurriculumActivity } from "../../../domain/curriculum-activity.entity";
import CurriculumActivityModel, { ICurriculumActivityDocument } from "./curriculum-activity.schema";
import mongoose from "mongoose";

export class MongooseCurriculumActivityRepository implements ICurriculumActivityRepository {

    private toDomain(doc: ICurriculumActivityDocument): CurriculumActivity {
        return new CurriculumActivity(
            doc._id.toString(),
            doc.topic,
            doc.skills,
            doc.language,
            doc.activities,
            doc.createdAt,
            doc.updatedAt,
            doc.ageOrGrade,
            doc.country,
            doc.subject,
            doc.feedback,
            doc.complexity,
            doc.duration,
            doc.learningModality,
            doc.socialDynamic,
            doc.bloomLevel,
            doc.resourceConstraints
        );
    }
    
    async create(data: CreateCurriculumActivityDTO): Promise<CurriculumActivity> {
        await dbConnect();
        const newActivity = await CurriculumActivityModel.create(data);
        return this.toDomain(newActivity);
    }

    async findAll(): Promise<CurriculumActivity[]> {
        await dbConnect();
        const activities = await CurriculumActivityModel.find().sort({ createdAt: -1 }).exec();
        return activities.map(this.toDomain);
    }

    async findById(id: string): Promise<CurriculumActivity | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await CurriculumActivityModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    
    async update(id: string, data: Partial<CurriculumActivity>): Promise<CurriculumActivity | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDoc = await CurriculumActivityModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedDoc) return null;
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await CurriculumActivityModel.findByIdAndDelete(id).exec();
    }
}