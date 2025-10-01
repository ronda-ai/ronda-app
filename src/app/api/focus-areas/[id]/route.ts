
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { updateFocusAreaHandler, deleteFocusAreaHandler } from "@/modules/focus-area/interfaces/controllers/http/focus-area.api.controller";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { NextRequest } from "next/server";

export const PUT = withAuthorization(
    (req: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) =>
        updateFocusAreaHandler(req, authUser, { params }),
    isTeacher
);

export const DELETE = withAuthorization(
    (req: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) =>
        deleteFocusAreaHandler(req, authUser, { params }),
    isTeacher
);
