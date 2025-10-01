
import { dbConnect } from '@/lib/mongodb';
import { ITestSubmissionRepository } from '../../../domain/interfaces/test-submission-repository.interface';
import { TestSubmission } from '../../../domain/test-submission.entity';
import TestSubmissionModel, {
  ITestSubmissionDocument,
} from './test-submission.schema';
import mongoose from 'mongoose';
import { TestSubmissionWithPopulatedTest } from '@/modules/test-submission/domain/interfaces/test-submission-service.interface';
import { IStudentDocument } from '@/modules/student/infrastructure/persistence/mongoose/student.schema';
import { ITestDocument } from '@/modules/test/infrastructure/persistence/mongoose/test.schema';

export class MongooseTestSubmissionRepository
  implements ITestSubmissionRepository
{
  private toDomain(doc: ITestSubmissionDocument): TestSubmission {
    return new TestSubmission(
      doc._id.toString(),
      doc.testId,
      doc.studentId,
      doc.answers,
      doc.score,
      doc.maxScore,
      doc.submittedAt
    );
  }

  async create(
    data: Omit<TestSubmission, 'id' | 'submittedAt'>
  ): Promise<TestSubmission> {
    await dbConnect();
    const newSubmission = await TestSubmissionModel.create({
      ...data,
      testId: new mongoose.Types.ObjectId(data.testId as any),
      studentId: new mongoose.Types.ObjectId(data.studentId as any),
    });
    return this.toDomain(newSubmission);
  }
  
  async findByTestId(testId: string): Promise<TestSubmission[]> {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(testId)) return [];
    
    const submissions = await TestSubmissionModel.find({ testId: new mongoose.Types.ObjectId(testId) })
        .exec();

    return submissions.map(this.toDomain);
  }
}
