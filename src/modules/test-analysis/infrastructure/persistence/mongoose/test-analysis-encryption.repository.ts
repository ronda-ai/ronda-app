
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateTestAnalysisDTO } from '../../../application/dtos/create-test-analysis.dto';
import { TestAnalysis } from '../../../domain/test-analysis.entity';
import { ITestAnalysisRepository } from '../../../domain/interfaces/test-analysis-repository.interface';

export class TestAnalysisEncryptionRepository implements ITestAnalysisRepository {
  constructor(
    private readonly decoratedRepository: ITestAnalysisRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  async create(data: CreateTestAnalysisDTO): Promise<TestAnalysis> {
    const encryptedData: CreateTestAnalysisDTO = {
      ...data,
      performanceSummary: this.encryptionService.encrypt(data.performanceSummary),
      strengths: data.strengths.map(s => this.encryptionService.encrypt(s)),
      opportunities: data.opportunities.map(o => this.encryptionService.encrypt(o)),
      suggestion: this.encryptionService.encrypt(data.suggestion),
    };
    return this.decoratedRepository.create(encryptedData);
  }

  async findBySubmissionId(submissionId: string): Promise<TestAnalysis | null> {
    const analysis = await this.decoratedRepository.findBySubmissionId(submissionId);
    if (!analysis) {
      return null;
    }
    
    try {
        return new TestAnalysis(
            analysis.id,
            analysis.submissionId,
            this.encryptionService.decrypt(analysis.performanceSummary),
            analysis.strengths.map(s => this.encryptionService.decrypt(s)),
            analysis.opportunities.map(o => this.encryptionService.decrypt(o)),
            this.encryptionService.decrypt(analysis.suggestion),
            analysis.createdAt
        );
    } catch (e) {
        // If decryption fails, it might be unencrypted data from before the change
        return analysis;
    }
  }
}
