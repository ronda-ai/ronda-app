import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { createActivityHandler, getAllActivitiesHandler } from "@/modules/digital-conviviality/interfaces/controllers/http/digital-conviviality.api.controller";

export const POST = withAuthorization(createActivityHandler, isTeacher);
export const GET = withAuthorization(getAllActivitiesHandler, isTeacher);
