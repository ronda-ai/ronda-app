
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { generateAndCreateSupportPlanHandler } from "@/modules/support-plan/interfaces/controllers/http/support-plan.api.controller";

export const POST = withAuthorization(generateAndCreateSupportPlanHandler, isTeacher);
