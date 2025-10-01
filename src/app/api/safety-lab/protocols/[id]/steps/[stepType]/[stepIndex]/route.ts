
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IEducationalSafetyService } from "@/modules/educational-safety/domain/interfaces/educational-safety-service.interface";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getEducationalSafetyService = () => resolve<IEducationalSafetyService>(SERVICE_KEYS.EducationalSafetyService);

async function updateProtocolStepHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const protocolId = params.id as string;
        const stepType = params.stepType as 'beforeSteps' | 'duringSteps' | 'afterSteps';
        const stepIndex = parseInt(params.stepIndex as string, 10);
        const body = await request.json();

        const updatedProtocol = await getEducationalSafetyService().updateProtocolStep(protocolId, stepType, stepIndex, body);
        if (!updatedProtocol) {
            return NextResponse.json({ message: "Protocol or step not found" }, { status: 404 });
        }
        return NextResponse.json(updatedProtocol);
    } catch (error: any) {
        console.error('API Error: Failed to update protocol step', error);
        return NextResponse.json({ message: error.message || 'Failed to update step' }, { status: 500 });
    }
}

export const PUT = withAuthorization(updateProtocolStepHandler, isTeacher);
