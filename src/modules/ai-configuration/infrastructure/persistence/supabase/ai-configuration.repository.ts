import { IAIConfigurationRepository } from "../../../domain/interfaces/ai-configuration-repository.interface";
import { AIConfiguration } from "../../../domain/ai-configuration.entity";

export class SupabaseAIConfigurationRepository implements IAIConfigurationRepository {
    async find(): Promise<AIConfiguration | null> {
        throw new Error("Method not implemented.");
    }
    async upsert(data: Partial<AIConfiguration>): Promise<AIConfiguration> {
        throw new Error("Method not implemented.");
    }
}
