
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { SafetyProtocol, ProtocolStep } from '../../../domain/educational-safety.entity';
import { ISafetyProtocolRepository } from '../../../domain/interfaces/safety-protocol-repository.interface';

export class SafetyProtocolEncryptionRepository implements ISafetyProtocolRepository {
  constructor(
    private readonly decoratedRepository: ISafetyProtocolRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<Omit<SafetyProtocol, 'id' | 'createdAt' | 'updatedAt'>>): any {
    const encryptedData = { ...data };
    
    if (encryptedData.risk) encryptedData.risk = this.encryptionService.encrypt(encryptedData.risk);
    if (encryptedData.title) encryptedData.title = this.encryptionService.encrypt(encryptedData.title);

    const encryptSteps = (steps?: ProtocolStep[]) => {
        return steps?.map(step => ({
            ...step,
            text: this.encryptionService.encrypt(step.text),
            assignedBrigadeName: step.assignedBrigadeName ? this.encryptionService.encrypt(step.assignedBrigadeName) : undefined,
        }));
    };
    
    if (encryptedData.beforeSteps) encryptedData.beforeSteps = encryptSteps(encryptedData.beforeSteps);
    if (encryptedData.duringSteps) encryptedData.duringSteps = encryptSteps(encryptedData.duringSteps);
    if (encryptedData.afterSteps) encryptedData.afterSteps = encryptSteps(encryptedData.afterSteps);

    return encryptedData;
  }

  private decryptProtocol(protocol: SafetyProtocol | null): SafetyProtocol | null {
    if (!protocol) return null;
    
    try {
        const decrypt = (text?: string) => {
            if (!text) return undefined;
            try {
                return this.encryptionService.decrypt(text);
            } catch (e) {
                return text;
            }
        };

        const decryptSteps = (steps: ProtocolStep[]): ProtocolStep[] => {
            return steps.map(step => ({
                ...step,
                text: decrypt(step.text) || step.text,
                assignedBrigadeName: decrypt(step.assignedBrigadeName),
            }));
        };

        return new SafetyProtocol(
            protocol.id,
            decrypt(protocol.risk) || protocol.risk,
            decrypt(protocol.title) || protocol.title,
            decryptSteps(protocol.beforeSteps),
            decryptSteps(protocol.duringSteps),
            decryptSteps(protocol.afterSteps),
            protocol.createdAt,
            protocol.updatedAt
        );

    } catch (e) {
        return protocol; // Return as is if decryption fails
    }
  }

  async create(data: Omit<SafetyProtocol, 'id' | 'createdAt' | 'updatedAt'>): Promise<SafetyProtocol> {
    const encryptedData = this.encryptData(data);
    const protocol = await this.decoratedRepository.create(encryptedData);
    return this.decryptProtocol(protocol) as SafetyProtocol;
  }

  async findAll(): Promise<SafetyProtocol[]> {
    const protocols = await this.decoratedRepository.findAll();
    return protocols.map(p => this.decryptProtocol(p) as SafetyProtocol);
  }

  async findById(id: string): Promise<SafetyProtocol | null> {
    const protocol = await this.decoratedRepository.findById(id);
    return this.decryptProtocol(protocol);
  }
  
  async update(id: string, data: Partial<SafetyProtocol>): Promise<SafetyProtocol | null> {
    const encryptedData = this.encryptData(data);
    const protocol = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptProtocol(protocol);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
