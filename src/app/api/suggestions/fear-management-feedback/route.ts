
import { processFeedbackHandler } from "@/modules/fear-update-suggestion/interfaces/controllers/http/fear-update-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(processFeedbackHandler, isTeacher);
