

import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IMoodTrendAnalysisService } from "@/modules/mood-trend-analysis/domain/interfaces/mood-trend-analysis-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";

const getMoodTrendAnalysisService = () => resolve<IMoodTrendAnalysisService>(SERVICE_KEYS.MoodTrendAnalysisService);
const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);


export async function getStudentAnalysesHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const analyses = await getMoodTrendAnalysisService().getStudentAnalyses(params.studentId as string);
        return NextResponse.json(analyses);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function getClassroomAnalysesHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const analyses = await getMoodTrendAnalysisService().getClassroomAnalyses();
        return NextResponse.json(analyses);
    } catch (error: any) {
        console.error('API Error: Failed to get classroom mood analyses', error);
        return NextResponse.json({ message: error.message || 'Failed to get classroom mood analyses' }, { status: 500 });
    }
}

export async function createStudentAnalysisHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const student = await getStudentService().getStudentById(body.student.id);
        if (!student) {
             return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }

        const savedAnalysis = await getMoodTrendAnalysisService().generateAndCreateStudentAnalysis(student, body.language);
        return NextResponse.json(savedAnalysis);
    } catch (error: any) {
        console.error('API Error: Failed to generate student mood analysis', error);
        return NextResponse.json({ message: error.message || 'Failed to generate student mood analysis' }, { status: 500 });
    }
}

export async function createClassroomAnalysisHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const savedAnalysis = await getMoodTrendAnalysisService().generateAndCreateClassroomAnalysis(body.language);
        return NextResponse.json(savedAnalysis);
    } catch (error: any) {
        console.error('API Error: Failed to generate classroom mood analysis', error);
        return NextResponse.json({ message: error.message || 'Failed to generate classroom mood analysis' }, { status: 500 });
    }
}
