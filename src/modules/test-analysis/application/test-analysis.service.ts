import { generateTestAnalysis } from "@/ai/flows/generate-test-analysis";
import { ITestAnalysisRepository } from "../domain/interfaces/test-analysis-repository.interface";
import { ITestAnalysisService } from "../domain/interfaces/test-analysis-service.interface";
import { TestAnalysisDTO, FullTestAnalysisDTO } from "./dtos/test-analysis.dto";
import { CreateTestAnalysisDTO } from "./dtos/create-test-analysis.dto";
import { TestAnalysisMapper } from "./mappers/test-analysis.mapper";
import { TestDTO } from "@/modules/test/application/dtos/test.dto";
import { TestSubmissionDTO } from "@/modules/test-submission/application/dtos/test-submission.dto";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

export class TestAnalysisService implements ITestAnalysisService {
    constructor(
        private readonly repository: ITestAnalysisRepository,
        private readonly anonymizationService: IAnonymizationService
    ) {}

    async createAnalysis(dto: CreateTestAnalysisDTO): Promise<FullTestAnalysisDTO> {
        const newAnalysis = await this.repository.create(dto);
        return TestAnalysisMapper.toDTO(newAnalysis);
    }

    async getAnalysisForSubmission(submissionId: string): Promise<FullTestAnalysisDTO | null> {
        const analysis = await this.repository.findBySubmissionId(submissionId);
        return analysis ? TestAnalysisMapper.toDTO(analysis) : null;
    }
    
    async generateAndCreateAnalysis(test: TestDTO, submission: TestSubmissionDTO, language: string): Promise<TestAnalysisDTO> {
        const existingAnalysis = await this.getAnalysisForSubmission(submission.id);
        if(existingAnalysis) {
            const { id, submissionId, createdAt, ...rest } = existingAnalysis;
            return rest;
        }

        const allQuestions = test.blocks.flatMap(block => block.questions);
        const questionsMap = new Map(allQuestions.map(q => [q.id, q]));
        
        const { anonymizedData: anonymizedStudentName, mapping } = this.anonymizationService.anonymize(submission.studentName, []);

        const analysisInput = {
            testTitle: test.title,
            studentName: anonymizedStudentName,
            score: submission.score,
            maxScore: submission.maxScore,
            language,
            questions: submission.answers.map(ans => {
                const question = questionsMap.get(ans.questionId);
                return {
                    question: question?.text || 'Unknown Question',
                    studentAnswer: String(ans.answer),
                    correctAnswer: String(question?.answer),
                    isCorrect: ans.isCorrect,
                }
            })
        };
        
        const analysisResult = await generateTestAnalysis(analysisInput);
        
        const deAnonymize = (text: string) => this.anonymizationService.deAnonymizeText(text, mapping);

        const dtoToSave: CreateTestAnalysisDTO = {
            submissionId: submission.id,
            performanceSummary: deAnonymize(analysisResult.performanceSummary),
            strengths: analysisResult.strengths.map(deAnonymize),
            opportunities: analysisResult.opportunities.map(deAnonymize),
            suggestion: deAnonymize(analysisResult.suggestion),
        }
        
        await this.createAnalysis(dtoToSave);

        return {
            performanceSummary: dtoToSave.performanceSummary,
            strengths: dtoToSave.strengths,
            opportunities: dtoToSave.opportunities,
            suggestion: dtoToSave.suggestion
        };
    }
}
