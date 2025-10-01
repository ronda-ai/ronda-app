
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateConcernAnalysisDTO } from '../../../application/dtos/create-concern-analysis.dto';
import { ConcernAnalysis } from '../../../domain/concern-analysis.entity';
import { IConcernAnalysisRepository } from '../../../domain/interfaces/concern-analysis-repository.interface';

export class ConcernAnalysisEncryptionRepository implements IConcernAnalysisRepository {
  constructor(
    private readonly decoratedRepository: IConcernAnalysisRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptAnalysisData(data: CreateConcernAnalysisDTO): CreateConcernAnalysisDTO {
    const encryptedData = { ...data };
    if (encryptedData.analysis) {
      encryptedData.analysis = this.encryptionService.encrypt(encryptedData.analysis);
    }
    return encryptedData;
  }

  private decryptAnalysis(analysis: ConcernAnalysis | null): ConcernAnalysis | null {
    if (!analysis) {
      return null;
    }
    const decryptedAnalysis = { ...analysis };
    if (decryptedAnalysis.analysis) {
        try {
            decryptedAnalysis.analysis = this.encryptionService.decrypt(decryptedAnalysis.analysis);
        } catch (e) {
            // Might be unencrypted from before
        }
    }
    return decryptedAnalysis;
  }

  async create(data: CreateConcernAnalysisDTO): Promise<ConcernAnalysis> {
    const encryptedData = this.encryptAnalysisData(data);
    const analysis = await this.decoratedRepository.create(encryptedData);
    return this.decryptAnalysis(analysis) as ConcernAnalysis;
  }

  async findByStudentId(studentId: string): Promise<ConcernAnalysis[]> {
    const analyses = await this.decoratedRepository.findByStudentId(studentId);
    return analyses.map(analysis => this.decryptAnalysis(analysis) as ConcernAnalysis);
  }
}
