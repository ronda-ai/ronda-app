import { TestSubmission } from '../../domain/test-submission.entity';
import { TestSubmissionDTO } from '../dtos/test-submission.dto';

export class TestSubmissionMapper {
  public static toDTO(
    submission: TestSubmission,
    studentName: string
  ): TestSubmissionDTO {
    return {
      id: submission.id,
      testId: submission.testId.toString(),
      studentId: submission.studentId.toString(),
      studentName: studentName,
      answers: submission.answers,
      score: submission.score,
      maxScore: submission.maxScore,
      submittedAt: submission.submittedAt.toISOString(),
    };
  }
}
