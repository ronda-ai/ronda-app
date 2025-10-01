
import { createAdaptationHandler, getAllAdaptationsHandler } from "@/modules/activity-adaptation/interfaces/controllers/http/activity-adaptation.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(createAdaptationHandler, isTeacher);
export const GET = withAuthorization(getAllAdaptationsHandler, isTeacher);
