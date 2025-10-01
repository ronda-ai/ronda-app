
import { NextRequest, NextResponse } from "next/server";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { resolve } from "@/services/bootstrap";
import { ICurriculumActivityService } from "@/modules/curriculum-activity/domain/interfaces/curriculum-activity-service.interface";
import { SERVICE_KEYS } from "@/config/service-keys";

const getCurriculumActivityService = () => resolve<ICurriculumActivityService>(SERVICE_KEYS.CurriculumActivityService);

export const DELETE = withAuthorization(async (request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) => {
    try {
        await getCurriculumActivityService().deleteActivity(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, isTeacher);
