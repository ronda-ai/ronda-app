
'use server';
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITeacherLabService } from "@/modules/teacher-lab/domain/interfaces/teacher-lab-service.interface";
import { AuthenticatedUserPayload, withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getTeacherLabService = () => resolve<ITeacherLabService>(SERVICE_KEYS.TeacherLabService);

async function generateClassAnalysisFromAudioHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();

        if (!body.audioDataUri) {
            return NextResponse.json({ message: "audioDataUri is required." }, { status: 400 });
        }

        const stream = await getTeacherLabService().generateClassAnalysisFromAudio(body);
        
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
            },
        });

    } catch (error: any) {
        console.error('API Error: Failed to generate class analysis from audio', error);
        return NextResponse.json({ message: error.message || 'Failed to generate analysis' }, { status: 500 });
    }
}

export const POST = withAuthorization(generateClassAnalysisFromAudioHandler, isTeacher);
