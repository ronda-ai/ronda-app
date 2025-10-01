



import { ITestService } from '@/modules/test/domain/interfaces/test-service.interface';
import { ITestSubmissionRepository } from '../domain/interfaces/test-submission-repository.interface';
import { ITestSubmissionService } from '../domain/interfaces/test-submission-service.interface';
import { CreateTestSubmissionDTO } from './dtos/create-test-submission.dto';
import { TestSubmissionDTO } from './dtos/test-submission.dto';
import { IStudentService } from '@/modules/student/domain/interfaces/student-service.interface';
import { TestSubmissionMapper } from './mappers/test-submission.mapper';
import { eventBus, SystemEvent } from '@/lib/event-bus/event-bus';
import { Test } from '@/modules/test/domain/test.entity';
import { RubricSuggestion } from '@/modules/rubric-suggestion/domain/rubric-suggestion.entity';
import mongoose from 'mongoose';

export class TestSubmissionService implements ITestSubmissionService {
  constructor(
    private readonly submissionRepository: ITestSubmissionRepository,
    private readonly testService: ITestService,
    private readonly studentService: IStudentService
  ) {}

  async createSubmission({
    liveId,
    studentId,
    answers,
  }: CreateTestSubmissionDTO & { liveId: string }): Promise<TestSubmissionDTO> {
    const testWithDetails = await this.testService.getTestByLiveId(liveId);
    if (!testWithDetails) {
      throw new Error('Test not found or session not active');
    }
    const test = testWithDetails as Test & { rubricId: RubricSuggestion };

    const student = await this.studentService.getStudentById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    let score = 0;
    let maxScore = 0;
    const gradedAnswers = [];

    for (const block of test.blocks) {
      if (block.type === 'open-ended') {
          // Open-ended questions are not auto-graded for score
          for(const question of block.questions) {
              gradedAnswers.push({
                  questionId: question.id,
                  answer: answers[question.id],
                  isCorrect: false, // Or some other state indicating manual review needed
              });
          }
          continue;
      };

      for (const question of block.questions) {
        maxScore += 1;
        const studentAnswer = answers[question.id];
        const isCorrect = studentAnswer !== undefined && String(studentAnswer) === String(question.answer);

        if (isCorrect) {
          score += 1;
        }

        gradedAnswers.push({
          questionId: question.id,
          answer: studentAnswer,
          isCorrect: isCorrect,
        });
      }
    }
    
    const submission = await this.submissionRepository.create({
      testId: new mongoose.Types.ObjectId(test.id),
      studentId: new mongoose.Types.ObjectId(studentId),
      answers: gradedAnswers,
      score,
      maxScore,
    });
    
    const dto = TestSubmissionMapper.toDTO(submission, student.name);

    eventBus.publish(SystemEvent.TEST_SUBMITTED, { submission: dto });

    // After submission, remove student from active list
    const activeStudentIds = test.activeStudentIds?.filter(id => id !== studentId) || [];
    await this.testService.updateTest(test.id, { activeStudentIds });

    return dto;
  }
  
    async getSubmissionsForTest(testId: string): Promise<TestSubmissionDTO[]> {
        const submissions = await this.submissionRepository.findByTestId(testId);
        const studentIds = submissions.map(s => s.studentId.toString());
        const students = await Promise.all(studentIds.map(id => this.studentService.getStudentById(id)));
        const studentMap = new Map(students.map(s => [s!.id, s!.name]));

        return submissions.map(submission => 
            TestSubmissionMapper.toDTO(submission, studentMap.get(submission.studentId.toString()) || 'Unknown Student')
        );
    }
}
