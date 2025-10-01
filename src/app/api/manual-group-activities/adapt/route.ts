
import { adaptActivityHandler } from "@/modules/manual-group-activity/interfaces/controllers/http/manual-group-activity.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(adaptActivityHandler, isTeacher);
