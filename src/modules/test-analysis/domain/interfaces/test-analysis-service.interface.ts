import { TestDTO } from "@/modules/test/application/dtos/test.dto";
import { CreateTestAnalysisDTO } from "../../application/dtos/create-test-analysis.dto";
import { TestAnalysisDTO, FullTestAnalysisDTO } from "../../application/dtos/test-analysis.dto";
import { TestSubmissionDTO } from "@/modules/test-submission/application/dtos/test-submission.dto";

export interface ITestAnalysisService {
    createAnalysis(dto: CreateTestAnalysisDTO): Promise<FullTestAnalysisDTO>;
    getAnalysisForSubmission(submissionId: string): Promise<FullTestAnalysisDTO | null>;
    generateAndCreateAnalysis(test: TestDTO, submission: TestSubmissionDTO, language: string): Promise<TestAnalysisDTO>;
}
