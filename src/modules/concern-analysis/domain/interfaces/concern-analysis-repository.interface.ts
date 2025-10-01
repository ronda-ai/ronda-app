
import { CreateConcernAnalysisDTO } from "../../application/dtos/create-concern-analysis.dto";
import { ConcernAnalysis } from "../concern-analysis.entity";

export interface IConcernAnalysisRepository {
    create(data: CreateConcernAnalysisDTO): Promise<ConcernAnalysis>;
    findByStudentId(studentId: string): Promise<ConcernAnalysis[]>;
}
