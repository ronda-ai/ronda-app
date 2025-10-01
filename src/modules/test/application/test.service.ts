
import { generateTestFromStory } from "@/ai/flows/generate-test-from-story";
import { generateTestFromTopic } from "@/ai/flows/generate-test-from-topic";
import { generateTestAnalysis } from "@/ai/flows/generate-test-analysis";
import { AIConfigurationDTO } from "@/modules/ai-configuration/application/dtos/ai-configuration.dto";
import { CollaborativeStoryDTO } from "@/modules/collaborative-story/application/dtos/collaborative-story.dto";
import { ITestRepository } from "../domain/interfaces/test-repository.interface";
import { ITestService } from "../domain/interfaces/test-service.interface";
import { CreateTestDTO } from "./dtos/create-test.dto";
import { TestDTO, TestBlockType } from "./dtos/test.dto";
import { TestMapper } from "./mappers/test.mapper";
import { nanoid } from 'nanoid';
import { IRubricSuggestionService } from "@/modules/rubric-suggestion/domain/interfaces/rubric-suggestion-service.interface";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { Test } from "../domain/test.entity";
import { RubricSuggestion } from "@/modules/rubric-suggestion/domain/rubric-suggestion.entity";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { eventBus, SystemEvent } from "@/lib/event-bus/event-bus";
import { TestSubmissionDTO } from "@/modules/test-submission/application/dtos/test-submission.dto";
import { ScoringSection } from "@/modules/rubric-suggestion/application/dtos/rubric-suggestion.dto";
import { ITestSubmissionService } from "@/modules/test-submission/domain/interfaces/test-submission-service.interface";
import { TestAnalysisDTO } from '@/modules/test-analysis/application/dtos/test-analysis.dto';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";
import { ITestAnalysisService } from "@/modules/test-analysis/domain/interfaces/test-analysis-service.interface";

const getRubricSuggestionService = () => resolve<IRubricSuggestionService>(SERVICE_KEYS.RubricSuggestionService);
const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);
const getTestSubmissionService = () => resolve<ITestSubmissionService>(SERVICE_KEYS.TestSubmissionService);
const getTestAnalysisService = () => resolve<ITestAnalysisService>(SERVICE_KEYS.TestAnalysisService);


export class TestService implements ITestService {
    constructor(
        private readonly repository: ITestRepository,
        private readonly anonymizationService: IAnonymizationService
    ) {
        this.registerListeners();
    }
    
    private registerListeners(): void {
        eventBus.register(SystemEvent.TEST_SUBMITTED, this.handleTestSubmitted.bind(this));
    }
    
    private async handleTestSubmitted(event: SystemEvent, payload: { submission: TestSubmissionDTO }): Promise<void> {
        try {
            console.log(`[TestService] Handling ${event} for test ${payload.submission.testId}`);
            const test = await this.repository.findById(payload.submission.testId);
            if (test && test.status === 'live') {
                // Logic to update active students can be handled here if needed,
                // but the primary responsibility is now in the join endpoint.
            }
        } catch (error) {
            console.error(`[TestService] Failed to handle ${event}:`, error);
        }
    }


    async createTest(dto: CreateTestDTO): Promise<TestDTO> {
        const dtoWithIds = {
            ...dto,
            blocks: (dto.blocks || []).map(block => ({
                ...block,
                id: block.id || nanoid(),
                questions: block.questions.map(q => ({ ...q, id: q.id || nanoid() }))
            }))
        };
        const newTest = await this.repository.create(dtoWithIds);
        return TestMapper.toDTO(newTest);
    }
    
    async getAllTests(): Promise<TestDTO[]> {
        const tests = await this.repository.findAll();
        return Promise.all((tests as any[]).map(test => TestMapper.toDTOWithPopulatedRubric(test)));
    }
    
    async getTestById(id: string): Promise<TestDTO | null> {
        const test = await this.repository.findById(id);
        if (!test) return null;
        return TestMapper.toDTOWithPopulatedRubric(test as Test & { rubricId: RubricSuggestion });
    }
    
    async getTestByLiveId(liveId: string): Promise<Test | null> {
        const test = await this.repository.findByLiveId(liveId);
         if (!test) return null;
        return test as Test;
    }

    async getLiveSessionDetails(liveId: string): Promise<{ test: TestDTO; availableStudents: StudentDTO[], rejoinableStudents: StudentDTO[], allStudents: StudentDTO[] } | null> {
        const test = await this.repository.findByLiveId(liveId);
        if (!test || test.status !== 'live') return null;

        const allStudents = await getStudentService().getAllStudents();
        const testSubmissions = await getTestSubmissionService().getSubmissionsForTest(test.id);
        const submittedStudentIds = new Set(testSubmissions.map(sub => sub.studentId));

        const activeStudentIds = test.activeStudentIds || [];
        
        // Students who have never joined and are not absent
        const availableStudents = allStudents.filter(s => !activeStudentIds.includes(s.id) && !s.isAbsent && !submittedStudentIds.has(s.id));
        // Students who have joined but not yet submitted
        const rejoinableStudents = allStudents.filter(s => activeStudentIds.includes(s.id) && !submittedStudentIds.has(s.id));

        const dto = TestMapper.toDTOWithPopulatedRubric(test as Test & { rubricId: RubricSuggestion });
        return { test: dto, availableStudents, rejoinableStudents, allStudents };
    }


