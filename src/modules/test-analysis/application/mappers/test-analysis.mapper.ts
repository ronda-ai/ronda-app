
import { TestAnalysis } from "../../domain/test-analysis.entity";
import { FullTestAnalysisDTO } from "../dtos/test-analysis.dto";

export class TestAnalysisMapper {
    public static toDTO(analysis: TestAnalysis): FullTestAnalysisDTO {
        return {
            id: analysis.id,
            submissionId: analysis.submissionId.toString(),
            performanceSummary: analysis.performanceSummary,
            strengths: analysis.strengths,
            opportunities: analysis.opportunities,
            suggestion: analysis.suggestion,
            createdAt: analysis.createdAt.toISOString(),
        };
    }
}
