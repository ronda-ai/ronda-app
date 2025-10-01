
import { getSupportPlansForStudentHandler, addFeedbackToPlanHandler, deleteSupportPlanHandler } from "@/modules/support-plan/interfaces/controllers/http/support-plan.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getSupportPlansForStudentHandler, isTeacher);
export const PUT = withAuthorization(addFeedbackToPlanHandler, isTeacher);
export const DELETE = withAuthorization(deleteSupportPlanHandler, isTeacher);
