
import { ConcernAnalysis } from "../../domain/concern-analysis.entity";
import { ConcernAnalysisDTO } from "../dtos/concern-analysis.dto";

export class ConcernAnalysisMapper {
    public static toDTO(analysis: ConcernAnalysis): ConcernAnalysisDTO {
        return {
            id: analysis.id,
            studentId: analysis.studentId.toString(),
            analysis: analysis.analysis,
            createdAt: analysis.createdAt.toISOString(),
        };
    }
}
