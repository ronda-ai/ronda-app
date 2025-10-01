import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITeacherLabService } from "@/modules/teacher-lab/domain/interfaces/teacher-lab-service.interface";
import { AuthenticatedUserPayload, withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getTeacherLabService = () => resolve<ITeacherLabService>(SERVICE_KEYS.TeacherLabService);

async function generateQuestionAnalysisHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const analysis = await getTeacherLabService().generateQuestionAnalysis(body);
        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error('API Error: Failed to generate question analysis', error);
        return NextResponse.json({ message: error.message || 'Failed to generate analysis' }, { status: 500 });
    }
}

export const POST = withAuthorization(generateQuestionAnalysisHandler, isTeacher);
