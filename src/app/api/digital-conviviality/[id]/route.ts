
// This route handler was incorrectly defined. It should be merged into the main suggestions route.
// The new correct route is /api/suggestions/digital-conviviality/[id]

import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { deleteActivityHandler } from "@/modules/digital-conviviality/interfaces/controllers/http/digital-conviviality.api.controller";
import { NextRequest } from "next/server";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";


export async function DELETE(request: NextRequest, context: GenericRouteContext) {
    // This is a workaround because the original setup didn't pass params correctly.
    // The id is now extracted from the URL path in the controller itself.
    return withAuthorization(deleteActivityHandler, isTeacher)(request, context);
}
