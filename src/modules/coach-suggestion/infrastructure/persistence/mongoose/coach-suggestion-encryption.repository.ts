
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateCoachSuggestionDTO } from '../../../application/dtos/create-coach-suggestion.dto';
import { CoachSuggestion } from '../../../domain/coach-suggestion.entity';
import { ICoachSuggestionRepository } from '../../../domain/interfaces/coach-suggestion-repository.interface';

export class CoachSuggestionEncryptionRepository implements ICoachSuggestionRepository {
  constructor(
    private readonly decoratedRepository: ICoachSuggestionRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: CreateCoachSuggestionDTO): CreateCoachSuggestionDTO {
    const encryptedData: CreateCoachSuggestionDTO = {
        ...data,
        title: this.encryptionService.encrypt(data.title),
        positiveAspects: data.positiveAspects.map(aspect => this.encryptionService.encrypt(aspect)),
        areasForImprovement: data.areasForImprovement.map(area => this.encryptionService.encrypt(area)),
        suggestion: this.encryptionService.encrypt(data.suggestion),
        deepeningQuestion: this.encryptionService.encrypt(data.deepeningQuestion),
    };
    return encryptedData;
  }

  private decryptSuggestion(suggestion: CoachSuggestion | null): CoachSuggestion | null {
    if (!suggestion) {
      return null;
    }
    
    const decrypt = (text: string) => {
        try {
            return this.encryptionService.decrypt(text);
        } catch (e) {
            return text; // Return as is if decryption fails (e.g., unencrypted legacy data)
        }
    }
    
    return {
        ...suggestion,
        title: decrypt(suggestion.title),
        positiveAspects: suggestion.positiveAspects.map(decrypt),
        areasForImprovement: suggestion.areasForImprovement.map(decrypt),
        suggestion: decrypt(suggestion.suggestion),
        deepeningQuestion: decrypt(suggestion.deepeningQuestion),
    };
  }

  async create(data: CreateCoachSuggestionDTO): Promise<CoachSuggestion> {
    const encryptedData = this.encryptData(data);
    const suggestion = await this.decoratedRepository.create(encryptedData);
    return this.decryptSuggestion(suggestion) as CoachSuggestion;
  }

  async findByStudentId(studentId: string): Promise<CoachSuggestion[]> {
    const suggestions = await this.decoratedRepository.findByStudentId(studentId);
    return suggestions.map(s => this.decryptSuggestion(s) as CoachSuggestion);
  }
  
  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
