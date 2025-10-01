
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IFearUpdateSuggestionService } from "@/modules/fear-update-suggestion/domain/interfaces/fear-update-suggestion-service.interface";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";

const getFearUpdateSuggestionService = () => resolve<IFearUpdateSuggestionService>(SERVICE_KEYS.FearUpdateSuggestionService);

export async function processFeedbackHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getFearUpdateSuggestionService().processTeacherFeedback(body);

        if (result.hasUpdate) {
            return NextResponse.json({ ...result });
        }

        return NextResponse.json({ hasUpdate: false });
    } catch (error: any) {
        console.error('API Error: Failed to process fear management feedback', error);
        return NextResponse.json({ message: error.message || 'Failed to process feedback' }, { status: 500 });
    }
}
