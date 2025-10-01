
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IQualitiesSuggestionService } from "@/modules/qualities-suggestion/domain/interfaces/qualities-suggestion-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getQualitiesSuggestionService = () => resolve<IQualitiesSuggestionService>(SERVICE_KEYS.QualitiesSuggestionService);

export async function getSuggestionsForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const studentId = params.studentId as string;
        const suggestions = await getQualitiesSuggestionService().getQualitiesSuggestionsForStudent(studentId);
        return NextResponse.json(suggestions);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function createSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const savedSuggestion = await getQualitiesSuggestionService().generateAndCreateSuggestion(body.student, body.language);
        return NextResponse.json(savedSuggestion);
    } catch (error: any) {
        console.error('API Error: Failed to generate or save qualities suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to process qualities suggestion' }, { status: 500 });
    }
}
