
import { AIConfiguration } from "../ai-configuration.entity";

export interface IAIConfigurationRepository {
    find(): Promise<AIConfiguration | null>;
    upsert(data: Partial<AIConfiguration>): Promise<AIConfiguration>;
}
