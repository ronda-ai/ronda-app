import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITeacherLabService } from "@/modules/teacher-lab/domain/interfaces/teacher-lab-service.interface";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";

const getTeacherLabService = () => resolve<ITeacherLabService>(SERVICE_KEYS.TeacherLabService);

async function generateClassroomClimateScenarioHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const scenarioStep = await getTeacherLabService().generateClassroomClimateScenario(body);
        return NextResponse.json(scenarioStep);
    } catch (error: any) {
        console.error('API Error: Failed to generate classroom climate scenario', error);
        return NextResponse.json({ message: error.message || 'Failed to generate scenario step' }, { status: 500 });
    }
}

export const POST = withAuthorization(generateClassroomClimateScenarioHandler, isTeacher);
