
import { IAIConfigurationRepository } from "../domain/interfaces/ai-configuration-repository.interface";
import { IAIConfigurationService } from "../domain/interfaces/ai-configuration-service.interface";
import { AIConfigurationDTO } from "./dtos/ai-configuration.dto";
import { AIConfigurationMapper } from "./mappers/ai-configuration.mapper";
import { googleAI } from '@genkit-ai/googleai';

export class AIConfigurationService implements IAIConfigurationService {
    constructor(private readonly repository: IAIConfigurationRepository) {}

    async getConfiguration(): Promise<AIConfigurationDTO | null> {
        const config = await this.repository.find();
        if (!config) return null;
        return AIConfigurationMapper.toDTO(config);
    }

    async saveConfiguration(dto: Partial<Omit<AIConfigurationDTO, 'id' | 'createdAt' | 'updatedAt'>>): Promise<AIConfigurationDTO> {
        const savedConfig = await this.repository.upsert(dto);
        return AIConfigurationMapper.toDTO(savedConfig);
    }
}
