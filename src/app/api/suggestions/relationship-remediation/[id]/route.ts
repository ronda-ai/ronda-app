
import { updateRemediationHandler, deleteRemediationHandler } from "@/modules/relationship-remediation/interfaces/controllers/http/relationship-remediation.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const PUT = withAuthorization(updateRemediationHandler, isTeacher);
export const DELETE = withAuthorization(deleteRemediationHandler, isTeacher);
