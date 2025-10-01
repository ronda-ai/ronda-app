
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IDebateService } from "@/modules/debate/domain/interfaces/debate-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getDebateService = () => resolve<IDebateService>(SERVICE_KEYS.DebateService);

async function pauseOrResumeHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const debateId = params.id as string;
        const updatedDebate = await getDebateService().pauseOrResume(debateId);
        if (!updatedDebate) {
            return NextResponse.json({ message: "Debate not found or not in a state to be paused/resumed" }, { status: 400 });
        }
        return NextResponse.json(updatedDebate);
    } catch (error: any) {
        console.error('API Error: Failed to pause/resume debate', error);
        return NextResponse.json({ message: error.message || 'Failed to pause/resume' }, { status: 500 });
    }
}

export const POST = withAuthorization(pauseOrResumeHandler, isTeacher);
