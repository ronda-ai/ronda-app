
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IRelationshipRemediationService } from "@/modules/relationship-remediation/domain/interfaces/relationship-remediation-service.interface";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";

const getRelationshipRemediationService = () => resolve<IRelationshipRemediationService>(SERVICE_KEYS.RelationshipRemediationService);

export async function getSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getRelationshipRemediationService().generateSuggestion(body.students, body.language);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate relationship suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to generate suggestion' }, { status: 500 });
    }
}
