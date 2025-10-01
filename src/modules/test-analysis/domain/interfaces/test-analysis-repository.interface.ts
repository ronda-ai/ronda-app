
import { CreateTestAnalysisDTO } from "../../application/dtos/create-test-analysis.dto";
import { TestAnalysis } from "../test-analysis.entity";

export interface ITestAnalysisRepository {
    create(data: CreateTestAnalysisDTO): Promise<TestAnalysis>;
    findBySubmissionId(submissionId: string): Promise<TestAnalysis | null>;
}
