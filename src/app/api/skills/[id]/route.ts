
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { updateSkillHandler, deleteSkillHandler } from "@/modules/skill/interfaces/controllers/http/skill.api.controller";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { NextRequest } from "next/server";

export const PUT = withAuthorization(
    (req: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) =>
        updateSkillHandler(req, authUser, { params }),
    isTeacher
);

export const DELETE = withAuthorization(
    (req: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) =>
        deleteSkillHandler(req, authUser, { params }),
    isTeacher
);
