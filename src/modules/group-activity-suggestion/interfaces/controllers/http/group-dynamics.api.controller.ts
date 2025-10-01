
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IGroupActivitySuggestionService } from "@/modules/group-activity-suggestion/domain/interfaces/group-activity-suggestion-service.interface";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";

const getGroupActivitySuggestionService = () => resolve<IGroupActivitySuggestionService>(SERVICE_KEYS.GroupActivitySuggestionService);

export async function getSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getGroupActivitySuggestionService().generateSuggestionForManualGroup(body.students, body.language);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate group activity suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to generate group activity suggestion' }, { status: 500 });
    }
}
