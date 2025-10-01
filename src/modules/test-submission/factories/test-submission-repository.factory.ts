import { MongooseTestSubmissionRepository } from '../infrastructure/persistence/mongoose/test-submission.repository';
import { ITestSubmissionRepository } from '../domain/interfaces/test-submission-repository.interface';

let _testSubmissionRepositoryInstance: ITestSubmissionRepository;

export function createTestSubmissionRepository(): ITestSubmissionRepository {
  if (!_testSubmissionRepositoryInstance) {
    _testSubmissionRepositoryInstance = new MongooseTestSubmissionRepository();
  }
  return _testSubmissionRepositoryInstance;
}
