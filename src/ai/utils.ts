
'use server';

import { resolve } from '@/services/bootstrap';
import { SERVICE_KEYS } from '@/config/service-keys';
import { IAIConfigurationService } from '@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface';
import { googleAI } from '@genkit-ai/googleai';
import { openAI } from '@genkit-ai/compat-oai/openai';
import { xAI } from '@genkit-ai/compat-oai/xai';
import { deepSeek } from '@genkit-ai/compat-oai/deepseek';


const getAiConfigurationService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);

/**
 * Dynamically retrieves the AI model and plugin from the saved configuration.
 * Falls back to default values if no configuration is set.
 * @returns The AI configuration.
 */
export async function getDynamicAIConfig(): Promise<{ plugin: string; model: string }> {
    const config = await getAiConfigurationService().getConfiguration();
    const plugin = config?.plugin || 'googleai';
    const model = config?.modelName || (plugin === 'googleai' ? 'gemini-2.0-flash' : 'default-model'); // Provide a sensible default
    return { plugin, model };
}

export async function getDynamicModel(): Promise<any> {
    const config = await getAiConfigurationService().getConfiguration();
    const pluginName = config?.plugin || 'googleai';
    const modelName = config?.modelName;

    if (!modelName) {
        return googleAI.model('gemini-1.5-flash-latest');
    }

    switch (pluginName) {
        case 'openai':
            return openAI.model(modelName);
        case 'xai':
            return xAI.model(modelName);
        case 'deepseek':
            return deepSeek.model(modelName);
        case 'ollama':
            // For openAICompatible, the model name is prefixed with the plugin name
            return `ollama/${modelName}`;
        case 'googleai':
        default:
            return googleAI.model(modelName as any);
    }
}
