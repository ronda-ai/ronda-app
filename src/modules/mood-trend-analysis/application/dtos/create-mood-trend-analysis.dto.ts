
import { Insight } from "./mood-trend-analysis.dto";

export interface CreateMoodTrendAnalysisDTO {
    studentId?: string;
    analysis: Insight[];
    isClassroomLevel: boolean;
}
