import { ITestSubmissionRepository } from "../../../domain/interfaces/test-submission-repository.interface";
import { TestSubmission } from "../../../domain/test-submission.entity";

export class SupabaseTestSubmissionRepository implements ITestSubmissionRepository {
    async create(data: Omit<TestSubmission, 'id' | 'submittedAt'>): Promise<TestSubmission> {
        throw new Error("Method not implemented.");
    }
    async findByTestId(testId: string): Promise<TestSubmission[]> {
        throw new Error("Method not implemented.");
    }
}
