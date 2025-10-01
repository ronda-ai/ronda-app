import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { adaptPersonalizedActivityHandler } from "@/modules/curriculum-activity/interfaces/controllers/http/activity-adaptation.api.controller";

export const POST = withAuthorization(adaptPersonalizedActivityHandler, isTeacher);
