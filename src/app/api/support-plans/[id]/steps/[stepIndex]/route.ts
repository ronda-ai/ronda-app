
import { updateStepDetailsHandler } from "@/modules/support-plan/interfaces/controllers/http/support-plan.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const PUT = withAuthorization(updateStepDetailsHandler, isTeacher);
