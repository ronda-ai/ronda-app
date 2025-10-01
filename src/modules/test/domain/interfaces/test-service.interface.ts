import { AIConfigurationDTO } from "@/modules/ai-configuration/application/dtos/ai-configuration.dto";
import { CollaborativeStoryDTO } from "@/modules/collaborative-story/application/dtos/collaborative-story.dto";
import { CreateTestDTO } from "../../application/dtos/create-test.dto";
import { TestDTO, TestBlockType } from "../../application/dtos/test.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { Test } from "../test.entity";
import { TestSubmissionDTO } from '@/modules/test-submission/application/dtos/test-submission.dto';
import { TestAnalysisDTO } from '@/modules/test-analysis/application/dtos/test-analysis.dto';

export interface ITestService {
    createTest(dto: CreateTestDTO): Promise<TestDTO>;
    getAllTests(): Promise<TestDTO[]>;
    getTestById(id: string): Promise<TestDTO | null>;
    getTestByLiveId(liveId: string): Promise<Test | null>;
    getLiveSessionDetails(liveId: string): Promise<{ test: TestDTO, availableStudents: StudentDTO[], rejoinableStudents: StudentDTO[], allStudents: StudentDTO[] } | null>;
    updateTest(id: string, data: Partial<TestDTO>): Promise<TestDTO | null>;
    deleteTest(id: string): Promise<void>;
    startTestSession(testId: string): Promise<TestDTO | null>;
    stopTestSession(testId: string): Promise<TestDTO | null>;
    joinTestSession(liveId: string, studentId: string): Promise<{ success: boolean; student: StudentDTO | null; test?: TestDTO | null, message?: string; status?: number; }>;
    leaveTestSession(liveId: string, studentId: string): Promise<void>;
    generateTestFromStory(input: { story: CollaborativeStoryDTO, testType: TestBlockType, language: string, aiConfig: AIConfigurationDTO }): Promise<TestDTO>;
    generateTestFromTopic(input: { topic: string, testType: TestBlockType, customPrompt?: string, language: string, aiConfig: AIConfigurationDTO }): Promise<TestDTO>;
    generateOrUpdateRubricForTest(testId: string, language: string): Promise<TestDTO | null>;
    analyzeSubmission(test: TestDTO, submission: TestSubmissionDTO, language: string): Promise<TestAnalysisDTO>;
}
