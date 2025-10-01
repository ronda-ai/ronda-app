
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IGroupActivitySuggestionService } from "@/modules/group-activity-suggestion/domain/interfaces/group-activity-suggestion-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";

const getGroupActivitySuggestionService = () => resolve<IGroupActivitySuggestionService>(SERVICE_KEYS.GroupActivitySuggestionService);
const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

export async function createSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const allStudents = await getStudentService().getAllStudents();
        const presentStudents = allStudents.filter(s => !s.isAbsent);
        const savedSuggestion = await getGroupActivitySuggestionService().generateAndCreateSuggestion(presentStudents, body.language);
        return NextResponse.json(savedSuggestion);
    } catch (error: any) {
        console.error('API Error: Failed to generate group activity suggestions', error);
        return NextResponse.json({ message: error.message || 'Failed to generate group activity suggestions' }, { status: 500 });
    }
}

export async function getAllSuggestionsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const suggestions = await getGroupActivitySuggestionService().getAllSuggestions();
        return NextResponse.json(suggestions);
    } catch (error: any) {
        console.error('API Error: Failed to get group activity suggestions', error);
        return NextResponse.json({ message: error.message || 'Failed to get group activity suggestions' }, { status: 500 });
    }
}

export async function deleteSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getGroupActivitySuggestionService().deleteSuggestion(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete group activity suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to delete suggestion' }, { status: 500 });
    }
}
