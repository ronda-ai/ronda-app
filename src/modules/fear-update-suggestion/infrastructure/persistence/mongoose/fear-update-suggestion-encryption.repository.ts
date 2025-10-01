
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateFearUpdateSuggestionDTO } from '../../../application/dtos/create-fear-update-suggestion.dto';
import { FearUpdateSuggestion } from '../../../domain/fear-update-suggestion.entity';
import { IFearUpdateSuggestionRepository } from '../../../domain/interfaces/fear-update-suggestion-repository.interface';

export class FearUpdateSuggestionEncryptionRepository implements IFearUpdateSuggestionRepository {
  constructor(
    private readonly decoratedRepository: IFearUpdateSuggestionRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: CreateFearUpdateSuggestionDTO): CreateFearUpdateSuggestionDTO {
    return {
      ...data,
      fearToUpdate: this.encryptionService.encrypt(data.fearToUpdate),
      updateProposal: this.encryptionService.encrypt(data.updateProposal),
    };
  }

  private decryptSuggestion(suggestion: FearUpdateSuggestion | null): FearUpdateSuggestion | null {
    if (!suggestion) {
      return null;
    }
    
    try {
        return new FearUpdateSuggestion(
            suggestion.id,
            suggestion.studentId,
            this.encryptionService.decrypt(suggestion.fearToUpdate),
            this.encryptionService.decrypt(suggestion.updateProposal),
            suggestion.originalSuggestionId,
            suggestion.createdAt
        );
    } catch(e) {
        // Unencrypted data
        return suggestion;
    }
  }

  async create(data: CreateFearUpdateSuggestionDTO): Promise<FearUpdateSuggestion> {
    const encryptedData = this.encryptData(data);
    const suggestion = await this.decoratedRepository.create(encryptedData);
    return this.decryptSuggestion(suggestion) as FearUpdateSuggestion;
  }
}
