
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { GenerateDigitalConflictScenarioOutput } from '@/ai/flows/generate-digital-conflict-scenario';
import { DigitalConflictScenario } from '../../../domain/digital-conviviality.entity';
import { IDigitalConflictScenarioRepository } from '../../../domain/interfaces/digital-conflict-scenario-repository.interface';

export class DigitalConflictScenarioEncryptionRepository implements IDigitalConflictScenarioRepository {
  constructor(
    private readonly decoratedRepository: IDigitalConflictScenarioRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: GenerateDigitalConflictScenarioOutput & { topics?: string[] }): any {
    return {
      ...data,
      title: this.encryptionService.encrypt(data.title),
      scenario: this.encryptionService.encrypt(data.scenario),
      strategies: data.strategies.map(s => ({
        name: this.encryptionService.encrypt(s.name),
        description: this.encryptionService.encrypt(s.description),
        simulatedOutcome: this.encryptionService.encrypt(s.simulatedOutcome),
      })),
      topics: data.topics?.map(t => this.encryptionService.encrypt(t)),
    };
  }

  private decryptScenario(scenario: DigitalConflictScenario | null): DigitalConflictScenario | null {
    if (!scenario) return null;
    
    try {
        const decrypt = (text: string) => this.encryptionService.decrypt(text);
        return new DigitalConflictScenario(
            scenario.id,
            decrypt(scenario.title),
            decrypt(scenario.scenario),
            scenario.strategies.map(s => ({
                name: decrypt(s.name),
                description: decrypt(s.description),
                simulatedOutcome: decrypt(s.simulatedOutcome),
            })),
            scenario.createdAt,
            scenario.updatedAt,
            scenario.topics?.map(t => decrypt(t))
        );
    } catch(e) {
        // Data might be unencrypted from before
        return scenario;
    }
  }

  async create(data: GenerateDigitalConflictScenarioOutput & { topics?: string[] }): Promise<DigitalConflictScenario> {
    const encryptedData = this.encryptData(data);
    const scenario = await this.decoratedRepository.create(encryptedData);
    return this.decryptScenario(scenario) as DigitalConflictScenario;
  }

  async findAll(): Promise<DigitalConflictScenario[]> {
    const scenarios = await this.decoratedRepository.findAll();
    return scenarios.map(s => this.decryptScenario(s) as DigitalConflictScenario);
  }
  
  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
