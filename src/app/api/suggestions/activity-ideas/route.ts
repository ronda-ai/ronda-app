
import { generateAndCreateSuggestionHandler } from "@/modules/activity-suggestion/interfaces/controllers/http/activity-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(generateAndCreateSuggestionHandler, isTeacher);
