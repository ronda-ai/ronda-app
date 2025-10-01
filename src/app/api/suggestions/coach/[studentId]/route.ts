
import { getCoachSuggestionsForStudentHandler } from "@/modules/coach-suggestion/interfaces/controllers/http/coach-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getCoachSuggestionsForStudentHandler, isTeacher);
