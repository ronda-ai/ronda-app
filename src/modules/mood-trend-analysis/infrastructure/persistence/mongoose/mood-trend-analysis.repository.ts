
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IMoodTrendAnalysisRepository } from "../../../domain/interfaces/mood-trend-analysis-repository.interface";
import MoodTrendAnalysisModel, { IMoodTrendAnalysisDocument } from "./mood-trend-analysis.schema";
import { MoodTrendAnalysis } from "../../../domain/mood-trend-analysis.entity";
import { CreateMoodTrendAnalysisDTO } from "../../../application/dtos/create-mood-trend-analysis.dto";

export class MongooseMoodTrendAnalysisRepository implements IMoodTrendAnalysisRepository {

    private toDomain(doc: IMoodTrendAnalysisDocument): MoodTrendAnalysis {
        return new MoodTrendAnalysis(
            doc._id.toString(),
            doc.analysis,
            doc.isClassroomLevel,
            doc.createdAt,
            doc.studentId,
        );
    }

    async create(data: CreateMoodTrendAnalysisDTO): Promise<MoodTrendAnalysis> {
        await dbConnect();
        const payload: any = {
            analysis: data.analysis,
            isClassroomLevel: data.isClassroomLevel,
        };
        if (data.studentId) {
            payload.studentId = new mongoose.Types.ObjectId(data.studentId);
        }
        const newAnalysis = await MoodTrendAnalysisModel.create(payload);
        return this.toDomain(newAnalysis);
    }

    async findByStudentId(studentId: string): Promise<MoodTrendAnalysis[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const analyses = await MoodTrendAnalysisModel.find({ 
            studentId: new mongoose.Types.ObjectId(studentId),
            isClassroomLevel: false 
        }).sort({ createdAt: -1 }).exec();
        return analyses.map(this.toDomain);
    }
    
    async findClassroomLevel(): Promise<MoodTrendAnalysis[]> {
        await dbConnect();
        const analyses = await MoodTrendAnalysisModel.find({ isClassroomLevel: true }).sort({ createdAt: -1 }).exec();
        return analyses.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await MoodTrendAnalysisModel.findByIdAndDelete(id).exec();
    }
}
