
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateDigitalPactDTO } from '../../../application/dtos/create-digital-pact.dto';
import { DigitalPact } from '../../../domain/digital-conviviality.entity';
import { IDigitalPactRepository } from '../../../domain/interfaces/digital-pact-repository.interface';
import { DigitalPactDTO } from '@/modules/digital-conviviality/application/dtos/digital-pact.dto';

export class DigitalPactEncryptionRepository implements IDigitalPactRepository {
  constructor(
    private readonly decoratedRepository: IDigitalPactRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: Partial<CreateDigitalPactDTO | DigitalPact>): any {
    const encryptedData = { ...data };
    
    if (encryptedData.title) encryptedData.title = this.encryptionService.encrypt(encryptedData.title);
    
    if (encryptedData.principles) {
      encryptedData.principles = encryptedData.principles.map(p => ({
        ...p,
        title: this.encryptionService.encrypt(p.title),
        description: this.encryptionService.encrypt(p.description),
      }));
    }
     if (encryptedData.norms) {
      encryptedData.norms = encryptedData.norms.map(n => ({
        ...n,
        principle: this.encryptionService.encrypt(n.principle),
        norm: this.encryptionService.encrypt(n.norm),
      }));
    }
     if (encryptedData.consequences) {
      encryptedData.consequences = encryptedData.consequences.map(c => ({
        ...c,
        description: this.encryptionService.encrypt(c.description),
        restorativeAction: this.encryptionService.encrypt(c.restorativeAction),
      }));
    }

    return encryptedData;
  }

  private decryptPact(pact: DigitalPact | null): DigitalPact | null {
    if (!pact) return null;
    
    try {
        const decrypt = (text?: string) => {
            if (!text) return text;
            try { return this.encryptionService.decrypt(text); } catch (e) { return text; }
        };

        return new DigitalPact(
            pact.id,
            decrypt(pact.title) || pact.title,
            pact.principles.map(p => ({ ...p, title: decrypt(p.title) || p.title, description: decrypt(p.description) || p.description })),
            pact.norms.map(n => ({ ...n, principle: decrypt(n.principle) || n.principle, norm: decrypt(n.norm) || n.norm })),
            pact.consequences.map(c => ({ ...c, description: decrypt(c.description) || c.description, restorativeAction: decrypt(c.restorativeAction) || c.restorativeAction })),
            pact.createdAt,
            pact.updatedAt,
            pact.version,
            pact.publishedAt
        );
    } catch(e) {
        return pact;
    }
  }

  async create(data: CreateDigitalPactDTO): Promise<DigitalPact> {
    const encryptedData = this.encryptData(data);
    const pact = await this.decoratedRepository.create(encryptedData);
    return this.decryptPact(pact) as DigitalPact;
  }

  async findAll(): Promise<DigitalPact[]> {
    const pacts = await this.decoratedRepository.findAll();
    return pacts.map(p => this.decryptPact(p) as DigitalPact);
  }

  async findById(id: string): Promise<DigitalPact | null> {
    const pact = await this.decoratedRepository.findById(id);
    return this.decryptPact(pact);
  }

  async update(id: string, data: Partial<DigitalPact>): Promise<DigitalPact | null> {
    const encryptedData = this.encryptData(data);
    const pact = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptPact(pact);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
