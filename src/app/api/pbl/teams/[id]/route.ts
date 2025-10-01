
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IPblService } from "@/modules/pbl/domain/interfaces/pbl-service.interface";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getPblService = () => resolve<IPblService>(SERVICE_KEYS.PblService);

async function deleteTeamFormationHandler(req: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getPblService().deleteTeamFormation(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete PBL team formation', error);
        return NextResponse.json({ message: error.message || 'Failed to delete team formation' }, { status: 500 });
    }
}

export const DELETE = withAuthorization(deleteTeamFormationHandler, isTeacher);
