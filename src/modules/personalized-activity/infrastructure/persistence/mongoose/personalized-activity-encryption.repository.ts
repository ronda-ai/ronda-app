
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreatePersonalizedActivityDTO } from '../../../application/dtos/create-personalized-activity.dto';
import { PersonalizedActivity, PersonalizedActivityStep } from '../../../domain/personalized-activity.entity';
import { IPersonalizedActivityRepository } from '../../../domain/interfaces/personalized-activity-repository.interface';

export class PersonalizedActivityEncryptionRepository implements IPersonalizedActivityRepository {
  constructor(
    private readonly decoratedRepository: IPersonalizedActivityRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreatePersonalizedActivityDTO | PersonalizedActivity>): any {
    const encryptedData = { ...data };
    
    if (encryptedData.topic) encryptedData.topic = this.encryptionService.encrypt(encryptedData.topic);
    if (encryptedData.skills) encryptedData.skills = encryptedData.skills.map(s => this.encryptionService.encrypt(s));
    if (encryptedData.themes) encryptedData.themes = encryptedData.themes.map(t => this.encryptionService.encrypt(t));
    if (encryptedData.feedback) encryptedData.feedback = this.encryptionService.encrypt(encryptedData.feedback);
    
    if (encryptedData.activities) {
      encryptedData.activities = encryptedData.activities.map(activity => ({
        ...activity,
        title: this.encryptionService.encrypt(activity.title),
        description: this.encryptionService.encrypt(activity.description),
        // Do not encrypt enum fields
        modality: activity.modality,
        status: activity.status,
        feedback: activity.feedback ? this.encryptionService.encrypt(activity.feedback) : undefined,
      }));
    }

    return encryptedData;
  }

  private decryptData(activity: PersonalizedActivity | null): PersonalizedActivity | null {
    if (!activity) {
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
        return new PersonalizedActivity(
            activity.id,
            activity.studentId,
            decrypt(activity.topic) || activity.topic,
            activity.skills.map(s => decrypt(s) || s),
            activity.themes.map(t => decrypt(t) || t),
            activity.activities.map(act => ({
                ...act,
                title: decrypt(act.title) || act.title,
                description: decrypt(act.description) || act.description,
                // Do not decrypt enum fields as they are not encrypted
                modality: act.modality,
                status: act.status,
                feedback: decrypt(act.feedback),
            })),
            activity.createdAt,
            activity.updatedAt,
            decrypt(activity.feedback)
        );
    } catch(e) {
        // Data might be unencrypted
        return activity;
    }
  }

  async create(data: CreatePersonalizedActivityDTO): Promise<PersonalizedActivity> {
    const encryptedData = this.encryptData(data);
    const activity = await this.decoratedRepository.create(encryptedData);
    return this.decryptData(activity) as PersonalizedActivity;
  }

  async findAll(): Promise<PersonalizedActivity[]> {
    const activities = await this.decoratedRepository.findAll();
    return activities.map(a => this.decryptData(a) as PersonalizedActivity);
  }

  async findById(id: string): Promise<PersonalizedActivity | null> {
    const activity = await this.decoratedRepository.findById(id);
    return this.decryptData(activity);
  }
  
  async findByStudentId(studentId: string): Promise<PersonalizedActivity[]> {
    const activities = await this.decoratedRepository.findByStudentId(studentId);
    return activities.map(a => this.decryptData(a) as PersonalizedActivity);
  }

  async update(id: string, data: Partial<PersonalizedActivity>): Promise<PersonalizedActivity | null> {
    const encryptedData = this.encryptData(data);
    const activity = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptData(activity);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
