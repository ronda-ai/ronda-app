
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IPblService } from "@/modules/pbl/domain/interfaces/pbl-service.interface";
import { withAuthorization, AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getPblService = () => resolve<IPblService>(SERVICE_KEYS.PblService);

async function deleteProjectHandler(req: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getPblService().deleteProject(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete PBL project', error);
        return NextResponse.json({ message: error.message || 'Failed to delete project' }, { status: 500 });
    }
}

export const DELETE = withAuthorization(deleteProjectHandler, isTeacher);
    