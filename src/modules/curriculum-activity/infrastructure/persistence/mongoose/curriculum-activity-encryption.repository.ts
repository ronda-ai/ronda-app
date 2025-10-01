
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateCurriculumActivityDTO } from '../../../application/dtos/create-curriculum-activity.dto';
import { CurriculumActivity } from '../../../domain/curriculum-activity.entity';
import { ICurriculumActivityRepository } from '../../../domain/interfaces/curriculum-activity-repository.interface';

export class CurriculumActivityEncryptionRepository implements ICurriculumActivityRepository {
  constructor(
    private readonly decoratedRepository: ICurriculumActivityRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreateCurriculumActivityDTO | CurriculumActivity>): any {
    const encryptedData = { ...data };

    if (encryptedData.topic) encryptedData.topic = this.encryptionService.encrypt(encryptedData.topic);
    if (encryptedData.skills) encryptedData.skills = encryptedData.skills.map(s => this.encryptionService.encrypt(s));
    if (encryptedData.language) encryptedData.language = this.encryptionService.encrypt(encryptedData.language);
    if (encryptedData.ageOrGrade) encryptedData.ageOrGrade = this.encryptionService.encrypt(encryptedData.ageOrGrade);
    if (encryptedData.country) encryptedData.country = this.encryptionService.encrypt(encryptedData.country);
    if (encryptedData.subject) encryptedData.subject = this.encryptionService.encrypt(encryptedData.subject);
    if (encryptedData.feedback) encryptedData.feedback = this.encryptionService.encrypt(encryptedData.feedback);
    
    if (encryptedData.activities) {
        encryptedData.activities = encryptedData.activities.map(activity => ({
            ...activity,
            title: this.encryptionService.encrypt(activity.title),
            description: this.encryptionService.encrypt(activity.description),
        }));
    }

    return encryptedData;
  }

  private decryptActivity(activity: CurriculumActivity | null): CurriculumActivity | null {
    if (!activity) return null;
    
    try {
        const decrypt = (text: string) => this.encryptionService.decrypt(text);
        
        return new CurriculumActivity(
            activity.id,
            decrypt(activity.topic),
            activity.skills.map(decrypt),
            decrypt(activity.language),
            activity.activities.map(act => ({
                ...act,
                title: decrypt(act.title),
                description: decrypt(act.description),
            })),
            activity.createdAt,
            activity.updatedAt,
            activity.ageOrGrade ? decrypt(activity.ageOrGrade) : undefined,
            activity.country ? decrypt(activity.country) : undefined,
            activity.subject ? decrypt(activity.subject) : undefined,
            activity.feedback ? decrypt(activity.feedback) : undefined,
            activity.complexity,
            activity.duration,
            activity.learningModality,
            activity.socialDynamic,
            activity.bloomLevel,
            activity.resourceConstraints
        );
    } catch (e) {
        return activity;
    }
  }

  async create(data: CreateCurriculumActivityDTO): Promise<CurriculumActivity> {
    const encryptedData = this.encryptData(data);
    const activity = await this.decoratedRepository.create(encryptedData);
    return this.decryptActivity(activity) as CurriculumActivity;
  }

  async findAll(): Promise<CurriculumActivity[]> {
    const activities = await this.decoratedRepository.findAll();
    return activities.map(a => this.decryptActivity(a) as CurriculumActivity);
  }

  async findById(id: string): Promise<CurriculumActivity | null> {
    const activity = await this.decoratedRepository.findById(id);
    return this.decryptActivity(activity);
  }
  
  async update(id: string, data: Partial<CurriculumActivity>): Promise<CurriculumActivity | null> {
    const encryptedData = this.encryptData(data);
    const activity = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptActivity(activity);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
