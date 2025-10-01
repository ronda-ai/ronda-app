
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITestService } from "@/modules/test/domain/interfaces/test-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getTestService = () => resolve<ITestService>(SERVICE_KEYS.TestService);

async function stopTestSessionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const testId = params.id as string;
        const updatedTest = await getTestService().stopTestSession(testId);
        if (!updatedTest) {
            return NextResponse.json({ message: "Test not found" }, { status: 404 });
        }
        return NextResponse.json(updatedTest);
    } catch (error: any) {
        console.error('API Error: Failed to stop test session', error);
        return NextResponse.json({ message: error.message || 'Failed to stop session' }, { status: 500 });
    }
}

export const POST = withAuthorization(stopTestSessionHandler, isTeacher);
