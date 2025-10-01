import { TestDTO } from '@/modules/test/application/dtos/test.dto';
import { CreateTestSubmissionDTO } from '../../application/dtos/create-test-submission.dto';
import { TestSubmissionDTO } from '../../application/dtos/test-submission.dto';
import { TestSubmission } from '../test-submission.entity';


export interface TestSubmissionWithPopulatedTest extends TestSubmission {
    test: TestDTO;
    studentName: string;
}

export interface ITestSubmissionService {
  createSubmission(dto: CreateTestSubmissionDTO & {liveId: string}): Promise<TestSubmissionDTO>;
  getSubmissionsForTest(testId: string): Promise<TestSubmissionDTO[]>;
}
