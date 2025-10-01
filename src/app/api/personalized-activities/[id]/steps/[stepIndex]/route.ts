
import { updateStepHandler } from "@/modules/personalized-activity/interfaces/controllers/http/personalized-activity.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const PUT = withAuthorization(updateStepHandler, isTeacher);
