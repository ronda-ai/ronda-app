import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITeacherLabService } from "@/modules/teacher-lab/domain/interfaces/teacher-lab-service.interface";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getTeacherLabService = () => resolve<ITeacherLabService>(SERVICE_KEYS.TeacherLabService);

async function generateClassroomPulseHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const pulse = await getTeacherLabService().generateClassroomPulse(body.language);
        return NextResponse.json(pulse);
    } catch (error: any) {
        console.error('API Error: Failed to generate classroom pulse', error);
        return NextResponse.json({ message: error.message || 'Failed to generate pulse' }, { status: 500 });
    }
}

export const POST = withAuthorization(generateClassroomPulseHandler, isTeacher);
