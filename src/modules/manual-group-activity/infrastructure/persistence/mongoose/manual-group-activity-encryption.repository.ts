
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateManualGroupActivityDTO } from '../../../application/dtos/create-manual-group-activity.dto';
import { UpdateManualGroupActivityDTO } from '../../../application/dtos/update-manual-group-activity.dto';
import { ManualGroupActivity, ManualGroupActivityItem } from '../../../domain/manual-group-activity.entity';
import { IManualGroupActivityRepository } from '../../../domain/interfaces/manual-group-activity-repository.interface';

export class ManualGroupActivityEncryptionRepository implements IManualGroupActivityRepository {
  constructor(
    private readonly decoratedRepository: IManualGroupActivityRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreateManualGroupActivityDTO | UpdateManualGroupActivityDTO>): any {
    const encryptedData = { ...data };
    
    if ('skills' in encryptedData && encryptedData.skills) {
        encryptedData.skills = encryptedData.skills.map(s => this.encryptionService.encrypt(s));
    }
    if ('themes' in encryptedData && encryptedData.themes) {
        encryptedData.themes = encryptedData.themes.map(t => this.encryptionService.encrypt(t));
    }
    if ('dynamicAnalysis' in encryptedData && encryptedData.dynamicAnalysis) {
        encryptedData.dynamicAnalysis = this.encryptionService.encrypt(encryptedData.dynamicAnalysis);
    }
    if ('activities' in encryptedData && encryptedData.activities) {
        encryptedData.activities = encryptedData.activities.map(a => ({
            ...a,
            title: this.encryptionService.encrypt(a.title),
            description: this.encryptionService.encrypt(a.description),
        }));
    }

    return encryptedData;
  }

  private decryptData(group: ManualGroupActivity | null): ManualGroupActivity | null {
    if (!group) {
      return null;
    }
    
    const decrypt = (text: string) => {
        try {
            return this.encryptionService.decrypt(text);
        } catch (e) {
            return text; // Return as is if decryption fails
        }
    }
    
    try {
        const decryptedGroup = { ...group };
        if (decryptedGroup.skills) {
            decryptedGroup.skills = decryptedGroup.skills.map(decrypt);
        }
        if (decryptedGroup.themes) {
            decryptedGroup.themes = decryptedGroup.themes.map(decrypt);
        }
        if (decryptedGroup.dynamicAnalysis) {
            decryptedGroup.dynamicAnalysis = decrypt(decryptedGroup.dynamicAnalysis);
        }
        if (decryptedGroup.activities) {
            decryptedGroup.activities = decryptedGroup.activities.map(a => ({
                ...a,
                title: decrypt(a.title),
                description: decrypt(a.description),
            }));
        }
        return decryptedGroup;
    } catch(e) {
        // Data might be unencrypted
        return group;
    }
  }

  async create(data: CreateManualGroupActivityDTO): Promise<ManualGroupActivity> {
    const encryptedData = this.encryptData(data);
    const group = await this.decoratedRepository.create(encryptedData);
    return this.decryptData(group) as ManualGroupActivity;
  }

  async findAll(): Promise<ManualGroupActivity[]> {
    const groups = await this.decoratedRepository.findAll();
    return groups.map(g => this.decryptData(g) as ManualGroupActivity);
  }

  async findById(id: string): Promise<ManualGroupActivity | null> {
    const group = await this.decoratedRepository.findById(id);
    return this.decryptData(group);
  }

  async update(id: string, data: UpdateManualGroupActivityDTO): Promise<ManualGroupActivity | null> {
    const encryptedData = this.encryptData(data);
    const group = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptData(group);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
