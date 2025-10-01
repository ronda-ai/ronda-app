
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { getAllPersonalizedActivitiesHandler } from "../../../modules/personalized-activity/interfaces/controllers/http/personalized-activity.api.controller";

export const GET = withAuthorization(getAllPersonalizedActivitiesHandler, isTeacher);
