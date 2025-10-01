import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITeacherLabService } from "@/modules/teacher-lab/domain/interfaces/teacher-lab-service.interface";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getTeacherLabService = () => resolve<ITeacherLabService>(SERVICE_KEYS.TeacherLabService);

async function generatePedagogicalMenuHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const menu = await getTeacherLabService().generatePedagogicalMenu(body);
        return NextResponse.json(menu);
    } catch (error: any) {
        console.error('API Error: Failed to generate pedagogical menu', error);
        return NextResponse.json({ message: error.message || 'Failed to generate menu' }, { status: 500 });
    }
}

export const POST = withAuthorization(generatePedagogicalMenuHandler, isTeacher);
