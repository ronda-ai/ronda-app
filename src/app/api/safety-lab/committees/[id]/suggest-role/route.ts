
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { suggestRoleHandler } from "@/modules/safety-committee/interfaces/controllers/http/safety-committee.api.controller";

export const POST = withAuthorization(suggestRoleHandler, isTeacher);
