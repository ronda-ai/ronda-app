
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateIndividualRelationshipStrategyDTO } from '../../../application/dtos/create-individual-relationship-strategy.dto';
import { IndividualRelationshipStrategy, StrategyStep } from '../../../domain/individual-relationship-strategy.entity';
import { IIndividualRelationshipStrategyRepository } from '../../../domain/interfaces/individual-relationship-strategy-repository.interface';

export class IndividualRelationshipStrategyEncryptionRepository implements IIndividualRelationshipStrategyRepository {
  constructor(
    private readonly decoratedRepository: IIndividualRelationshipStrategyRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreateIndividualRelationshipStrategyDTO | IndividualRelationshipStrategy>): any {
    const encryptedData = { ...data };
    
    if (encryptedData.title) encryptedData.title = this.encryptionService.encrypt(encryptedData.title);
    if (encryptedData.rationale) encryptedData.rationale = this.encryptionService.encrypt(encryptedData.rationale);
    if (encryptedData.focus) encryptedData.focus = this.encryptionService.encrypt(encryptedData.focus);
    if (encryptedData.customPrompt) encryptedData.customPrompt = this.encryptionService.encrypt(encryptedData.customPrompt);
    if (encryptedData.feedback) encryptedData.feedback = this.encryptionService.encrypt(encryptedData.feedback);
    
    if (encryptedData.steps) {
      encryptedData.steps = encryptedData.steps.map(step => ({
        ...step,
        text: this.encryptionService.encrypt(step.text),
        feedback: step.feedback ? this.encryptionService.encrypt(step.feedback) : undefined,
      }));
    }

    return encryptedData;
  }

  private decryptStrategy(strategy: IndividualRelationshipStrategy | null): IndividualRelationshipStrategy | null {
    if (!strategy) {
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
        ...strategy,
        title: decrypt(strategy.title) || strategy.title,
        rationale: decrypt(strategy.rationale) || strategy.rationale,
        focus: decrypt(strategy.focus) || strategy.focus,
        customPrompt: decrypt(strategy.customPrompt),
        feedback: decrypt(strategy.feedback),
        steps: strategy.steps.map(step => ({
            ...step,
            text: decrypt(step.text) || step.text,
            feedback: decrypt(step.feedback),
        })),
    };
  }

  async create(data: CreateIndividualRelationshipStrategyDTO): Promise<IndividualRelationshipStrategy> {
    const encryptedData = this.encryptData(data);
    const strategy = await this.decoratedRepository.create(encryptedData);
    return this.decryptStrategy(strategy) as IndividualRelationshipStrategy;
  }

  async findByStudentId(studentId: string): Promise<IndividualRelationshipStrategy[]> {
    const strategies = await this.decoratedRepository.findByStudentId(studentId);
    return strategies.map(s => this.decryptStrategy(s) as IndividualRelationshipStrategy);
  }
  
  async findById(id: string): Promise<IndividualRelationshipStrategy | null> {
    const strategy = await this.decoratedRepository.findById(id);
    return this.decryptStrategy(strategy);
  }

  async update(id: string, data: Partial<Omit<IndividualRelationshipStrategy, 'id' | 'createdAt' | 'studentId'>>): Promise<IndividualRelationshipStrategy | null> {
    const encryptedData = this.encryptData(data);
    const strategy = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptStrategy(strategy);
  }
  
  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
