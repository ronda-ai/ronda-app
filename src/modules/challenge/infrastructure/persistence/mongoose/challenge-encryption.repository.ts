
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateChallengeDTO } from '../../../application/dtos/create-challenge.dto';
import { UpdateChallengeDTO } from '../../../application/dtos/update-challenge.dto';
import { Challenge } from '../../../domain/challenge.entity';
import { IChallengeRepository } from '../../../domain/interfaces/challenge-repository.interface';

export class ChallengeEncryptionRepository implements IChallengeRepository {
  constructor(
    private readonly decoratedRepository: IChallengeRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreateChallengeDTO> | Partial<UpdateChallengeDTO>): any {
    const encryptedData = { ...data };
    if ('challenge' in encryptedData && encryptedData.challenge) {
      encryptedData.challenge = this.encryptionService.encrypt(encryptedData.challenge);
    }
    if ('tip' in encryptedData && encryptedData.tip) {
        encryptedData.tip = this.encryptionService.encrypt(encryptedData.tip);
    }
    if (encryptedData.feedback) {
      encryptedData.feedback = this.encryptionService.encrypt(encryptedData.feedback);
    }
    
    // Encrypt each field within aiConfiguration individually
    if (encryptedData.aiConfiguration) {
        const config = encryptedData.aiConfiguration;
        const encryptedConfig: any = {};
        if (config.subject) encryptedConfig.subject = this.encryptionService.encrypt(config.subject);
        if (config.ageOrGrade) encryptedConfig.ageOrGrade = this.encryptionService.encrypt(config.ageOrGrade);
        if (config.country) encryptedConfig.country = this.encryptionService.encrypt(config.country);
        if (config.challengeLocation) encryptedConfig.challengeLocation = this.encryptionService.encrypt(config.challengeLocation);
        if (config.customPrompt) encryptedConfig.customPrompt = this.encryptionService.encrypt(config.customPrompt);
        if (config.negativePrompt) encryptedConfig.negativePrompt = this.encryptionService.encrypt(config.negativePrompt);
        if (config.className) encryptedConfig.className = this.encryptionService.encrypt(config.className);
        if (config.classInterests) encryptedConfig.classInterests = config.classInterests.map(i => this.encryptionService.encrypt(i));
        encryptedData.aiConfiguration = encryptedConfig;
    }
    
    return encryptedData;
  }

  private decryptChallenge(challenge: Challenge | null): Challenge | null {
    if (!challenge) {
      return null;
    }
    const decryptedChallenge = { ...challenge };
    try {
        if (decryptedChallenge.challenge) {
            decryptedChallenge.challenge = this.encryptionService.decrypt(decryptedChallenge.challenge);
        }
        if (decryptedChallenge.tip) {
            decryptedChallenge.tip = this.encryptionService.decrypt(decryptedChallenge.tip);
        }
        if (decryptedChallenge.feedback) {
            decryptedChallenge.feedback = this.encryptionService.decrypt(decryptedChallenge.feedback);
        }
        
        // Decrypt each field within aiConfiguration
        if (decryptedChallenge.aiConfiguration) {
            const config = decryptedChallenge.aiConfiguration;
            const decryptedConfig: any = {};
            try {
                if (config.subject) decryptedConfig.subject = this.encryptionService.decrypt(config.subject);
                if (config.ageOrGrade) decryptedConfig.ageOrGrade = this.encryptionService.decrypt(config.ageOrGrade);
                if (config.country) decryptedConfig.country = this.encryptionService.decrypt(config.country);
                if (config.challengeLocation) decryptedConfig.challengeLocation = this.encryptionService.decrypt(config.challengeLocation);
                if (config.customPrompt) decryptedConfig.customPrompt = this.encryptionService.decrypt(config.customPrompt);
                if (config.negativePrompt) decryptedConfig.negativePrompt = this.encryptionService.decrypt(config.negativePrompt);
                if (config.className) decryptedConfig.className = this.encryptionService.decrypt(config.className);
                if (config.classInterests) decryptedConfig.classInterests = config.classInterests.map(i => this.encryptionService.decrypt(i));
                decryptedChallenge.aiConfiguration = decryptedConfig;
            } catch (e) {
                // If decryption fails, it might be unencrypted data from before
                decryptedChallenge.aiConfiguration = config;
            }
        }

    } catch(e) {
        // Data might be unencrypted from before
    }
    return decryptedChallenge;
  }

  async create(data: CreateChallengeDTO): Promise<Challenge> {
    const encryptedData = this.encryptData(data);
    const challenge = await this.decoratedRepository.create(encryptedData);
    return this.decryptChallenge(challenge) as Challenge;
  }

  async findAll(): Promise<Challenge[]> {
    const challenges = await this.decoratedRepository.findAll();
    return challenges.map(c => this.decryptChallenge(c) as Challenge);
  }

  async findByStudentId(studentId: string): Promise<Challenge[]> {
    const challenges = await this.decoratedRepository.findByStudentId(studentId);
    return challenges.map(c => this.decryptChallenge(c) as Challenge);
  }

  async update(id: string, data: UpdateChallengeDTO): Promise<Challenge | null> {
    const encryptedData = this.encryptData(data);
    const challenge = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptChallenge(challenge);
  }

  async deleteByStudentId(studentId: string): Promise<void> {
    return this.decoratedRepository.deleteByStudentId(studentId);
  }
}
