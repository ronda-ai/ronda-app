
import { TestSubmission } from '../test-submission.entity';
import { CreateTestSubmissionDTO } from '../../application/dtos/create-test-submission.dto';
import { TestSubmissionWithPopulatedTest } from './test-submission-service.interface';

export interface ITestSubmissionRepository {
  create(data: Omit<TestSubmission, 'id' | 'submittedAt'>): Promise<TestSubmission>;
  findByTestId(testId: string): Promise<TestSubmission[]>;
}
