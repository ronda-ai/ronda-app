
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateSupportPlanDTO } from '../../../application/dtos/create-support-plan.dto';
import { SupportPlan, SupportPlanStep } from '../../../domain/support-plan.entity';
import { ISupportPlanRepository } from '../../../domain/interfaces/support-plan-repository.interface';

export class SupportPlanEncryptionRepository implements ISupportPlanRepository {
  constructor(
    private readonly decoratedRepository: ISupportPlanRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreateSupportPlanDTO | SupportPlan>): any {
    const encryptedData = { ...data };
    
    if (encryptedData.teacherFeedback) {
      encryptedData.teacherFeedback = this.encryptionService.encrypt(encryptedData.teacherFeedback);
    }
    
    if (encryptedData.steps) {
      encryptedData.steps = (encryptedData.steps as SupportPlanStep[]).map(step => ({
        ...step,
        text: this.encryptionService.encrypt(step.text),
        feedback: step.feedback ? this.encryptionService.encrypt(step.feedback) : undefined,
      }));
    }

    return encryptedData;
  }

  private decryptPlan(plan: SupportPlan | null): SupportPlan | null {
    if (!plan) {
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
        return new SupportPlan(
            plan.id,
            plan.studentId,
            plan.steps.map(step => ({
                ...step,
                text: decrypt(step.text) || step.text,
                feedback: decrypt(step.feedback),
            })),
            plan.createdAt,
            plan.updatedAt,
            decrypt(plan.teacherFeedback)
        );
    } catch(e) {
        return plan;
    }
  }

  async create(data: CreateSupportPlanDTO): Promise<SupportPlan> {
    const encryptedData = this.encryptData(data);
    const plan = await this.decoratedRepository.create(encryptedData as CreateSupportPlanDTO);
    return this.decryptPlan(plan) as SupportPlan;
  }

  async findById(id: string): Promise<SupportPlan | null> {
    const plan = await this.decoratedRepository.findById(id);
    return this.decryptPlan(plan);
  }

  async findByStudentId(studentId: string): Promise<SupportPlan[]> {
    const plans = await this.decoratedRepository.findByStudentId(studentId);
    return plans.map(p => this.decryptPlan(p) as SupportPlan);
  }
  
  async update(id: string, data: Partial<Omit<SupportPlan, "id" | "studentId" | "createdAt" | "updatedAt">>): Promise<SupportPlan | null> {
      const encryptedData = this.encryptData(data);
      const updated = await this.decoratedRepository.update(id, encryptedData);
      return this.decryptPlan(updated);
  }
  
  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
