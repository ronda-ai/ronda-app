
import { MoodTrendAnalysis } from "../../domain/mood-trend-analysis.entity";
import { MoodTrendAnalysisDTO } from "../dtos/mood-trend-analysis.dto";

export class MoodTrendAnalysisMapper {
    public static toDTO(analysis: MoodTrendAnalysis): MoodTrendAnalysisDTO {
        return {
            id: analysis.id,
            studentId: analysis.studentId?.toString(),
            analysis: analysis.analysis, // The analysis field now directly holds the array of insights
            isClassroomLevel: analysis.isClassroomLevel,
            createdAt: analysis.createdAt.toISOString(),
        };
    }
}
