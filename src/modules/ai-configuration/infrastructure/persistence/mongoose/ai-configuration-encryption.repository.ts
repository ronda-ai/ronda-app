
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { AIConfiguration } from '../../../domain/ai-configuration.entity';
import { IAIConfigurationRepository } from '../../../domain/interfaces/ai-configuration-repository.interface';

export class AIConfigurationEncryptionRepository implements IAIConfigurationRepository {
  constructor(
    private readonly decoratedRepository: IAIConfigurationRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<AIConfiguration>): Partial<AIConfiguration> {
    const encryptedData: Partial<AIConfiguration> = { ...data };

    if (encryptedData.className) encryptedData.className = this.encryptionService.encrypt(encryptedData.className);
    if (encryptedData.classInterests) encryptedData.classInterests = encryptedData.classInterests.map(i => this.encryptionService.encrypt(i));
    if (encryptedData.subject) encryptedData.subject = this.encryptionService.encrypt(encryptedData.subject);
    if (encryptedData.ageOrGrade) encryptedData.ageOrGrade = this.encryptionService.encrypt(encryptedData.ageOrGrade);
    if (encryptedData.country) encryptedData.country = this.encryptionService.encrypt(encryptedData.country);
    if (encryptedData.challengeLocation) encryptedData.challengeLocation = this.encryptionService.encrypt(encryptedData.challengeLocation);
    if (encryptedData.customPrompt) encryptedData.customPrompt = this.encryptionService.encrypt(encryptedData.customPrompt);
    if (encryptedData.negativePrompt) encryptedData.negativePrompt = this.encryptionService.encrypt(encryptedData.negativePrompt);
    // Not encrypting theme colors, plugin/model settings, or analysisLevel
    
    return encryptedData;
  }

  private decryptConfig(config: AIConfiguration | null): AIConfiguration | null {
    if (!config) return null;

    try {
        const decrypt = (text: string) => {
            if(!text) return text;
            try {
                return this.encryptionService.decrypt(text);
            } catch(e) {
                return text;
            }
        };

        return new AIConfiguration(
            config.id,
            decrypt(config.subject),
            decrypt(config.ageOrGrade),
            decrypt(config.country),
            decrypt(config.challengeLocation),
            config.createdAt,
            config.updatedAt,
            config.className ? decrypt(config.className) : undefined,
            config.classInterests ? config.classInterests.map(i => decrypt(i)) : undefined,
            config.customPrompt ? decrypt(config.customPrompt) : undefined,
            config.negativePrompt ? decrypt(config.negativePrompt) : undefined,
            config.plugin,
            config.modelName,
            config.ollamaBaseUrl,
            config.analysisLevel,
            config.theme
        );
    } catch(e) {
        // Data might be unencrypted if it's from before this change
        return config;
    }
  }

  async find(): Promise<AIConfiguration | null> {
    const config = await this.decoratedRepository.find();
    return this.decryptConfig(config);
  }

  async upsert(data: Partial<AIConfiguration>): Promise<AIConfiguration> {
    const encryptedData = this.encryptData(data);
    const config = await this.decoratedRepository.upsert(encryptedData);
    return this.decryptConfig(config) as AIConfiguration;
  }
}
