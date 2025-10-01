
'use server';
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITeacherLabService } from "@/modules/teacher-lab/domain/interfaces/teacher-lab-service.interface";
import { AuthenticatedUserPayload, withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getTeacherLabService = () => resolve<ITeacherLabService>(SERVICE_KEYS.TeacherLabService);

async function generateReflectionGuidanceHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const guidance = await getTeacherLabService().generateReflectionGuidance(body);
        return NextResponse.json(guidance);
    } catch (error: any) {
        console.error('API Error: Failed to generate reflection guidance', error);
        return NextResponse.json({ message: error.message || 'Failed to generate guidance' }, { status: 500 });
    }
}

export const POST = withAuthorization(generateReflectionGuidanceHandler, isTeacher);
