
import { createActivitiesHandler, getAllActivitiesHandler } from "@/modules/curriculum-activity/interfaces/controllers/http/curriculum-activity.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(createActivitiesHandler, isTeacher);
export const GET = withAuthorization(getAllActivitiesHandler, isTeacher);
