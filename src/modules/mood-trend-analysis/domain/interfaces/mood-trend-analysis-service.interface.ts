
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateMoodTrendAnalysisDTO } from "../../application/dtos/create-mood-trend-analysis.dto";
import { MoodTrendAnalysisDTO } from "../../application/dtos/mood-trend-analysis.dto";

export interface IMoodTrendAnalysisService {
    createMoodTrendAnalysis(dto: CreateMoodTrendAnalysisDTO): Promise<MoodTrendAnalysisDTO>;
    getStudentAnalyses(studentId: string): Promise<MoodTrendAnalysisDTO[]>;
    getClassroomAnalyses(): Promise<MoodTrendAnalysisDTO[]>;
    generateAndCreateStudentAnalysis(student: StudentDTO, language: string): Promise<MoodTrendAnalysisDTO>;
    generateAndCreateClassroomAnalysis(language: string): Promise<MoodTrendAnalysisDTO>;
    deleteMoodTrendAnalysis(id: string): Promise<void>;
}
