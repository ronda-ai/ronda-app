
import { indexMbeDocument } from '@/ai/flows/mbe-indexer';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';
import mongoose from 'mongoose';
import { MbeConsultation } from '../domain/mbe-expert.entity';
import {
  IMbeExpertService,
  MbeConsultationInput,
} from '../domain/interfaces/mbe-expert-service.interface';
import { IMbeExpertRepository } from '../domain/interfaces/mbe-expert-repository.interface';
import { generateMbeConsultation } from '@/ai/flows/mbe-consultation';

export class MbeExpertService implements IMbeExpertService {
  constructor(
    private readonly repository: IMbeExpertRepository,
    private readonly anonymizationService: IAnonymizationService
  ) {}

  async consult(input: MbeConsultationInput): Promise<MbeConsultation> {
    let anonymizedStudent: any = null;
    let mapping: Map<string, string> = new Map();

    if (input.student) {
      const anonymizationResult = this.anonymizationService.anonymize(
        input.student,
        [input.student]
      );
      anonymizedStudent = anonymizationResult.anonymizedData;
      mapping = anonymizationResult.mapping;
    }

    const result = await generateMbeConsultation({
      ...input,
      student: anonymizedStudent,
    });

    const deAnonymizedAnswer = this.anonymizationService.deAnonymizeText(
      result.answer,
      mapping
    );

    // For now, we don't save consultations to the DB, just return the result.
    return new MbeConsultation(
      'temp-id',
      input.question,
      deAnonymizedAnswer,
      new Date(),
      input.student?.id
        ? new mongoose.Types.ObjectId(input.student.id)
        : undefined
    );
  }

  async loadMbeDocumentFromUrl(url: string): Promise<{ chunks: number }> {
    try {
      const result = await indexMbeDocument({ url });
      if (result.success) {
        return { chunks: result.documentsIndexed };
      } else {
        throw new Error(result.error || 'Unknown error during indexing.');
      }
    } catch (error: any) {
      throw new Error(`Failed to load MBE document: ${error.message}`);
    }
  }
}
