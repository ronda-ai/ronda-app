
import { createSuggestionHandler } from "@/modules/qualities-suggestion/interfaces/controllers/http/qualities-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(createSuggestionHandler, isTeacher);
