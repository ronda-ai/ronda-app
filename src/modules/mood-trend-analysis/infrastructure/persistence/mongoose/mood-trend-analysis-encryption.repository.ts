
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateMoodTrendAnalysisDTO } from '../../../application/dtos/create-mood-trend-analysis.dto';
import { Insight } from '../../../application/dtos/mood-trend-analysis.dto';
import { MoodTrendAnalysis } from '../../../domain/mood-trend-analysis.entity';
import { IMoodTrendAnalysisRepository } from '../../../domain/interfaces/mood-trend-analysis-repository.interface';

export class MoodTrendAnalysisEncryptionRepository implements IMoodTrendAnalysisRepository {
  constructor(
    private readonly decoratedRepository: IMoodTrendAnalysisRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptInsight(insight: Insight): Insight {
    return {
      ...insight,
      title: this.encryptionService.encrypt(insight.title),
      description: this.encryptionService.encrypt(insight.description),
      suggestion: insight.suggestion ? this.encryptionService.encrypt(insight.suggestion) : undefined,
    };
  }
  
  private decryptInsight(insight: Insight): Insight {
      try {
        return {
          ...insight,
          title: this.encryptionService.decrypt(insight.title),
          description: this.encryptionService.decrypt(insight.description),
          suggestion: insight.suggestion ? this.encryptionService.decrypt(insight.suggestion) : undefined,
        };
      } catch (e) {
        // Data might be unencrypted
        return insight;
      }
  }

  private encryptAnalysisData(data: CreateMoodTrendAnalysisDTO): CreateMoodTrendAnalysisDTO {
    return {
      ...data,
      analysis: data.analysis.map(this.encryptInsight.bind(this)),
    };
  }

  private decryptAnalysis(analysis: MoodTrendAnalysis | null): MoodTrendAnalysis | null {
    if (!analysis) {
      return null;
    }
    return {
      ...analysis,
      analysis: analysis.analysis.map(this.decryptInsight.bind(this)),
    };
  }

  async create(data: CreateMoodTrendAnalysisDTO): Promise<MoodTrendAnalysis> {
    const encryptedData = this.encryptAnalysisData(data);
    const analysis = await this.decoratedRepository.create(encryptedData);
    return this.decryptAnalysis(analysis) as MoodTrendAnalysis;
  }

  async findByStudentId(studentId: string): Promise<MoodTrendAnalysis[]> {
    const analyses = await this.decoratedRepository.findByStudentId(studentId);
    return analyses.map(analysis => this.decryptAnalysis(analysis) as MoodTrendAnalysis);
  }
  
  async findClassroomLevel(): Promise<MoodTrendAnalysis[]> {
    const analyses = await this.decoratedRepository.findClassroomLevel();
    return analyses.map(analysis => this.decryptAnalysis(analysis) as MoodTrendAnalysis);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
