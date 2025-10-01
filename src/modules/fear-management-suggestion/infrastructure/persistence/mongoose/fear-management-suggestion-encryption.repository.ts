
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateFearManagementSuggestionDTO } from '../../../application/dtos/create-fear-management-suggestion.dto';
import { FearManagementSuggestion, FearManagementStep } from '../../../domain/fear-management-suggestion.entity';
import { IFearManagementSuggestionRepository } from '../../../domain/interfaces/fear-management-suggestion-repository.interface';

export class FearManagementSuggestionEncryptionRepository implements IFearManagementSuggestionRepository {
  constructor(
    private readonly decoratedRepository: IFearManagementSuggestionRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreateFearManagementSuggestionDTO | FearManagementSuggestion>): any {
    const encryptedData = { ...data };
    
    if (encryptedData.targetedFear) encryptedData.targetedFear = this.encryptionService.encrypt(encryptedData.targetedFear);
    if (encryptedData.title) encryptedData.title = this.encryptionService.encrypt(encryptedData.title);
    if (encryptedData.rationale) encryptedData.rationale = this.encryptionService.encrypt(encryptedData.rationale);
    if (encryptedData.deepeningQuestion) encryptedData.deepeningQuestion = this.encryptionService.encrypt(encryptedData.deepeningQuestion);
    
    if ('teacherFeedback' in encryptedData && encryptedData.teacherFeedback) {
      encryptedData.teacherFeedback = this.encryptionService.encrypt(encryptedData.teacherFeedback);
    }
    
    if (encryptedData.steps) {
      encryptedData.steps = (encryptedData.steps as FearManagementStep[]).map(step => ({
        ...step,
        text: this.encryptionService.encrypt(step.text),
        feedback: step.feedback ? this.encryptionService.encrypt(step.feedback) : undefined,
      }));
    }

    return encryptedData;
  }

  private decryptSuggestion(suggestion: FearManagementSuggestion | null): FearManagementSuggestion | null {
    if (!suggestion) {
      return null;
    }
    
    const decrypt = (text?: string) => {
        if (!text) return undefined;
        try {
            return this.encryptionService.decrypt(text);
        } catch (e) {
            return text; // Return as is if decryption fails
        }
    }
    
    return {
        ...suggestion,
        targetedFear: decrypt(suggestion.targetedFear) || suggestion.targetedFear,
        title: decrypt(suggestion.title) || suggestion.title,
        rationale: decrypt(suggestion.rationale) || suggestion.rationale,
        steps: suggestion.steps.map(step => ({
            ...step,
            text: decrypt(step.text) || step.text,
            feedback: decrypt(step.feedback),
        })),
        deepeningQuestion: decrypt(suggestion.deepeningQuestion) || suggestion.deepeningQuestion,
        teacherFeedback: decrypt(suggestion.teacherFeedback),
    };
  }

  async create(data: CreateFearManagementSuggestionDTO): Promise<FearManagementSuggestion> {
    const encryptedData = this.encryptData(data);
    const suggestion = await this.decoratedRepository.create(encryptedData as CreateFearManagementSuggestionDTO);
    return this.decryptSuggestion(suggestion) as FearManagementSuggestion;
  }

  async findByStudentId(studentId: string): Promise<FearManagementSuggestion[]> {
    const suggestions = await this.decoratedRepository.findByStudentId(studentId);
    return suggestions.map(s => this.decryptSuggestion(s) as FearManagementSuggestion);
  }
  
  async findById(id: string): Promise<FearManagementSuggestion | null> {
    const suggestion = await this.decoratedRepository.findById(id);
    return this.decryptSuggestion(suggestion);
  }
  
  async update(id: string, data: Partial<Omit<FearManagementSuggestion, "id" | "studentId" | "createdAt" | "updatedAt">>) : Promise<FearManagementSuggestion | null> {
      const encryptedData = this.encryptData(data);
      const updated = await this.decoratedRepository.update(id, encryptedData);
      return this.decryptSuggestion(updated);
  }
  
  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
