

import { AIConfiguration } from "../../domain/ai-configuration.entity";
import { AIConfigurationDTO } from "../dtos/ai-configuration.dto";

export class AIConfigurationMapper {
    public static toDTO(config: AIConfiguration): AIConfigurationDTO {
        return {
            id: config.id,
            className: config.className,
            classInterests: config.classInterests,
            subject: config.subject,
            ageOrGrade: config.ageOrGrade,
            country: config.country,
            challengeLocation: config.challengeLocation,
            customPrompt: config.customPrompt,
            negativePrompt: config.negativePrompt,
            plugin: config.plugin,
            modelName: config.modelName,
            ollamaBaseUrl: config.ollamaBaseUrl,
            analysisLevel: config.analysisLevel,
            theme: config.theme ? {
                name: config.theme.name,
                primary: config.theme.primary,
                background: config.theme.background,
                accent: config.theme.accent,
            } : undefined,
            createdAt: config.createdAt.toISOString(),
            updatedAt: config.updatedAt.toISOString(),
        };
    }
}
