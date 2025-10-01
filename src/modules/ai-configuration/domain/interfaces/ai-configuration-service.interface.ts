
import { AIConfigurationDTO } from "../../application/dtos/ai-configuration.dto";

export interface IAIConfigurationService {
    getConfiguration(): Promise<AIConfigurationDTO | null>;
    saveConfiguration(dto: Partial<AIConfigurationDTO>): Promise<AIConfigurationDTO>;
}
