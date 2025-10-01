
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ICoachSuggestionService } from "@/modules/coach-suggestion/domain/interfaces/coach-suggestion-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

const getCoachSuggestionService = () => resolve<ICoachSuggestionService>(SERVICE_KEYS.CoachSuggestionService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);

const observationLimits = {
    low: 5,
    medium: 10,
    high: 15
};

export async function createCoachSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const config = await getAiConfigService().getConfiguration();
        const limit = observationLimits[config?.analysisLevel || 'medium'];
        
        const filteredObservations = (body.observations as ObservationDTO[]).slice(0, limit);
        
        const student = body.student as StudentDTO;
        if (student.challengeHistory) {
            student.challengeHistory = student.challengeHistory.slice(0, limit);
        }

        const savedSuggestion = await getCoachSuggestionService().generateAndCreateSuggestion({
            ...body,
            student: student,
            observations: filteredObservations
        });
        return NextResponse.json(savedSuggestion);
    } catch (error: any) {
        console.error('API Error: Failed to generate coach suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to generate coach suggestion' }, { status: 500 });
    }
}

export async function getCoachSuggestionsForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const studentId = params.studentId as string;
        const suggestions = await getCoachSuggestionService().getCoachSuggestionsForStudent(studentId);
        return NextResponse.json(suggestions);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function deleteCoachSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const suggestionId = params.id as string;
        await getCoachSuggestionService().deleteSuggestion(suggestionId);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete coach suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to delete suggestion' }, { status: 500 });
    }
}
