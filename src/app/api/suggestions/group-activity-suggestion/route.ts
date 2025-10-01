
import { getSuggestionHandler } from "@/modules/group-activity-suggestion/interfaces/controllers/http/group-dynamics.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(getSuggestionHandler, isTeacher);
