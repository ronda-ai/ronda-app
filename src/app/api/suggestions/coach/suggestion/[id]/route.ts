
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { deleteCoachSuggestionHandler } from "@/modules/coach-suggestion/interfaces/controllers/http/coach-suggestion.api.controller";

export const DELETE = withAuthorization(deleteCoachSuggestionHandler, isTeacher);
