
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IActivitySuggestionService } from "@/modules/activity-suggestion/domain/interfaces/activity-suggestion-service.interface";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";

const getActivitySuggestionService = () => resolve<IActivitySuggestionService>(SERVICE_KEYS.ActivitySuggestionService);

export async function generateAndCreateSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getActivitySuggestionService().generateAndCreateSuggestion(body.student, body.language);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate activity suggestions', error);
        return NextResponse.json({ message: error.message || 'Failed to generate activity suggestions' }, { status: 500 });
    }
}
