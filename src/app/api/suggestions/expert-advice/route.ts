import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { getExpertAdviceHandler } from "@/modules/expert-advice/interfaces/controllers/http/expert-advice.api.controller";

export const POST = withAuthorization(getExpertAdviceHandler, isTeacher);
