import { Genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { IAIConfigurationService } from '@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface';
import { resolve } from '@/services/bootstrap';
import { SERVICE_KEYS } from '@/config/service-keys';
import { GenkitPlugin, GenkitPluginV2 } from 'genkit/plugin';
import { genkit } from 'genkit';
import { openAI } from '@genkit-ai/compat-oai/openai';
import { xAI } from '@genkit-ai/compat-oai/xai';
import { deepSeek } from '@genkit-ai/compat-oai/deepseek';
import { openAICompatible } from '@genkit-ai/compat-oai';

let aiInstance: Genkit | null = null;
let currentConfig: { plugin?: string, model?: string, ollamaBaseUrl?: string } = {};

const getAiConfigurationService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);

function configurePlugins(pluginName: string, ollamaBaseUrl?: string): (GenkitPlugin | GenkitPluginV2)[]{
    const basePlugins: (GenkitPlugin | GenkitPluginV2)[] = [];

    switch (pluginName) {
        case 'openai':
            return [...basePlugins, openAI({ apiKey: process.env.OPENAI_API_KEY })];
        case 'xai':
            return [...basePlugins, xAI({ apiKey: process.env.XAI_API_KEY })];
        case 'deepseek':
            return [...basePlugins, deepSeek({ apiKey: process.env.DEEPSEEK_API_KEY })];
        case 'ollama':
             if (!ollamaBaseUrl) {
                console.warn("Ollama is selected but no baseURL is configured. Falling back to Google AI.");
                return [...basePlugins, googleAI()];
             }
             return [...basePlugins, openAICompatible({
                name: 'ollama',
                apiKey: 'ollama', // Required, but can be a placeholder for local servers
                baseURL: ollamaBaseUrl,
             })];
        case 'googleai':
        default:
            return [...basePlugins, googleAI()];
    }
}

export async function getAi(): Promise<Genkit> {
    const config = await getAiConfigurationService().getConfiguration();
    const pluginName = config?.plugin || 'googleai';
    const modelName = config?.modelName || (pluginName === 'googleai' ? 'gemini-1.5-flash-latest' : undefined);
    const ollamaBaseUrl = config?.ollamaBaseUrl;

    // Check if configuration has changed
    const configChanged = pluginName !== currentConfig.plugin || 
                          modelName !== currentConfig.model || 
                          ollamaBaseUrl !== currentConfig.ollamaBaseUrl;

    if (!aiInstance || configChanged) {
        currentConfig = { plugin: pluginName, model: modelName, ollamaBaseUrl: ollamaBaseUrl };

        const plugins = configurePlugins(pluginName, ollamaBaseUrl);
        
        aiInstance = genkit({
            plugins: plugins,
        });
    }

    return aiInstance;
}
