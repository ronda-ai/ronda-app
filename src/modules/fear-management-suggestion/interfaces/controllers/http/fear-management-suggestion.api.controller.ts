
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IFearManagementSuggestionService } from "@/modules/fear-management-suggestion/domain/interfaces/fear-management-suggestion-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getFearManagementSuggestionService = () => resolve<IFearManagementSuggestionService>(SERVICE_KEYS.FearManagementSuggestionService);

export async function createSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const savedSuggestion = await getFearManagementSuggestionService().generateAndCreateSuggestion(body.student, body.language, body.fear);
        return NextResponse.json(savedSuggestion);
    } catch (error: any) {
        console.error('API Error: Failed to generate fear management suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to generate suggestion' }, { status: 500 });
    }
}

export async function getSuggestionsForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const studentId = params.id as string;
        const suggestions = await getFearManagementSuggestionService().getSuggestionsForStudent(studentId);
        return NextResponse.json(suggestions);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function deleteSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getFearManagementSuggestionService().deleteSuggestion(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete fear management suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to delete suggestion' }, { status: 500 });
    }
}

export async function updateStepHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const suggestionId = params.id as string;
        const stepIndex = params.stepIndex as string;
        const details = await request.json();
        
        const updatedSuggestion = await getFearManagementSuggestionService().updateStepDetails(suggestionId, parseInt(stepIndex, 10), details);
        
        if (!updatedSuggestion) {
            return NextResponse.json({ message: "Suggestion or step not found" }, { status: 404 });
        }
        return NextResponse.json(updatedSuggestion);

    } catch (error: any) {
        console.error('API Error: Failed to update fear management step', error);
        return NextResponse.json({ message: error.message || 'Failed to update step' }, { status: 500 });
    }
}
