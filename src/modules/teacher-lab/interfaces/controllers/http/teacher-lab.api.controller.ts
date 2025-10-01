import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITeacherLabService } from "@/modules/teacher-lab/domain/interfaces/teacher-lab-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IMbeExpertService } from '@/modules/mbe-expert/domain/interfaces/mbe-expert-service.interface';

const getTeacherLabService = () => resolve<ITeacherLabService>(SERVICE_KEYS.TeacherLabService);
const getMbeExpertService = () => resolve<IMbeExpertService>(SERVICE_KEYS.MbeExpertService);

export async function getLatestHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const type = params.type as string;
        let data: any = null;

        switch (type) {
            case 'pulse':
                data = await getTeacherLabService().getLatestClassroomPulse();
                break;
            case 'menu':
                data = await getTeacherLabService().getLatestPedagogicalMenu();
                break;
            case 'questions':
                 data = await getTeacherLabService().getLatestQuestionAnalysis();
                break;
            case 'reflection':
                 data = await getTeacherLabService().getLatestReflection();
                break;
            default:
                return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
        }
        
        return NextResponse.json(data);

    } catch (error: any) {
        console.error('API Error: Failed to get latest teacher lab data', error);
        return NextResponse.json({ message: error.message || 'Failed to get data' }, { status: 500 });
    }
}

export async function loadMbeDocumentHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const { url } = await request.json();
        if (!url) {
            return NextResponse.json({ message: 'URL is required' }, { status: 400 });
        }
        const result = await getMbeExpertService().loadMbeDocumentFromUrl(url);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to load MBE document', error);
        return NextResponse.json({ message: error.message || 'Failed to load document' }, { status: 500 });
    }
}

export async function mbeConsultationHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getMbeExpertService().consult(body);
        return NextResponse.json(result);
    } catch(error: any) {
        console.error('API Error: Failed to get MBE consultation', error);
        return NextResponse.json({ message: error.message || 'Failed to get consultation' }, { status: 500 });
    }
}
