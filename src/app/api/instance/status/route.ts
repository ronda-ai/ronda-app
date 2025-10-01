
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { IInstanceStatusService } from "@/modules/instance-status/domain/interfaces/instance-status-service.interface";

const getInstanceStatusService = () => resolve<IInstanceStatusService>(SERVICE_KEYS.InstanceStatusService);

async function getStatusHandler(request: NextRequest) {
    try {
        const status = await getInstanceStatusService().getStatus();
        return NextResponse.json(status);
    } catch (error: any) {
        console.error('API Error: Failed to get instance status', error);
        return NextResponse.json({ message: error.message || 'Failed to get instance status' }, { status: 500 });
    }
}

export const GET = withAuthorization(getStatusHandler, isTeacher);
