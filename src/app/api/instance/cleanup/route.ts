
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { IInstanceStatusService } from "@/modules/instance-status/domain/interfaces/instance-status-service.interface";

const getInstanceStatusService = () => resolve<IInstanceStatusService>(SERVICE_KEYS.InstanceStatusService);

async function cleanupFilesHandler(request: NextRequest) {
    try {
        await getInstanceStatusService().cleanupAllFiles();
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to cleanup files', error);
        return NextResponse.json({ message: error.message || 'Failed to cleanup files' }, { status: 500 });
    }
}

export const POST = withAuthorization(cleanupFilesHandler, isTeacher);
