import { container } from '@/lib/dependency-container';
import { SERVICE_KEYS } from '@/config/service-keys';
import { TestSubmissionService } from '../application/test-submission.service';
import { ITestSubmissionRepository } from '../domain/interfaces/test-submission-repository.interface';
import { ITestSubmissionService } from '../domain/interfaces/test-submission-service.interface';
import { ITestService } from '@/modules/test/domain/interfaces/test-service.interface';
import { IStudentService } from '@/modules/student/domain/interfaces/student-service.interface';

let _testSubmissionServiceInstance: ITestSubmissionService;

export function createTestSubmissionService(): ITestSubmissionService {
  if (!_testSubmissionServiceInstance) {
    const repository = container.resolve<ITestSubmissionRepository>(
      SERVICE_KEYS.TestSubmissionRepository
    );
    const testService = container.resolve<ITestService>(SERVICE_KEYS.TestService);
    const studentService = container.resolve<IStudentService>(
      SERVICE_KEYS.StudentService
    );
    _testSubmissionServiceInstance = new TestSubmissionService(
      repository,
      testService,
      studentService
    );
  }
  return _testSubmissionServiceInstance;
}
