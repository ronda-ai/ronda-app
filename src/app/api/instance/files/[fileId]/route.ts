
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { IInstanceStatusService } from "@/modules/instance-status/domain/interfaces/instance-status-service.interface";

const getInstanceStatusService = () => resolve<IInstanceStatusService>(SERVICE_KEYS.InstanceStatusService);

async function deleteFileHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const fileId = params.fileId as string;
        await getInstanceStatusService().deleteFile(fileId);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete file', error);
        return NextResponse.json({ message: error.message || 'Failed to delete file' }, { status: 500 });
    }
}

export const DELETE = withAuthorization(deleteFileHandler, isTeacher);
