
import { updateStepHandler } from "@/modules/relationship-remediation/interfaces/controllers/http/relationship-remediation.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const PUT = withAuthorization(updateStepHandler, isTeacher);
