
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

const getAIConfigurationService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);

export async function getConfigurationHandler(request: NextRequest) {
    try {
        const config = await getAIConfigurationService().getConfiguration();
        if (!config) {
            // If no config exists, create a default one
            const defaultConfig = await getAIConfigurationService().saveConfiguration({});
            return NextResponse.json(defaultConfig);
        }
        return NextResponse.json(config);
    } catch (error: any) {
        console.error('API Error: Failed to get AI configuration', error);
        return NextResponse.json({ message: error.message || 'Failed to get AI configuration' }, { status: 500 });
    }
}

export async function saveConfigurationHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const savedConfig = await getAIConfigurationService().saveConfiguration(body);
        return NextResponse.json(savedConfig, { status: 200 });
    } catch (error: any) {
        console.error('API Error: Failed to save AI configuration', error);
        return NextResponse.json({ message: error.message || 'Failed to save AI configuration' }, { status: 400 });
    }
}
