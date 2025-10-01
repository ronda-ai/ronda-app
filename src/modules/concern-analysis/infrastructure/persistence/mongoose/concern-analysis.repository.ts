
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IConcernAnalysisRepository } from "../../../domain/interfaces/concern-analysis-repository.interface";
import { ConcernAnalysis } from "../../../domain/concern-analysis.entity";
import { CreateConcernAnalysisDTO } from "../../../application/dtos/create-concern-analysis.dto";
import ConcernAnalysisModel, { IConcernAnalysisDocument } from "./concern-analysis.schema";

export class MongooseConcernAnalysisRepository implements IConcernAnalysisRepository {

    private toDomain(doc: IConcernAnalysisDocument): ConcernAnalysis {
        return new ConcernAnalysis(
            doc._id.toString(),
            doc.studentId,
            doc.analysis,
            doc.createdAt
        );
    }

    async create(data: CreateConcernAnalysisDTO): Promise<ConcernAnalysis> {
        await dbConnect();
        const newAnalysis = await ConcernAnalysisModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newAnalysis);
    }

    async findByStudentId(studentId: string): Promise<ConcernAnalysis[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const analyses = await ConcernAnalysisModel.find({ studentId: new mongoose.Types.ObjectId(studentId) }).sort({ createdAt: -1 }).exec();
        return analyses.map(this.toDomain);
    }
}
