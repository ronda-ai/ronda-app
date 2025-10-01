
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateObservationDTO } from '../../../application/dtos/create-observation.dto';
import { Observation } from '../../../domain/observation.entity';
import { IObservationRepository } from '../../../domain/interfaces/observation-repository.interface';

export class ObservationEncryptionRepository implements IObservationRepository {
  constructor(
    private readonly decoratedRepository: IObservationRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptObservationData(data: CreateObservationDTO): CreateObservationDTO {
    const encryptedData = { ...data };
    
    if (encryptedData.observation) {
      encryptedData.observation = this.encryptionService.encrypt(encryptedData.observation);
    }
    if (encryptedData.deepeningQuestion) {
        encryptedData.deepeningQuestion = this.encryptionService.encrypt(encryptedData.deepeningQuestion);
    }
    if (encryptedData.tags && encryptedData.tags.length > 0) {
        encryptedData.tags = encryptedData.tags.map(tag => this.encryptionService.encrypt(tag));
    }
    return encryptedData;
  }

  private decryptObservation(observation: Observation | null): Observation | null {
    if (!observation) {
      return null;
    }
    
    const decryptedObservation = { ...observation };
    
    try {
        if (decryptedObservation.observation) {
            decryptedObservation.observation = this.encryptionService.decrypt(decryptedObservation.observation);
        }
        if (decryptedObservation.deepeningQuestion) {
            decryptedObservation.deepeningQuestion = this.encryptionService.decrypt(decryptedObservation.deepeningQuestion);
        }
        if (decryptedObservation.tags && decryptedObservation.tags.length > 0) {
            decryptedObservation.tags = decryptedObservation.tags.map(tag => this.encryptionService.decrypt(tag));
        }
    } catch(e) {
        // Data might be unencrypted from before
        console.warn(`Could not decrypt observation data for observation ID: ${observation.id}. It may already be plain text.`);
    }

    return decryptedObservation;
  }

  async create(data: CreateObservationDTO): Promise<Observation> {
    const encryptedData = this.encryptObservationData(data);
    const observation = await this.decoratedRepository.create(encryptedData);
    return this.decryptObservation(observation) as Observation;
  }

  async findByStudentId(studentId: string): Promise<Observation[]> {
    const observations = await this.decoratedRepository.findByStudentId(studentId);
    return observations.map(obs => this.decryptObservation(obs) as Observation);
  }
  
  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
