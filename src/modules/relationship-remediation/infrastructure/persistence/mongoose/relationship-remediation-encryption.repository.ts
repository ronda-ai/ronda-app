
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateRelationshipRemediationDTO } from '../../../application/dtos/create-relationship-remediation.dto';
import { RelationshipRemediation } from '../../../domain/relationship-remediation.entity';
import { IRelationshipRemediationRepository } from '../../../domain/interfaces/relationship-remediation-repository.interface';
import { RemediationStep } from '@/modules/relationship-remediation/application/dtos/relationship-remediation.dto';

export class RelationshipRemediationEncryptionRepository implements IRelationshipRemediationRepository {
  constructor(
    private readonly decoratedRepository: IRelationshipRemediationRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreateRelationshipRemediationDTO | RelationshipRemediation>): any {
    const encryptedData = { ...data };
    
    if (encryptedData.focus) encryptedData.focus = this.encryptionService.encrypt(encryptedData.focus);
    if (encryptedData.customPrompt) encryptedData.customPrompt = this.encryptionService.encrypt(encryptedData.customPrompt);
    if (encryptedData.strategyTitle) encryptedData.strategyTitle = this.encryptionService.encrypt(encryptedData.strategyTitle);
    if (encryptedData.feedback) encryptedData.feedback = this.encryptionService.encrypt(encryptedData.feedback);
    
    if (encryptedData.steps) {
      encryptedData.steps = (encryptedData.steps as RemediationStep[]).map(step => ({
        ...step,
        text: this.encryptionService.encrypt(step.text),
        feedback: step.feedback ? this.encryptionService.encrypt(step.feedback) : undefined,
      }));
    }

    return encryptedData;
  }

  private decryptRemediation(remediation: RelationshipRemediation | null): RelationshipRemediation | null {
    if (!remediation) {
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
    
    try {
      return new RelationshipRemediation(
        remediation.id,
        remediation.studentIds,
        decrypt(remediation.focus) || remediation.focus,
        decrypt(remediation.strategyTitle) || remediation.strategyTitle,
        remediation.steps.map(step => ({
            ...step,
            text: decrypt(step.text) || step.text,
            feedback: decrypt(step.feedback),
        })),
        remediation.status,
        remediation.createdAt,
        decrypt(remediation.customPrompt),
        decrypt(remediation.feedback)
      );
    } catch(e) {
        // Unencrypted data
        return remediation;
    }
  }

  async create(data: CreateRelationshipRemediationDTO): Promise<RelationshipRemediation> {
    const encryptedData = this.encryptData(data);
    const remediation = await this.decoratedRepository.create(encryptedData);
    return this.decryptRemediation(remediation) as RelationshipRemediation;
  }

  async findByStudentIds(studentIds: string[]): Promise<RelationshipRemediation[]> {
    const remediations = await this.decoratedRepository.findByStudentIds(studentIds);
    return remediations.map(r => this.decryptRemediation(r) as RelationshipRemediation);
  }
  
  async findById(id: string): Promise<RelationshipRemediation | null> {
    const remediation = await this.decoratedRepository.findById(id);
    return this.decryptRemediation(remediation);
  }
  
  async update(id: string, data: Partial<RelationshipRemediation>): Promise<RelationshipRemediation | null> {
    const encryptedData = this.encryptData(data);
    const remediation = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptRemediation(remediation);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
