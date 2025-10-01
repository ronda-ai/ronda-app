
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateActivityAdaptationDTO } from '../../../application/dtos/create-activity-adaptation.dto';
import { ActivityAdaptation } from '../../../domain/activity-adaptation.entity';
import { IActivityAdaptationRepository } from '../../../domain/interfaces/activity-adaptation-repository.interface';

export class ActivityAdaptationEncryptionRepository implements IActivityAdaptationRepository {
  constructor(
    private readonly decoratedRepository: IActivityAdaptationRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: CreateActivityAdaptationDTO): CreateActivityAdaptationDTO {
    const encryptedData = { ...data };
    if (encryptedData.originalActivity) {
      encryptedData.originalActivity = this.encryptionService.encrypt(encryptedData.originalActivity);
    }
    if (encryptedData.suggestions) {
      encryptedData.suggestions = encryptedData.suggestions.map(s => ({
        title: this.encryptionService.encrypt(s.title),
        description: this.encryptionService.encrypt(s.description),
        reasoning: this.encryptionService.encrypt(s.reasoning),
      }));
    }
    return encryptedData;
  }

  private decryptAdaptation(adaptation: ActivityAdaptation | null): ActivityAdaptation | null {
    if (!adaptation) {
      return null;
    }
    const decryptedAdaptation = { ...adaptation };
    try {
        if (decryptedAdaptation.originalActivity) {
            decryptedAdaptation.originalActivity = this.encryptionService.decrypt(decryptedAdaptation.originalActivity);
        }
        if (decryptedAdaptation.suggestions) {
            decryptedAdaptation.suggestions = decryptedAdaptation.suggestions.map(s => ({
                title: this.encryptionService.decrypt(s.title),
                description: this.encryptionService.decrypt(s.description),
                reasoning: this.encryptionService.decrypt(s.reasoning),
            }));
        }
    } catch (e) {
        // Data might be unencrypted from before
    }
    return decryptedAdaptation;
  }

  async create(data: CreateActivityAdaptationDTO): Promise<ActivityAdaptation> {
    const encryptedData = this.encryptData(data);
    const adaptation = await this.decoratedRepository.create(encryptedData);
    return this.decryptAdaptation(adaptation) as ActivityAdaptation;
  }

  async findAll(): Promise<ActivityAdaptation[]> {
    const adaptations = await this.decoratedRepository.findAll();
    return adaptations.map(a => this.decryptAdaptation(a) as ActivityAdaptation);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
