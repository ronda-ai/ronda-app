
import { CreateMoodTrendAnalysisDTO } from "../../application/dtos/create-mood-trend-analysis.dto";
import { MoodTrendAnalysis } from "../mood-trend-analysis.entity";

export interface IMoodTrendAnalysisRepository {
    create(data: CreateMoodTrendAnalysisDTO): Promise<MoodTrendAnalysis>;
    findByStudentId(studentId: string): Promise<MoodTrendAnalysis[]>;
    findClassroomLevel(): Promise<MoodTrendAnalysis[]>;
    delete(id: string): Promise<void>;
}
