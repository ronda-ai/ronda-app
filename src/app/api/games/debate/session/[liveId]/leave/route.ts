
import { NextRequest, NextResponse } from "next/server";
import { GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IDebateService } from "@/modules/debate/domain/interfaces/debate-service.interface";

const getDebateService = () => resolve<IDebateService>(SERVICE_KEYS.DebateService);

// This is a public endpoint
export async function POST(request: NextRequest, context: GenericRouteContext) {
    try {
        const liveId = context.params.liveId as string;
        const { studentId } = await request.json();

        if (!studentId) {
            return NextResponse.json({ message: "studentId is required" }, { status: 400 });
        }

        await getDebateService().leaveDebateSession(liveId, studentId);

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('API Error: Failed to leave debate session', error);
        return NextResponse.json({ message: error.message || 'Failed to leave session' }, { status: 500 });
    }
}
