

import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IRubricSuggestionService } from "@/modules/rubric-suggestion/domain/interfaces/rubric-suggestion-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getRubricSuggestionService = () => resolve<IRubricSuggestionService>(SERVICE_KEYS.RubricSuggestionService);

export async function createSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const savedRubric = await getRubricSuggestionService().createSuggestion({ activityDescription: body.activityDescription }, body.language, body.blocks);
        return NextResponse.json(savedRubric);
    } catch (error: any) {
        console.error('API Error: Failed to generate rubric', error);
        return NextResponse.json({ message: error.message || 'Failed to generate rubric' }, { status: 500 });
    }
}

export async function getAllSuggestionsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const rubrics = await getRubricSuggestionService().getAllSuggestions();
        return NextResponse.json(rubrics);
    } catch (error: any) {
        console.error('API Error: Failed to get rubrics', error);
        return NextResponse.json({ message: error.message || 'Failed to get rubrics' }, { status: 500 });
    }
}

export async function deleteRubricSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getRubricSuggestionService().deleteSuggestion(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete rubric suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to delete suggestion' }, { status: 500 });
    }
}
