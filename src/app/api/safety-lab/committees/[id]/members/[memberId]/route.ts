
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { removeMemberHandler } from "@/modules/safety-committee/interfaces/controllers/http/safety-committee.api.controller";

export const DELETE = withAuthorization(removeMemberHandler, isTeacher);
