
import { NextRequest, NextResponse } from "next/server";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IActivityAdaptationService } from "@/modules/activity-adaptation/domain/interfaces/activity-adaptation-service.interface";

const getActivityAdaptationService = () => resolve<IActivityAdaptationService>(SERVICE_KEYS.ActivityAdaptationService);

export const DELETE = withAuthorization(async (request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) => {
    try {
        const id = params.id as string;
        await getActivityAdaptationService().deleteAdaptation(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Failed to delete adaptation' }, { status: 500 });
    }
}, isTeacher);
