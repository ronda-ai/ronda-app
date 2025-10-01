
import { getActivitiesForStudentHandler, addFeedbackHandler, deleteActivityHandler } from "@/modules/personalized-activity/interfaces/controllers/http/personalized-activity.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getActivitiesForStudentHandler, isTeacher);
export const PUT = withAuthorization(addFeedbackHandler, isTeacher);
export const DELETE = withAuthorization(deleteActivityHandler, isTeacher);
