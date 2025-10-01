
import { dbConnect } from "@/lib/mongodb";
import { ITestAnalysisRepository } from "../../../domain/interfaces/test-analysis-repository.interface";
import { CreateTestAnalysisDTO } from "../../../application/dtos/create-test-analysis.dto";
import { TestAnalysis } from "../../../domain/test-analysis.entity";
import TestAnalysisModel, { ITestAnalysisDocument } from "./test-analysis.schema";
import mongoose from "mongoose";

export class MongooseTestAnalysisRepository implements ITestAnalysisRepository {

    private toDomain(doc: ITestAnalysisDocument): TestAnalysis {
        return new TestAnalysis(
            doc._id.toString(),
            doc.submissionId,
            doc.performanceSummary,
            doc.strengths,
            doc.opportunities,
            doc.suggestion,
            doc.createdAt
        );
    }
    
    async create(data: CreateTestAnalysisDTO): Promise<TestAnalysis> {
        await dbConnect();
        const newAnalysis = await TestAnalysisModel.create({
            ...data,
            submissionId: new mongoose.Types.ObjectId(data.submissionId),
        });
        return this.toDomain(newAnalysis);
    }

    async findBySubmissionId(submissionId: string): Promise<TestAnalysis | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(submissionId)) return null;
        const analysis = await TestAnalysisModel.findOne({ submissionId: new mongoose.Types.ObjectId(submissionId) }).exec();
        return analysis ? this.toDomain(analysis) : null;
    }
}
