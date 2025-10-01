
import { NextResponse } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { generatePromptSuggestion } from "@/ai/flows/generate-prompt-suggestion";

const getAIConfigurationService = () => resolve<any>(SERVICE_KEYS.AIConfigurationService);

export async function getSuggestionHandler(request: Request) {
    try {
        const body = await request.json();
        const config = await getAIConfigurationService().getConfiguration();
        const result = await generatePromptSuggestion({
            ...body,
            ageOrGrade: config?.ageOrGrade,
            subject: config?.subject,
            country: config?.country,
        });
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate prompt suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to generate prompt suggestion' }, { status: 500 });
    }
}
