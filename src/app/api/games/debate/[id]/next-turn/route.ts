
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IDebateService } from "@/modules/debate/domain/interfaces/debate-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getDebateService = () => resolve<IDebateService>(SERVICE_KEYS.DebateService);

async function nextTurnHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const debateId = params.id as string;
        const updatedDebate = await getDebateService().nextTurn(debateId);
        if (!updatedDebate) {
            return NextResponse.json({ message: "Debate not found or already finished" }, { status: 404 });
        }
        return NextResponse.json(updatedDebate);
    } catch (error: any) {
        console.error('API Error: Failed to advance to next turn', error);
        return NextResponse.json({ message: error.message || 'Failed to advance turn' }, { status: 500 });
    }
}

export const POST = withAuthorization(nextTurnHandler, isTeacher);
