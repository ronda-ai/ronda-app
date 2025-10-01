import { IMoodTrendAnalysisRepository } from "../../../domain/interfaces/mood-trend-analysis-repository.interface";
import { CreateMoodTrendAnalysisDTO } from "../../../application/dtos/create-mood-trend-analysis.dto";
import { MoodTrendAnalysis } from "../../../domain/mood-trend-analysis.entity";

export class SupabaseMoodTrendAnalysisRepository implements IMoodTrendAnalysisRepository {
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateMoodTrendAnalysisDTO): Promise<MoodTrendAnalysis> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<MoodTrendAnalysis[]> {
        throw new Error("Method not implemented.");
    }
    async findClassroomLevel(): Promise<MoodTrendAnalysis[]> {
        throw new Error("Method not implemented.");
    }
}
