
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { SafetyRiskMap } from '../../../domain/educational-safety.entity';
import { ISafetyRiskMapRepository } from '../../../domain/interfaces/safety-risk-map-repository.interface';
import { GenerateSafetyRiskMapOutput } from '@/ai/flows/generate-safety-risk-map';
import { AnalysisDepth } from '@/modules/educational-safety/application/educational-safety.service';

export class SafetyRiskMapEncryptionRepository implements ISafetyRiskMapRepository {
  constructor(
    private readonly decoratedRepository: ISafetyRiskMapRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Omit<SafetyRiskMap, 'id' | 'createdAt' | 'updatedAt'>): any {
    const encryptedData = { ...data };
    
    if (encryptedData.locationContext) encryptedData.locationContext = this.encryptionService.encrypt(encryptedData.locationContext);
    if (encryptedData.infrastructureContext) encryptedData.infrastructureContext = this.encryptionService.encrypt(encryptedData.infrastructureContext);
    if (encryptedData.socialContext) encryptedData.socialContext = this.encryptionService.encrypt(encryptedData.socialContext);
    if (encryptedData.title) encryptedData.title = this.encryptionService.encrypt(encryptedData.title);

    if (encryptedData.riskMap) {
        const rm = encryptedData.riskMap;
        encryptedData.riskMap = {
            introduction: this.encryptionService.encrypt(rm.introduction),
            naturalRisks: rm.naturalRisks.map(r => ({ ...r, risk: this.encryptionService.encrypt(r.risk), justification: this.encryptionService.encrypt(r.justification) })),
            socialRisks: rm.socialRisks.map(r => ({ ...r, risk: this.encryptionService.encrypt(r.risk), justification: this.encryptionService.encrypt(r.justification) })),
            infrastructureRisks: rm.infrastructureRisks.map(r => ({ ...r, risk: this.encryptionService.encrypt(r.risk), justification: this.encryptionService.encrypt(r.justification) })),
        };
    }
    return encryptedData;
  }

  private decryptRiskMap(riskMap: SafetyRiskMap | null): SafetyRiskMap | null {
    if (!riskMap) return null;
    try {
      const decrypt = (text: string) => this.encryptionService.decrypt(text);
      const rm = riskMap.riskMap;

      return new SafetyRiskMap(
        riskMap.id,
        decrypt(riskMap.locationContext),
        decrypt(riskMap.infrastructureContext),
        decrypt(riskMap.socialContext),
        riskMap.analysisDepth,
        decrypt(riskMap.title),
        {
          introduction: decrypt(rm.introduction),
          naturalRisks: rm.naturalRisks.map(r => ({ ...r, risk: decrypt(r.risk), justification: decrypt(r.justification) })),
          socialRisks: rm.socialRisks.map(r => ({ ...r, risk: decrypt(r.risk), justification: decrypt(r.justification) })),
          infrastructureRisks: rm.infrastructureRisks.map(r => ({ ...r, risk: decrypt(r.risk), justification: decrypt(r.justification) })),
        },
        riskMap.createdAt,
        riskMap.updatedAt
      );
    } catch (e) {
      return riskMap; // Return as is if decryption fails
    }
  }

  async create(data: Omit<SafetyRiskMap, 'id' | 'createdAt' | 'updatedAt'>): Promise<SafetyRiskMap> {
    const encryptedData = this.encryptData(data);
    const map = await this.decoratedRepository.create(encryptedData);
    return this.decryptRiskMap(map) as SafetyRiskMap;
  }

  async findAll(): Promise<SafetyRiskMap[]> {
    const maps = await this.decoratedRepository.findAll();
    return maps.map(m => this.decryptRiskMap(m) as SafetyRiskMap);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