    async updateTest(id: string, data: Partial<TestDTO>): Promise<TestDTO | null> {
        const test = await this.repository.update(id, data);
        if(!test) return null;
        return TestMapper.toDTOWithPopulatedRubric(test as Test & { rubricId: RubricSuggestion });
    }

    async deleteTest(id: string): Promise<void> {
        const testToDelete = await this.repository.findById(id);
        if (testToDelete && testToDelete.rubricId) {
             const rubricService = getRubricSuggestionService();
             try {
                await rubricService.deleteSuggestion(testToDelete.rubricId.toString());
             } catch(error) {
                console.warn(`Could not delete orphaned rubric with id: ${testToDelete.rubricId}. It may have been deleted already.`)
             }
        }
        await this.repository.delete(id);
    }
    
    async startTestSession(testId: string): Promise<TestDTO | null> {
        const liveId = nanoid(6);
        return this.updateTest(testId, {
            status: 'live',
            liveId: liveId,
            activeStudentIds: []
        });
    }

    async stopTestSession(testId: string): Promise<TestDTO | null> {
        return this.updateTest(testId, {
            status: 'closed',
            liveId: undefined, // Clear the liveId
            activeStudentIds: [],
        });
    }

    async joinTestSession(liveId: string, studentId: string): Promise<{ success: boolean; student: StudentDTO | null; test?: TestDTO | null, message?: string; status?: number; }> {
        const testData = await this.getTestByLiveId(liveId);
        if (!testData || testData.status !== 'live') {
            return { success: false, student: null, message: "Test session not found or not active", status: 404 };
        }
        
        const testSubmissions = await getTestSubmissionService().getSubmissionsForTest(testData.id);
        const hasSubmitted = testSubmissions.some(sub => sub.studentId === studentId);
        if (hasSubmitted) {
            return { success: false, student: null, message: "You have already submitted this test.", status: 403 };
        }
        
        const activeStudentIds = testData.activeStudentIds || [];
        if (!activeStudentIds.includes(studentId)) {
            await this.updateTest(testData.id, {
                activeStudentIds: [...activeStudentIds, studentId]
            });
        }
        
        const student = await getStudentService().getStudentById(studentId);
        if(!student) {
             return { success: false, student: null, message: "Student not found", status: 404 };
        }

        const testDto = TestMapper.toDTO(testData);
        return { success: true, student, test: testDto };
    }
    
    async leaveTestSession(liveId: string, studentId: string): Promise<void> {
        const test = await this.repository.findByLiveId(liveId);
        if (!test || test.status !== 'live') {
            console.warn(`Attempted to leave a non-existent or inactive session: ${liveId}`);
            return;
        }

        const activeStudentIds = test.activeStudentIds?.filter(id => id !== studentId) || [];
        await this.repository.update(test.id, { activeStudentIds });
    }

    async generateTestFromStory(input: { story: CollaborativeStoryDTO, testType: TestBlockType, language: string, aiConfig: AIConfigurationDTO }): Promise<TestDTO> {
        
        const flowInput = {
            ...input,
            story: {
                ...input.story,
                chapters: input.story.chapters.map(c => c.text),
            }
        };

        const result = await generateTestFromStory(flowInput);
        
        const rubricService = getRubricSuggestionService();
        const savedRubric = await rubricService.createSuggestion(
            { 
                activityDescription: result.title, 
                criteria: result.rubric.criteria,
                suggestedScoring: result.rubric.suggestedScoring as ScoringSection[]
            }, 
            input.language, 
            result.blocks
        );

        const testToCreate: CreateTestDTO = {
            storyId: result.storyId,
            storyTitle: result.storyTitle,
            title: result.title,
            blocks: result.blocks,
            rubricId: savedRubric.id,
            rubric: savedRubric,
        }

        const newTest = await this.createTest(testToCreate);
        return newTest;
    }
    
    async generateTestFromTopic(input: { topic: string, testType: TestBlockType, customPrompt?: string, language: string, aiConfig: AIConfigurationDTO; }): Promise<TestDTO> {
        const result = await generateTestFromTopic(input);
        
        const rubricService = getRubricSuggestionService();
        const savedRubric = await rubricService.createSuggestion(
            { 
                activityDescription: result.title, 
                criteria: result.rubric.criteria,
                suggestedScoring: result.rubric.suggestedScoring as ScoringSection[],
            }, 
            input.language, 
            result.blocks
        );

        const testToCreate: CreateTestDTO = {
            storyId: `topic-${input.topic.replace(/\s+/g, '-')}`,
            storyTitle: result.storyTitle,
            title: result.title,
            blocks: result.blocks,
            rubricId: savedRubric.id,
            rubric: savedRubric,
        };

        const newTest = await this.createTest(testToCreate);
        return newTest;
    }

    async generateOrUpdateRubricForTest(testId: string, language: string): Promise<TestDTO | null> {
        const rubricService = getRubricSuggestionService();
        const test = await this.getTestById(testId);
        
        if (!test) {
            throw new Error("Test not found");
        }

        const savedRubric = await rubricService.createSuggestion(
            {
                id: test.rubricId,
                activityDescription: test.title,
                criteria: test.rubric?.criteria,
                suggestedScoring: test.rubric?.suggestedScoring,
            },
            language,
            test.blocks
        );
        
        return this.updateTest(testId, { rubricId: savedRubric.id });
    }

    async analyzeSubmission(test: TestDTO, submission: TestSubmissionDTO, language: string): Promise<TestAnalysisDTO> {
        const testAnalysisService = getTestAnalysisService();
        return await testAnalysisService.generateAndCreateAnalysis(test, submission, language);
    }
}
